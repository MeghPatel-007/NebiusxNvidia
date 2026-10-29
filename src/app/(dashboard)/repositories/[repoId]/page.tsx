import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Book,
  GitBranch,
  Sparkles,
  ExternalLink,
  GitCommit,
} from "lucide-react";
import { getRepositoryById } from "@/lib/db/queries/repositories";
import { getAgentRuns } from "@/lib/db/queries/agent-runs";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";
import { RepositoryCommitHistory } from "@/components/repositories/repository-commit-history";

export const instant = false;

export default async function RepositoryDetailPage({
  params,
}: {
  params: Promise<{ repoId: string }>;
}) {
  const { repoId } = await params;
  const repo = await getRepositoryById(repoId);

  if (!repo) {
    notFound();
  }

  const allRuns = await getAgentRuns();
  const repoRuns = allRuns.filter((r) => r.repoId === repo.id);

  return (
    <div className="flex flex-col flex-1 bg-card">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName={repo.name}
        isPrivate={repo.isPrivate}
        tagsCount={4}
        branchesCount={8}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Repo Header Card */}
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-(--success-bg) text-(--brand)">
                  <Book className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-foreground">
                    {repo.fullName}
                  </h1>
                  <div className="flex items-center gap-3 text-[13px] text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Branch: <code className="font-[500] text-foreground">{repo.defaultBranch}</code>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-[500] text-foreground">
                      <span className="h-2 w-2 rounded-full bg-(--brand)" />
                      {repo.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/runs/new?repoId=${repo.id}`}
                className="flex items-center gap-1.5 h-[34px] px-3.5 rounded-[10px] bg-(--brand) text-[14.5px] font-[500] text-white hover:bg-[#76B900]/90 transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
              >
                <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                <span>New Debug Session</span>
              </Link>
            </div>
          </div>

          <p className="text-[14.5px] text-foreground mt-4">{repo.description}</p>
        </div>

        {/* Recent GitHub Commits */}
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
          <div>
            <h2 className="text-[18px] font-[500] text-foreground flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-muted-foreground" />
              <span>Recent Commits</span>
            </h2>
            <p className="text-[13px] text-muted-foreground">
              Latest commit history and verification status fetched via GitHub integration.
            </p>
          </div>
          <RepositoryCommitHistory repoId={repo.id} branch={repo.defaultBranch} />
        </div>

        {/* Runs History Table for this Repo */}
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[18px] font-[500] text-foreground">Agent Debug History</h2>
              <p className="text-[13px] text-muted-foreground">
                Autonomous test runs and patch generation history for this repository.
              </p>
            </div>
          </div>

          {repoRuns.length === 0 ? (
            <div className="py-12 text-center text-[14px] text-muted-foreground">
              No agent runs recorded for this repository yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[14.5px]">
                <thead>
                  <tr className="border-b border-border text-[13px] font-[500] text-muted-foreground">
                    <th className="py-2.5 pr-4">Issue Summary</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4">Verification</th>
                    <th className="py-2.5 px-4">Model</th>
                    <th className="py-2.5 px-4">Duration</th>
                    <th className="py-2.5 pl-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {repoRuns.map((run) => (
                    <tr key={run.id} className="h-[44px] hover:bg-black/[0.02] transition-colors">
                      <td className="py-2 pr-4 font-[500] text-foreground max-w-xs truncate">
                        {run.title}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center h-[22px] px-2 rounded-[6px] text-[12px] font-[500] ${
                            run.status === "passed"
                              ? "bg-(--success-bg) text-(--brand)"
                              : run.status === "running"
                              ? "bg-[#2563EB]/10 text-[#60A5FA]"
                              : "bg-(--danger-bg) text-(--danger)"
                          }`}
                        >
                          {run.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        <span className="text-[13px] text-foreground font-[400]">
                          {run.verificationStatus === "verified" ? "✓ Test Passed" : "Pending"}
                        </span>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-[13px] text-muted-foreground">
                        {run.modelUsed}
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap text-[13px] text-muted-foreground">
                        {Math.round(run.durationMs / 1000)}s
                      </td>
                      <td className="py-2 pl-4 text-right whitespace-nowrap">
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
          )}
        </div>
      </div>
    </div>
  );
}
