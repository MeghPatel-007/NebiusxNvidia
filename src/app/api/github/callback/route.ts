import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { verifyAndConsumeInstallState } from "@/lib/github/state";
import { getAppOctokit } from "@/lib/github/app";
import { db } from "@/lib/db";
import { githubInstallations } from "@/lib/db/schema";
import { syncInstallationRepositories } from "@/lib/github/sync";

export async function GET(req: NextRequest) {
  const url = req.nextUrl;
  const installationId = url.searchParams.get("installation_id");
  const state = url.searchParams.get("state");

  const baseUrl = url.origin;

  if (!installationId) {
    return NextResponse.redirect(
      new URL("/repositories?error=missing_installation_id", baseUrl)
    );
  }

  try {
    const user = await getCurrentUser();

    // Verify one-time CSRF state if provided
    if (state) {
      const stateValidation = await verifyAndConsumeInstallState(state, user.id);
      if (!stateValidation.valid) {
        console.warn("GitHub callback state validation failed:", stateValidation.error);
        return NextResponse.redirect(
          new URL(
            `/repositories?error=${encodeURIComponent(
              stateValidation.error || "invalid_state"
            )}`,
            baseUrl
          )
        );
      }
    }

    let accountLogin = `installation-${installationId}`;
    let accountType = "User";
    let accountAvatarUrl: string | null = null;
    let repositorySelection = "selected";
    let permissionsStr: string | null = null;

    // Attempt to enrich installation metadata via App Octokit
    const appOctokit = getAppOctokit();
    if (appOctokit) {
      try {
        const ghInst = await appOctokit.request(
          "GET /app/installations/{installation_id}",
          {
            installation_id: Number(installationId),
          }
        );

        if (ghInst.data) {
          accountLogin = (ghInst.data.account as { login?: string })?.login || accountLogin;
          accountType = (ghInst.data.account as { type?: string })?.type || accountType;
          accountAvatarUrl =
            (ghInst.data.account as { avatar_url?: string })?.avatar_url || null;
          repositorySelection = ghInst.data.repository_selection || repositorySelection;
          permissionsStr = JSON.stringify(ghInst.data.permissions || {});
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "App Octokit error";
        console.warn("Could not query GitHub for installation details:", msg);
      }
    }

    const installationDbId = `inst-${installationId}`;

    // Upsert installation in DB
    await db
      .insert(githubInstallations)
      .values({
        id: installationDbId,
        userId: user.id,
        installationId: String(installationId),
        accountLogin,
        accountType,
        accountAvatarUrl,
        repositorySelection,
        permissions: permissionsStr,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: githubInstallations.installationId,
        set: {
          accountLogin,
          accountType,
          accountAvatarUrl,
          repositorySelection,
          permissions: permissionsStr,
          updatedAt: new Date(),
        },
      });

    // Automatically synchronize repositories from this installation
    await syncInstallationRepositories(installationDbId, user.id);

    return NextResponse.redirect(
      new URL(`/repositories?installed=true&account=${encodeURIComponent(accountLogin)}`, baseUrl)
    );
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to process installation callback";
    console.error("Callback error:", msg);
    return NextResponse.redirect(
      new URL(`/repositories?error=${encodeURIComponent(msg)}`, baseUrl)
    );
  }
}
