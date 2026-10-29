import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";
import { getBenchmark, BENCHMARK_SEED } from "@/lib/benchmarks";

export default async function BenchmarkDetailPage({
  params,
}: {
  params: Promise<{ benchmarkId: string }>;
}) {
  const { benchmarkId } = await params;
  const bench = getBenchmark(benchmarkId);
  if (!bench) notFound();

  const metrics: { label: string; value: string; note: string }[] = [
    {
      label: "Pass Rate",
      value: bench.passRate,
      note: "Relevant tests passed after patch application and re-run.",
    },
    {
      label: "Resolved Issues",
      value: String(bench.resolved),
      note: `Of ${bench.samples} sampled issues on ${bench.dataset}.`,
    },
    {
      label: "Avg Duration",
      value: bench.avgTime,
      note: "End-to-end execution on Nebius Token Factory serverless endpoints.",
    },
  ];

  return (
    <div className="flex flex-col flex-1 bg-card">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="Benchmarks"
        isPrivate={false}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        <Link
          href="/benchmarks"
          className="inline-flex items-center gap-1.5 text-[13.5px] text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          Back to Benchmarks
        </Link>

        <div>
          <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-foreground">
            {bench.dataset}
          </h1>
          <p className="text-[14.5px] font-[400] text-muted-foreground">
            Evaluation record for {bench.model} on Nebius Token Factory.
          </p>
          <p className="mt-1 text-[12.5px] text-muted-foreground">
            Seed data — sample evaluation result shown for the hackathon demo,
            not live backend output.
          </p>
        </div>

        {/* Summary metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-[10px] border border-border bg-card p-5 shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
            >
              <div className="text-[13px] text-muted-foreground font-[400]">
                {m.label}
              </div>
              <div className="text-[32px] font-[500] text-foreground mt-2">
                {m.value}
              </div>
              <div className="text-[12.5px] text-muted-foreground mt-1">
                {m.note}
              </div>
            </div>
          ))}
        </div>

        {/* Methodology */}
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
          <h2 className="text-[16px] font-[500] text-foreground">
            Verification Methodology
          </h2>
          <ul className="space-y-2.5 text-[13.5px] text-muted-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle2
                className="h-4 w-4 shrink-0 mt-0.5 text-(--brand)"
                strokeWidth={1.75}
              />
              <span>
                Agent executes against known issues from the {bench.dataset}{" "}
                split ({bench.samples} samples).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2
                className="h-4 w-4 shrink-0 mt-0.5 text-(--brand)"
                strokeWidth={1.75}
              />
              <span>
                NVIDIA Nemotron diagnosis runs via Nebius Token Factory
                serverless endpoints.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2
                className="h-4 w-4 shrink-0 mt-0.5 text-(--brand)"
                strokeWidth={1.75}
              />
              <span>
                A fix counts as resolved only when the relevant tests execute
                and pass after patching — model assertions alone do not count.
              </span>
            </li>
          </ul>
        </div>

        {/* Cross-references */}
        <div className="rounded-[10px] border border-border bg-card p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
          <h2 className="text-[16px] font-[500] text-foreground mb-4">
            Other Evaluation Records
          </h2>
          <ul className="space-y-2.5">
            {BENCHMARK_SEED.filter((b) => b.id !== bench.id).map((b) => (
              <li key={b.id}>
                <Link
                  href={`/benchmarks/${b.id}`}
                  className="flex items-center justify-between rounded-[8px] border border-border px-4 py-2.5 text-[13.5px] hover:bg-accent transition-colors"
                >
                  <span className="font-[500] text-foreground">{b.dataset}</span>
                  <span className="font-[500] text-(--brand)">
                    {b.passRate}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
