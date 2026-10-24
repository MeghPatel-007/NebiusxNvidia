import { NextRequest, NextResponse } from "next/server";
import { getRepositoryById } from "@/lib/db/queries/repositories";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ repoId: string }> }
) {
  try {
    const { repoId } = await params;
    const repo = await getRepositoryById(repoId);
    if (!repo) {
      return NextResponse.json({ success: false, error: "Repository not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: repo });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch repository";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
