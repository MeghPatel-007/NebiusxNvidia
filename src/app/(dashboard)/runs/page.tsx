import React from "react";
import Link from "next/link";
import { Sparkles, ExternalLink, Clock, CheckCircle2, XCircle } from "lucide-react";
import { getAgentRuns } from "@/lib/db/queries/agent-runs";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export const instant = false;

export default async function AgentRunsPage() {
  const runs = await getAgentRuns();

  return (
    <div className="flex flex-col flex-1">
      <RepoBreadcrumbs
        workspace="RepoPilot Space"
        repositoryName="Agent Runs"
        isPrivate={false}
        tagsCount={runs.length}
        branchesCount={12}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Agent Debugging Runs</h1>
            <p className="text-sm text-[#6B7280]">
              All autonomous diagnosis, patch generation, and test execution runs.
            </p>
          </div>

          <Link
            href="/runs/new"
            className="flex items-center gap-1.5 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-white hover:bg-[#059669] transition-colors shadow-xs"
          >
            <Sparkles className="h-4 w-4" />
            <span>New Debug Session</span>
          </Link>
        </div>

        {/* Runs Table */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#F3F4F6] text-xs font-semibold text-[#6B7280]">
                  <th className="py-3 pr-4">Session Title & Issue</th>
                  <th className="py-3 px-4">Repository</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {runs.map((run) => (
                  <tr key={run.id} className="hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-3.5 pr-4">
                      <Link
                        href={`/runs/${run.id}`}
                        className="font-semibold text-[#111827] hover:text-[#10B981] transition-colors"
                      >
                        {run.title}
                      </Link>
                      <div className="text-xs text-[#6B7280] line-clamp-1">{run.issueDescription}</div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#4B5563]">
                      {run.repoFullName || run.repoName}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          run.status === "passed"
                            ? "bg-[#E6F9F0] text-[#059669]"
                            : run.status === "running"
                            ? "bg-blue-50 text-blue-700 animate-pulse"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {run.status === "passed" && <CheckCircle2 className="h-3 w-3" />}
                        {run.status === "running" && <Clock className="h-3 w-3" />}
                        {run.status === "failed" && <XCircle className="h-3 w-3" />}
                        {run.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="text-xs font-medium text-[#374151]">
                        {run.verificationStatus === "verified"
                          ? "✓ Verified by Tests"
                          : run.verificationStatus === "failed"
                          ? "✕ Tests Failed"
                          : "Pending Run"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#6B7280]">
                      {Math.round(run.durationMs / 1000)}s
                    </td>
                    <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                      <Link
                        href={`/runs/${run.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#10B981] hover:underline"
                      >
                        <span>Inspect</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
