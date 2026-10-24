import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { getRepositoryContents } from "@/lib/github/contents";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ repoId: string }> }
) {
  try {
    const { repoId } = await params;
    const user = await getCurrentUser();

    const path = req.nextUrl.searchParams.get("path") || "";
    const ref = req.nextUrl.searchParams.get("ref") || "main";

    const result = await getRepositoryContents(repoId, path, user.id, ref);

    if (result.error && result.files.length === 0) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json({
      files: result.files,
      path,
      ref,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch repository contents";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
