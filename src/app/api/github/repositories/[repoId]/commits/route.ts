import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-server";
import { getRepositoryCommits } from "@/lib/github/commits";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ repoId: string }> }
) {
  try {
    const { repoId } = await params;
    const user = await getCurrentUser();

    const branch = req.nextUrl.searchParams.get("branch") || undefined;
    const page = Number(req.nextUrl.searchParams.get("page") || 1);
    const perPage = Number(req.nextUrl.searchParams.get("per_page") || 15);

    const result = await getRepositoryCommits(repoId, user.id, {
      branch,
      page,
      perPage,
    });

    if (result.error && result.commits.length === 0) {
      return NextResponse.json({ error: result.error }, { status: 404 });
    }

    return NextResponse.json({
      commits: result.commits,
      branch: branch || "default",
      page,
      perPage,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to fetch repository commits";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
