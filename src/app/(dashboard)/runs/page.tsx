import React from "react";
import Link from "next/link";
import { Sparkles, ExternalLink, CheckCircle2, Clock, XCircle } from "lucide-react";
import { getAgentRuns } from "@/lib/db/queries/agent-runs";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export const instant = false;

export default async function AgentRunsPage() {
  const runs = await getAgentRuns();

  return (
    <div className="flex flex-col flex-1 bg-card">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="Agent Runs"
        isPrivate={false}
        tagsCount={runs.length}
        branchesCount={12}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-foreground">
              Agent Debugging Runs
            </h1>
            <p className="text-[14.5px] font-[400] text-muted-foreground">
              All autonomous diagnosis, patch generation, and test execution runs.
            </p>
          </div>

          <Link
            href="/runs/new"
            className="flex items-center gap-1.5 h-[34px] px-3.5 rounded-[10px] bg-(--brand) text-[14.5px] font-[500] text-white hover:bg-[#76B900]/90 transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          >
            <Sparkles className="h-4 w-4" strokeWidth={1.5} />
            <span>New Debug Session</span>
          </Link>
        </div>

        {/* Runs Table */}
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-border text-[13px] font-[500] text-muted-foreground">
                  <th className="py-2.5 pr-4">Session Title & Issue</th>
                  <th className="py-2.5 px-4">Repository</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4">Verification</th>
                  <th className="py-2.5 px-4">Duration</th>
                  <th className="py-2.5 pl-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {runs.map((run) => (
                  <tr key={run.id} className="h-[44px] hover:bg-black/[0.02] transition-colors">
                    <td className="py-2.5 pr-4">
                      <Link
                        href={`/runs/${run.id}`}
                        className="font-[500] text-foreground hover:text-(--brand) transition-colors"
                      >
                        {run.title}
                      </Link>
                      <div className="text-[13px] text-muted-foreground line-clamp-1">{run.issueDescription}</div>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap text-[13.5px] text-foreground">
                      {run.repoFullName || run.repoName}
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 h-[22px] px-2 rounded-[6px] text-[12px] font-[500] ${
                          run.status === "passed"
                            ? "bg-(--success-bg) text-(--brand)"
                            : run.status === "running"
                            ? "bg-[#2563EB]/10 text-[#60A5FA]"
                            : "bg-(--danger-bg) text-(--danger)"
                        }`}
                      >
                        {run.status === "passed" && <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />}
                        {run.status === "running" && <Clock className="h-3 w-3" strokeWidth={1.5} />}
                        {run.status === "failed" && <XCircle className="h-3 w-3" strokeWidth={1.5} />}
                        {run.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap">
                      <span className="text-[13px] font-[400] text-foreground">
                        {run.verificationStatus === "verified"
                          ? "✓ Verified by Tests"
                          : run.verificationStatus === "failed"
                          ? "✕ Tests Failed"
                          : "Pending Run"}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 whitespace-nowrap text-[13px] text-muted-foreground">
                      {Math.round(run.durationMs / 1000)}s
                    </td>
                    <td className="py-2.5 pl-4 text-right whitespace-nowrap">
                      <Link
                        href={`/runs/${run.id}`}
                        className="inline-flex items-center gap-1 text-[13.5px] font-[500] text-(--brand) hover:underline"
                      >
                        <span>Inspect</span>
                        <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
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
