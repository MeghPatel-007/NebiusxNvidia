import { NextResponse } from "next/server";
import { getLatestEvents } from "@/lib/db/queries/agent-runs";

export async function GET() {
  try {
    const events = await getLatestEvents(10);
    return NextResponse.json({
      success: true,
      data: events,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch activity";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
