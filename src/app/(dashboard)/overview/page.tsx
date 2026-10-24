import React from "react";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";
import { ActivityPanel } from "@/components/layout/activity-panel";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { MemberStatusTable } from "@/components/dashboard/member-status-table";
import { generateActivityHeatmap, getOverviewMetrics } from "@/lib/db/queries/overview";
import { getAgentRuns } from "@/lib/db/queries/agent-runs";

export const instant = false;

export default async function OverviewPage() {
  const [metrics, runs] = await Promise.all([
    getOverviewMetrics(),
    getAgentRuns(),
  ]);

  const heatmapDays = generateActivityHeatmap();

  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Breadcrumb strip (Height: ~57px, hairline below) */}
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="prime-marketplace-3.0"
        isPrivate={true}
        tagsCount={7}
        branchesCount={10}
      />

      {/* Main Grid with Right Rail */}
      <div className="flex flex-col xl:flex-row flex-1">
        {/* Central Content Column */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* KPI Row (Height: ~97px, 4 equal columns, hairline below) */}
          <KpiCards metrics={metrics} />

          {/* Project Contributors Section (Heatmap: 6 rows × 29 columns, hairline below) */}
          <ActivityHeatmap days={heatmapDays} />

          {/* Member Status Table (Row h 40px, status dots, 1px bottom borders) */}
          <MemberStatusTable runs={runs} />
        </div>

        {/* Right Activity Rail (Width: ~296px, hairline left) */}
        <ActivityPanel />
      </div>
    </div>
  );
}
