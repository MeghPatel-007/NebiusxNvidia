import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { db } from "@/lib/db";
import { githubRepositories, githubInstallations, repositories } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ repoId: string }> }
) {
  try {
    const { repoId } = await params;
    const user = await getCurrentUser();

    // 1. Look in githubRepositories with ownership verification
    const [ghRepo] = await db
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
      .where(
        and(
          eq(githubRepositories.id, repoId),
          eq(githubInstallations.userId, user.id)
        )
      );

    if (ghRepo) {
      return NextResponse.json({ repository: ghRepo });
    }

    // 2. Check general repositories table
    const [generalRepo] = await db
      .select()
      .from(repositories)
      .where(and(eq(repositories.id, repoId), eq(repositories.userId, user.id)));

    if (generalRepo) {
      return NextResponse.json({ repository: generalRepo });
    }

    return NextResponse.json(
      { error: "Repository not found or access unauthorized" },
      { status: 404 }
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch repository";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
