import React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";
import { BENCHMARK_SEED } from "@/lib/benchmarks";

export default function BenchmarksPage() {
  return (
    <div className="flex flex-col flex-1 bg-card">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="Benchmarks"
        isPrivate={false}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        <div>
          <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-foreground">
            Evaluation & Benchmarks
          </h1>
          <p className="text-[14.5px] font-[400] text-muted-foreground">
            Verified autonomous defect repair benchmarks powered by NVIDIA Nemotron on Nebius Token Factory.
          </p>
          <p className="mt-1 inline-flex items-center gap-2 text-[12.5px] text-muted-foreground">
            <span className="rounded-full bg-(--neutral-pill-bg) px-2 py-0.5 text-[11px] font-[500] uppercase tracking-wider text-muted-foreground border border-border">
              Seed data
            </span>
            Sample evaluation results shown for the hackathon demo, not live backend output.
          </p>
        </div>

        {/* 3 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-[10px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            <div className="text-[13px] text-muted-foreground font-[400]">SWE-bench Verified Pass Rate</div>
            <div className="text-[32px] font-[500] text-foreground mt-2">41.4%</div>
            <div className="text-[13px] text-(--brand) font-[500] mt-1">Top tier among open-weight models</div>
          </div>
          <div className="rounded-[10px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            <div className="text-[13px] text-muted-foreground font-[400]">HumanEval Plus Accuracy</div>
            <div className="text-[32px] font-[500] text-foreground mt-2">89.0%</div>
            <div className="text-[13px] text-(--brand) font-[500] mt-1">High precision code synthesis</div>
          </div>
          <div className="rounded-[10px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            <div className="text-[13px] text-muted-foreground font-[400]">Average Repair Latency</div>
            <div className="text-[32px] font-[500] text-foreground mt-2">3.2m</div>
            <div className="text-[13px] text-(--brand) font-[500] mt-1">Nebius Token Factory serverless execution</div>
          </div>
        </div>

        {/* Benchmarks Table */}
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-border text-[13px] font-[500] text-muted-foreground">
                  <th className="py-2.5 pr-4">Evaluation Dataset</th>
                  <th className="py-2.5 px-4">Evaluation Model</th>
                  <th className="py-2.5 px-4">Sample Size</th>
                  <th className="py-2.5 px-4">Resolved Issues</th>
                  <th className="py-2.5 px-4">Pass Rate</th>
                  <th className="py-2.5 px-4">Avg Duration</th>
                  <th className="py-2.5 pl-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {BENCHMARK_SEED.map((b, i) => (
                  <tr key={b.id} className="h-[44px] hover:bg-black/[0.02] transition-colors">
                    <td className="py-2.5 pr-4 font-[500] text-foreground">
                      <Link href={`/benchmarks/${b.id}`} className="hover:underline">
                        {b.dataset}
                      </Link>
                    </td>
                    <td className="py-2.5 px-4 font-mono text-[13px] text-foreground">{b.model}</td>
                    <td className="py-2.5 px-4 text-muted-foreground">{b.samples}</td>
                    <td className="py-2.5 px-4 font-[500] text-foreground">{b.resolved}</td>
                    <td className="py-2.5 px-4 font-[500] text-(--brand)">{b.passRate}</td>
                    <td className="py-2.5 px-4 text-muted-foreground">{b.avgTime}</td>
                    <td className="py-2.5 pl-4 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-(--success-bg) px-2.5 py-0.5 text-[12px] font-[500] text-(--brand)">
                        <CheckCircle2 className="h-3 w-3" strokeWidth={1.5} />
                        {b.status}
                      </span>
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
