import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { getUserInstallations } from "@/lib/github/installations";
import { getGitHubAppStatus } from "@/lib/github/app";

export async function GET() {
  try {
    const user = await getCurrentUser();
    const installations = await getUserInstallations(user.id);
    const appStatus = getGitHubAppStatus();

    return NextResponse.json({
      installations,
      appStatus,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch installations";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
