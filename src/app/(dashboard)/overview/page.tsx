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
    <div className="flex flex-col flex-1">
      {/* Subheader / Breadcrumbs bar */}
      <RepoBreadcrumbs
        workspace="RepoPilot Space"
        repositoryName="prime-marketplace-3.0"
        isPrivate={true}
        tagsCount={7}
        branchesCount={10}
      />

      {/* Main Workspace Grid with Right Contextual Panel */}
      <div className="flex flex-col xl:flex-row flex-1">
        {/* Central Content Area */}
        <div className="flex-1 p-6 space-y-6 min-w-0">
          {/* 4 KPI Cards */}
          <KpiCards metrics={metrics} />

          {/* Activity Heatmap */}
          <ActivityHeatmap days={heatmapDays} />

          {/* Member Status / Agent Runs Table */}
          <MemberStatusTable runs={runs} />
        </div>

        {/* Right-side Contextual Activity & Active Repositories Panel */}
        <ActivityPanel />
      </div>
    </div>
  );
}
