import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Terminal,
  FileCode,
  AlertTriangle,
  GitCommit,
  Cpu,
} from "lucide-react";
import { getAgentRunById } from "@/lib/db/queries/agent-runs";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export const instant = false;

export default async function RunDetailPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;
  const run = await getAgentRunById(runId);

  if (!run) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-1">
      <RepoBreadcrumbs
        workspace="RepoPilot Space"
        repositoryName={run.repoName || "prime-marketplace-3.0"}
        isPrivate={true}
        tagsCount={2}
        branchesCount={4}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Top Navigation & Status Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/runs"
              className="p-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#111827] transition-colors shadow-2xs"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-[#111827]">{run.title}</h1>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    run.status === "passed"
                      ? "bg-[#E6F9F0] text-[#059669]"
                      : run.status === "running"
                      ? "bg-blue-50 text-blue-700 animate-pulse"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" />
                  {run.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#6B7280] mt-1">
                <span>Session ID: <code className="font-mono">{run.id}</code></span>
                <span>•</span>
                <span>Repository: {run.repoFullName || run.repoName}</span>
                <span>•</span>
                <span>Branch: {run.branch}</span>
                {run.commitSha && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <GitCommit className="h-3 w-3" />
                      {run.commitSha}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#059669] bg-[#E6F9F0] px-3 py-1.5 rounded-lg border border-[#C7E8CE]">
              <Cpu className="h-3.5 w-3.5" />
              {run.modelUsed}
            </span>
          </div>
        </div>

        {/* Overview & Issue Card */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs space-y-4">
          <h2 className="text-sm font-semibold text-[#111827] uppercase tracking-wider">
            Issue Description & Context
          </h2>
          <p className="text-sm text-[#374151] leading-relaxed bg-[#F9FAFB] p-4 rounded-xl border border-[#F3F4F6]">
            {run.issueDescription}
          </p>
        </div>

        {/* Findings with File & Line Reference */}
        {run.findings && run.findings.length > 0 && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <h2 className="text-sm font-semibold text-[#111827] uppercase tracking-wider">
                Diagnostic Findings ({run.findings.length})
              </h2>
            </div>
            <div className="space-y-3">
              {run.findings.map((finding) => (
                <div
                  key={finding.id}
                  className="flex items-start gap-3 p-4 rounded-xl border border-amber-200 bg-amber-50/50"
                >
                  <div className="flex-1 text-xs text-[#374151]">
                    <div className="flex items-center gap-2 font-mono font-semibold text-[#111827] mb-1">
                      <FileCode className="h-3.5 w-3.5 text-amber-600" />
                      <span>{finding.file}:{finding.line}</span>
                    </div>
                    <p>{finding.message}</p>
                  </div>
                  <span className="rounded-md bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 uppercase">
                    {finding.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patch Diff View */}
        {run.patchDiff && (
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-[#10B981]" />
                <h2 className="text-sm font-semibold text-[#111827] uppercase tracking-wider">
                  Generated Patch Diff
                </h2>
              </div>
              <span className="text-xs text-[#6B7280]">Unified diff format</span>
            </div>

            <pre className="overflow-x-auto rounded-xl bg-[#1E293B] p-4 text-xs font-mono text-[#E2E8F0] leading-relaxed">
              {run.patchDiff.split("\n").map((line, idx) => {
                let color = "text-[#E2E8F0]";
                if (line.startsWith("+")) color = "text-emerald-400 bg-emerald-950/40";
                if (line.startsWith("-")) color = "text-rose-400 bg-rose-950/40";
                if (line.startsWith("@")) color = "text-cyan-400";
                return (
                  <div key={idx} className={color}>
                    {line}
                  </div>
                );
              })}
            </pre>
          </div>
        )}

        {/* Verification Test Execution Results */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#10B981]" />
              <h2 className="text-sm font-semibold text-[#111827] uppercase tracking-wider">
                Automated Test Verification
              </h2>
            </div>
            <span
              className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                run.testExitCode === 0
                  ? "bg-[#E6F9F0] text-[#059669]"
                  : "bg-red-50 text-red-700"
              }`}
            >
              Exit code: {run.testExitCode ?? 0}
            </span>
          </div>

          {run.testCommand && (
            <div className="text-xs text-[#4B5563]">
              Executed command: <code className="font-mono bg-[#F3F4F6] px-2 py-1 rounded-md text-[#111827]">{run.testCommand}</code>
            </div>
          )}

          {run.testStdout && (
            <pre className="overflow-x-auto rounded-xl bg-[#0F172A] p-4 text-xs font-mono text-emerald-400 leading-relaxed whitespace-pre-wrap">
              {run.testStdout}
            </pre>
          )}

          {run.testStderr && (
            <pre className="overflow-x-auto rounded-xl bg-[#0F172A] p-4 text-xs font-mono text-rose-400 leading-relaxed whitespace-pre-wrap">
              {run.testStderr}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
