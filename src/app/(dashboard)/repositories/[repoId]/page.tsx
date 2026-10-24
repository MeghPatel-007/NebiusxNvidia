import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  FolderGit2,
  GitBranch,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { getRepositoryById } from "@/lib/db/queries/repositories";
import { getAgentRuns } from "@/lib/db/queries/agent-runs";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

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
    <div className="flex flex-col flex-1">
      <RepoBreadcrumbs
        workspace="RepoPilot Space"
        repositoryName={repo.name}
        isPrivate={repo.isPrivate}
        tagsCount={4}
        branchesCount={8}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Repo Header Card */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E6F9F0] text-[#10B981]">
                  <FolderGit2 className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-[#111827]">{repo.fullName}</h1>
                  <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                    <span className="flex items-center gap-1">
                      <GitBranch className="h-3.5 w-3.5" />
                      Default branch: <code className="font-semibold">{repo.defaultBranch}</code>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-medium text-[#111827]">
                      <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                      {repo.language}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href={`/runs/new?repoId=${repo.id}`}
                className="flex items-center gap-1.5 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-white hover:bg-[#059669] transition-colors shadow-xs"
              >
                <Sparkles className="h-4 w-4" />
                <span>New Debug Session</span>
              </Link>
            </div>
          </div>

          <p className="text-sm text-[#4B5563] mt-4">{repo.description}</p>
        </div>

        {/* Runs History Table for this Repo */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-semibold text-[#111827]">Agent Debug History</h2>
              <p className="text-xs text-[#6B7280]">
                Autonomous test runs and patch generation history for this repository.
              </p>
            </div>
          </div>

          {repoRuns.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#6B7280]">
              No agent runs recorded for this repository yet. Click &quot;New Debug Session&quot; to begin.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#F3F4F6] text-xs font-semibold text-[#6B7280]">
                    <th className="py-3 pr-4">Issue Summary</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Verification</th>
                    <th className="py-3 px-4">Model</th>
                    <th className="py-3 px-4">Duration</th>
                    <th className="py-3 pl-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F3F4F6]">
                  {repoRuns.map((run) => (
                    <tr key={run.id} className="hover:bg-[#F9FAFB] transition-colors">
                      <td className="py-3.5 pr-4 font-semibold text-[#111827] max-w-xs truncate">
                        {run.title}
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
                          {run.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="text-xs text-[#4B5563] font-medium">
                          {run.verificationStatus === "verified" ? "✓ Test Passed" : "Pending"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-xs text-[#6B7280]">
                        {run.modelUsed}
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
          )}
        </div>
      </div>
    </div>
  );
}
