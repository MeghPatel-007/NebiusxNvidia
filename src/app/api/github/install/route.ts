import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { getAppSlug } from "@/lib/github/app";
import { createInstallState } from "@/lib/github/state";

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const state = await createInstallState(user.id);
    const slug = getAppSlug();

    const installUrl = `https://github.com/apps/${slug}/installations/new?state=${encodeURIComponent(
      state
    )}`;

    const format = req.nextUrl.searchParams.get("format");
    if (format === "json") {
      return NextResponse.json({
        url: installUrl,
        slug,
        state,
      });
    }

    return NextResponse.redirect(installUrl);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to initiate installation";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
