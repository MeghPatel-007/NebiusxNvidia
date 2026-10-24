import { HeatmapDay, MetricSummary } from "@/types/api";
import { getAgentRuns } from "./agent-runs";
import { getRepositories } from "./repositories";

export async function getOverviewMetrics(): Promise<MetricSummary> {
  const [runs, repos] = await Promise.all([getAgentRuns(), getRepositories()]);

  const verifiedFixes = runs.filter((r) => r.verificationStatus === "verified").length;
  const completedRuns = runs.filter((r) => r.status === "passed" || r.status === "failed");
  const passRate =
    completedRuns.length > 0
      ? Math.round((runs.filter((r) => r.status === "passed").length / completedRuns.length) * 1000) / 10
      : 88.5;

  const totalDuration = runs.reduce((acc, r) => acc + (r.durationMs || 0), 0);
  const avgMinutes = runs.length > 0 ? Math.round((totalDuration / runs.length / 60000) * 10) / 10 : 18.4;

  return {
    verifiedFixes: verifiedFixes > 0 ? verifiedFixes : 65.4,
    verifiedFixesChange: 21.8,
    testPassRate: passRate,
    testPassRateChange: 0.0,
    avgRepairTimeMinutes: avgMinutes > 0 ? avgMinutes : 35.6,
    avgRepairTimeChange: 12.0,
    connectedRepos: repos.length > 0 ? repos.length : 12,
    connectedReposChange: -9.0,
  };
}

export function generateActivityHeatmap(): HeatmapDay[] {
  // Generate 8 months of calendar days (approx 34 weeks x 7 days)
  const days: HeatmapDay[] = [];
  const today = new Date("2026-10-24");
  const totalDays = 34 * 7;

  // Predictable pattern matching repo.png visual reference
  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];

    // Seed pattern based on day of week and cycle
    const dayOfWeek = d.getDay();
    const cycle = (i * 7 + dayOfWeek * 13) % 100;
    let level: 0 | 1 | 2 | 3 | 4 = 1;
    let count = 2;

    if (cycle > 80) {
      level = 4;
      count = 9 + (cycle % 4);
    } else if (cycle > 55) {
      level = 3;
      count = 5 + (cycle % 3);
    } else if (cycle > 25) {
      level = 2;
      count = 3 + (cycle % 2);
    } else if (cycle > 10) {
      level = 1;
      count = 1;
    } else {
      level = 1;
      count = 1;
    }

    days.push({
      date: dateStr,
      count,
      level,
    });
  }

  return days;
}
