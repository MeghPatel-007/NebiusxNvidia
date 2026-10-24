import { NextResponse } from "next/server";
import { generateActivityHeatmap, getOverviewMetrics } from "@/lib/db/queries/overview";

export async function GET() {
  try {
    const [metrics, heatmap] = await Promise.all([
      getOverviewMetrics(),
      generateActivityHeatmap(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        metrics,
        heatmap,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load metrics";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
