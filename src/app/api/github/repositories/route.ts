import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { db } from "@/lib/db";
import { githubRepositories, githubInstallations, repositories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const query = req.nextUrl.searchParams.get("q")?.toLowerCase() || "";

    // 1. Fetch repositories connected through user's GitHub installations
    const userGhRepos = await db
      .select({
        id: githubRepositories.id,
        installationId: githubRepositories.installationId,
        githubRepoId: githubRepositories.githubRepoId,
        owner: githubRepositories.owner,
        name: githubRepositories.name,
        fullName: githubRepositories.fullName,
        defaultBranch: githubRepositories.defaultBranch,
        isPrivate: githubRepositories.isPrivate,
        htmlUrl: githubRepositories.htmlUrl,
        description: githubRepositories.description,
        language: githubRepositories.language,
        stars: githubRepositories.stars,
        forks: githubRepositories.forks,
        lastSyncedAt: githubRepositories.lastSyncedAt,
        accountLogin: githubInstallations.accountLogin,
      })
      .from(githubRepositories)
      .innerJoin(
        githubInstallations,
        eq(githubRepositories.installationId, githubInstallations.id)
      )
      .where(eq(githubInstallations.userId, user.id))
      .orderBy(desc(githubRepositories.updatedAt));

    // Filter by search query if present
    const filteredGh = query
      ? userGhRepos.filter(
          (r) =>
            r.name.toLowerCase().includes(query) ||
            r.fullName.toLowerCase().includes(query) ||
            r.description?.toLowerCase().includes(query)
        )
      : userGhRepos;

    // 2. Also fetch any general repositories attached to user's workspace
    const generalRepos = await db
      .select()
      .from(repositories)
      .where(eq(repositories.userId, user.id))
      .orderBy(desc(repositories.updatedAt));

    return NextResponse.json({
      repositories: filteredGh,
      generalRepositories: generalRepos,
      totalCount: filteredGh.length,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch repositories";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
