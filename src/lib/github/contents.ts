import { db } from "../db";
import { githubRepositories, githubInstallations } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { getInstallationOctokit } from "./app";

export interface GitHubContentFile {
  name: string;
  path: string;
  type: "file" | "dir";
  size?: number;
  content?: string;
  sha: string;
}

export async function getRepositoryContents(
  repoId: string,
  filePath = "",
  userId: string,
  ref = "main"
): Promise<{ files: GitHubContentFile[]; error?: string }> {
  const [ghRepo] = await db
    .select({
      repo: githubRepositories,
      inst: githubInstallations,
    })
    .from(githubRepositories)
    .innerJoin(
      githubInstallations,
      eq(githubRepositories.installationId, githubInstallations.id)
    )
    .where(
      and(
        eq(githubRepositories.id, repoId),
        eq(githubInstallations.userId, userId)
      )
    );

  if (!ghRepo) {
    return { files: [], error: "Repository not found or unauthorized" };
  }

  const octokit = await getInstallationOctokit(ghRepo.inst.installationId);
  if (!octokit) {
    return { files: [], error: "GitHub App private key not configured" };
  }

  try {
    const res = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
      owner: ghRepo.repo.owner,
      repo: ghRepo.repo.name,
      path: filePath,
      ref,
    });

    if (Array.isArray(res.data)) {
      return {
        files: res.data.map((item) => ({
          name: item.name,
          path: item.path,
          type: item.type as "file" | "dir",
          size: item.size,
          sha: item.sha,
        })),
      };
    } else {
      const single = res.data as {
        name: string;
        path: string;
        type: string;
        size: number;
        content?: string;
        sha: string;
        encoding?: string;
      };
      let decodedContent: string | undefined;
      if (single.content && single.encoding === "base64") {
        decodedContent = Buffer.from(single.content, "base64").toString("utf-8");
      }
      return {
        files: [
          {
            name: single.name,
            path: single.path,
            type: "file",
            size: single.size,
            content: decodedContent,
            sha: single.sha,
          },
        ],
      };
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch repository contents";
    return { files: [], error: msg };
  }
}
