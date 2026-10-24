import { db } from "../db";
import { githubInstallations, githubRepositories } from "../db/schema";
import { eq, and } from "drizzle-orm";

export interface UserInstallationWithCount {
  id: string;
  installationId: string;
  accountLogin: string;
  accountType: string;
  accountAvatarUrl: string | null;
  repositorySelection: string;
  repositoryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserInstallations(
  userId: string
): Promise<UserInstallationWithCount[]> {
  const installations = await db
    .select()
    .from(githubInstallations)
    .where(eq(githubInstallations.userId, userId));

  const result: UserInstallationWithCount[] = [];

  for (const inst of installations) {
    const repos = await db
      .select({ id: githubRepositories.id })
      .from(githubRepositories)
      .where(eq(githubRepositories.installationId, inst.id));

    result.push({
      id: inst.id,
      installationId: inst.installationId,
      accountLogin: inst.accountLogin,
      accountType: inst.accountType,
      accountAvatarUrl: inst.accountAvatarUrl,
      repositorySelection: inst.repositorySelection,
      repositoryCount: repos.length,
      createdAt: inst.createdAt,
      updatedAt: inst.updatedAt,
    });
  }

  return result;
}

export async function disconnectInstallation(
  installationRecordId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  const [inst] = await db
    .select()
    .from(githubInstallations)
    .where(
      and(
        eq(githubInstallations.id, installationRecordId),
        eq(githubInstallations.userId, userId)
      )
    );

  if (!inst) {
    return { success: false, error: "Installation not found or unauthorized" };
  }

  // Deleting the installation cascades and deletes associated githubRepositories
  await db
    .delete(githubInstallations)
    .where(eq(githubInstallations.id, installationRecordId));

  return { success: true };
}
