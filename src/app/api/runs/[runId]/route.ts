import { NextRequest, NextResponse } from "next/server";
import { getAgentRunById } from "@/lib/db/queries/agent-runs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ runId: string }> }
) {
  try {
    const { runId } = await params;
    const run = await getAgentRunById(runId);
    if (!run) {
      return NextResponse.json({ success: false, error: "Run not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: run });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch run";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
