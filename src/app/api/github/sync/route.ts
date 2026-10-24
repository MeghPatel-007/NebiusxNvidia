import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { getUserInstallations } from "@/lib/github/installations";
import { syncInstallationRepositories } from "@/lib/github/sync";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    let body: { installationId?: string } = {};

    try {
      body = await req.json();
    } catch {
      // Body is optional
    }

    if (body.installationId) {
      const result = await syncInstallationRepositories(body.installationId, user.id);
      return NextResponse.json(result);
    }

    // Sync all user installations
    const installations = await getUserInstallations(user.id);
    let totalSynced = 0;
    const allRepos = [];

    for (const inst of installations) {
      const res = await syncInstallationRepositories(inst.id, user.id);
      if (res.success) {
        totalSynced += res.syncedCount;
        allRepos.push(...res.repositories);
      }
    }

    return NextResponse.json({
      success: true,
      totalSynced,
      repositories: allRepos,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Sync failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
