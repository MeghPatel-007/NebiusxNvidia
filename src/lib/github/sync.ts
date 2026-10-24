import { db } from "../db";
import { githubInstallations, githubRepositories, repositories } from "../db/schema";
import { eq } from "drizzle-orm";
import { getInstallationOctokit } from "./app";

export interface SyncResult {
  success: boolean;
  syncedCount: number;
  repositories: Array<{
    id: string;
    fullName: string;
    isPrivate: boolean;
    defaultBranch: string;
  }>;
  error?: string;
}

export async function syncInstallationRepositories(
  installationRecordId: string,
  userId: string
): Promise<SyncResult> {
  const [inst] = await db
    .select()
    .from(githubInstallations)
    .where(eq(githubInstallations.id, installationRecordId));

  if (!inst) {
    return { success: false, syncedCount: 0, repositories: [], error: "Installation not found" };
  }

  if (inst.userId !== userId) {
    return { success: false, syncedCount: 0, repositories: [], error: "Unauthorized access to installation" };
  }

  const octokit = await getInstallationOctokit(inst.installationId);
  if (!octokit) {
    // If Octokit could not be initialized due to PEM key configuration
    // Fetch any currently persisted repositories for this installation
    const existing = await db
      .select()
      .from(githubRepositories)
      .where(eq(githubRepositories.installationId, inst.id));

    return {
      success: true,
      syncedCount: existing.length,
      repositories: existing.map((r) => ({
        id: r.id,
        fullName: r.fullName,
        isPrivate: r.isPrivate,
        defaultBranch: r.defaultBranch,
      })),
      error: "GitHub App private key not configured as PEM; showing cached/persisted repositories.",
    };
  }

  try {
    const response = await octokit.request("GET /installation/repositories", {
      per_page: 100,
    });

    const repoList = response.data.repositories || [];
    const synced = [];

    for (const ghRepo of repoList) {
      const repoDbId = `gh-${ghRepo.id}`;

      // Upsert in githubRepositories
      await db
        .insert(githubRepositories)
        .values({
          id: repoDbId,
          installationId: inst.id,
          githubRepoId: String(ghRepo.id),
          owner: ghRepo.owner?.login || inst.accountLogin,
          name: ghRepo.name,
          fullName: ghRepo.full_name,
          defaultBranch: ghRepo.default_branch || "main",
          isPrivate: Boolean(ghRepo.private),
          htmlUrl: ghRepo.html_url,
          description: ghRepo.description || null,
          language: ghRepo.language || "TypeScript",
          stars: ghRepo.stargazers_count || 0,
          forks: ghRepo.forks_count || 0,
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: githubRepositories.githubRepoId,
          set: {
            fullName: ghRepo.full_name,
            defaultBranch: ghRepo.default_branch || "main",
            isPrivate: Boolean(ghRepo.private),
            htmlUrl: ghRepo.html_url,
            description: ghRepo.description || null,
            language: ghRepo.language || "TypeScript",
            stars: ghRepo.stargazers_count || 0,
            forks: ghRepo.forks_count || 0,
            lastSyncedAt: new Date(),
            updatedAt: new Date(),
          },
        });

      // Also upsert into general repositories table so dashboard and AI agent can work with it seamlessly
      await db
        .insert(repositories)
        .values({
          id: repoDbId,
          userId,
          name: ghRepo.name,
          fullName: ghRepo.full_name,
          owner: ghRepo.owner?.login || inst.accountLogin,
          description: ghRepo.description || null,
          defaultBranch: ghRepo.default_branch || "main",
          isPrivate: Boolean(ghRepo.private),
          language: ghRepo.language || "TypeScript",
          stars: ghRepo.stargazers_count || 0,
          forks: ghRepo.forks_count || 0,
          status: "active",
          githubRepoId: String(ghRepo.id),
          lastSyncedAt: new Date(),
          updatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: repositories.id,
          set: {
            name: ghRepo.name,
            fullName: ghRepo.full_name,
            owner: ghRepo.owner?.login || inst.accountLogin,
            description: ghRepo.description || null,
            defaultBranch: ghRepo.default_branch || "main",
            isPrivate: Boolean(ghRepo.private),
            language: ghRepo.language || "TypeScript",
            stars: ghRepo.stargazers_count || 0,
            forks: ghRepo.forks_count || 0,
            lastSyncedAt: new Date(),
            updatedAt: new Date(),
          },
        });

      synced.push({
        id: repoDbId,
        fullName: ghRepo.full_name,
        isPrivate: Boolean(ghRepo.private),
        defaultBranch: ghRepo.default_branch || "main",
      });
    }

    // Update installation updatedAt
    await db
      .update(githubInstallations)
      .set({ updatedAt: new Date() })
      .where(eq(githubInstallations.id, inst.id));

    return {
      success: true,
      syncedCount: synced.length,
      repositories: synced,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to fetch installation repositories";
    console.error("Error syncing installation repositories:", errorMsg);
    return {
      success: false,
      syncedCount: 0,
      repositories: [],
      error: errorMsg,
    };
  }
}
