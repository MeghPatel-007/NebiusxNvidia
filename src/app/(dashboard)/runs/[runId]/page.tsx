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
    <div className="flex flex-col flex-1 bg-card">
      <RepoBreadcrumbs
        workspace="Vektora Space"
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
              className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-border bg-card text-muted-foreground hover:text-foreground transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
            >
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-foreground">{run.title}</h1>
                <span
                  className={`inline-flex items-center gap-1 h-[22px] px-2 rounded-[6px] text-[12px] font-[500] ${
                    run.status === "passed"
                      ? "bg-(--success-bg) text-(--brand)"
                      : run.status === "running"
                      ? "bg-[#2563EB]/10 text-[#60A5FA]"
                      : "bg-(--danger-bg) text-(--danger)"
                  }`}
                >
                  <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
                  {run.status.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-muted-foreground mt-1">
                <span>Session ID: <code className="font-mono text-foreground">{run.id}</code></span>
                <span>•</span>
                <span>Repository: {run.repoFullName || run.repoName}</span>
                <span>•</span>
                <span>Branch: {run.branch}</span>
                {run.commitSha && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <GitCommit className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                      {run.commitSha}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[13px] font-[500] text-(--brand) bg-(--success-bg) px-3 py-1.5 rounded-[8px] border border-[#76B900]/30">
              <Cpu className="h-3.5 w-3.5" strokeWidth={1.5} />
              {run.modelUsed}
            </span>
          </div>
        </div>

        {/* Overview & Issue Card */}
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-3">
          <h2 className="text-[13px] font-[500] text-foreground uppercase tracking-[0.02em]">
            Issue Description & Context
          </h2>
          <p className="text-[14.5px] text-foreground leading-relaxed bg-[#FDFDFD] p-4 rounded-[8px] border border-border">
            {run.issueDescription}
          </p>
        </div>

        {/* Findings with File & Line Reference */}
        {run.findings && run.findings.length > 0 && (
          <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-[#D97706]" strokeWidth={1.5} />
              <h2 className="text-[13px] font-[500] text-foreground uppercase tracking-[0.02em]">
                Diagnostic Findings ({run.findings.length})
              </h2>
            </div>
            <div className="space-y-3">
              {run.findings.map((finding) => (
                <div
                  key={finding.id}
                  className="flex items-start gap-3 p-4 rounded-[8px] border border-[#D97706]/30 bg-[#D97706]/10"
                >
                  <div className="flex-1 text-[13.5px] text-foreground">
                    <div className="flex items-center gap-2 font-mono font-[500] text-foreground mb-1">
                      <FileCode className="h-3.5 w-3.5 text-[#D97706]" strokeWidth={1.5} />
                      <span>{finding.file}:{finding.line}</span>
                    </div>
                    <p>{finding.message}</p>
                  </div>
                  <span className="rounded-[6px] bg-[#D97706]/15 px-2 py-0.5 text-[11px] font-[500] text-[#FBBF24] uppercase">
                    {finding.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Patch Diff View */}
        {run.patchDiff && (
          <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode className="h-4 w-4 text-(--brand)" strokeWidth={1.5} />
                <h2 className="text-[13px] font-[500] text-foreground uppercase tracking-[0.02em]">
                  Generated Patch Diff
                </h2>
              </div>
              <span className="text-[13px] text-muted-foreground">Unified diff format</span>
            </div>

            <pre className="overflow-x-auto rounded-[8px] bg-[#1E293B] p-4 text-[13px] font-mono text-[#E2E8F0] leading-relaxed">
              {run.patchDiff.split("\n").map((line, idx) => {
                let color = "text-[#E2E8F0]";
                if (line.startsWith("+")) color = "text-[#4ADE80] bg-emerald-950/40";
                if (line.startsWith("-")) color = "text-[#F87171] bg-rose-950/40";
                if (line.startsWith("@")) color = "text-[#38BDF8]";
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
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-(--brand)" strokeWidth={1.5} />
              <h2 className="text-[13px] font-[500] text-foreground uppercase tracking-[0.02em]">
                Automated Test Verification
              </h2>
            </div>
            <span
              className={`rounded-[6px] px-2.5 py-0.5 text-[12px] font-[500] ${
                run.testExitCode === 0
                  ? "bg-(--success-bg) text-(--brand)"
                  : "bg-(--danger-bg) text-(--danger)"
              }`}
            >
              Exit code: {run.testExitCode ?? 0}
            </span>
          </div>

          {run.testCommand && (
            <div className="text-[13.5px] text-foreground">
              Executed command: <code className="font-mono bg-[#F6F6F8] border border-border px-2 py-0.5 rounded-[6px] text-foreground">{run.testCommand}</code>
            </div>
          )}

          {run.testStdout && (
            <pre className="overflow-x-auto rounded-[8px] bg-[#0F172A] p-4 text-[13px] font-mono text-[#4ADE80] leading-relaxed whitespace-pre-wrap">
              {run.testStdout}
            </pre>
          )}

          {run.testStderr && (
            <pre className="overflow-x-auto rounded-[8px] bg-[#0F172A] p-4 text-[13px] font-mono text-[#F87171] leading-relaxed whitespace-pre-wrap">
              {run.testStderr}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
