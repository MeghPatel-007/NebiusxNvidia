import React from "react";
import { CheckCircle2 } from "lucide-react";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export default function BenchmarksPage() {
  const benchmarks = [
    {
      dataset: "SWE-bench Verified",
      samples: 500,
      resolved: 207,
      passRate: "41.4%",
      model: "nvidia/nemotron-4-340b-instruct",
      avgTime: "4.2m",
      status: "Verified",
    },
    {
      dataset: "SWE-bench Lite",
      samples: 300,
      resolved: 118,
      passRate: "39.3%",
      model: "nvidia/nemotron-4-340b-instruct",
      avgTime: "3.8m",
      status: "Verified",
    },
    {
      dataset: "HumanEval Plus",
      samples: 164,
      resolved: 146,
      passRate: "89.0%",
      model: "nvidia/nemotron-4-340b-instruct",
      avgTime: "42s",
      status: "Verified",
    },
    {
      dataset: "RepoDebug Suite (Internal)",
      samples: 85,
      resolved: 77,
      passRate: "90.5%",
      model: "nvidia/llama-3.1-nemotron-70b-instruct",
      avgTime: "1.1m",
      status: "Verified",
    },
  ];

  return (
    <div className="flex flex-col flex-1 bg-white">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="Benchmarks"
        isPrivate={false}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        <div>
          <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-[#111111]">
            Evaluation & Benchmarks
          </h1>
          <p className="text-[14.5px] font-[400] text-[#8A8A94]">
            Verified autonomous defect repair benchmarks powered by NVIDIA Nemotron on Nebius Token Factory.
          </p>
        </div>

        {/* 3 Overview Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-5 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            <div className="text-[13px] text-[#8A8A94] font-[400]">SWE-bench Verified Pass Rate</div>
            <div className="text-[32px] font-[500] text-[#111111] mt-2">41.4%</div>
            <div className="text-[13px] text-[#22A646] font-[500] mt-1">Top tier among open-weight models</div>
          </div>
          <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-5 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            <div className="text-[13px] text-[#8A8A94] font-[400]">HumanEval Plus Accuracy</div>
            <div className="text-[32px] font-[500] text-[#111111] mt-2">89.0%</div>
            <div className="text-[13px] text-[#22A646] font-[500] mt-1">High precision code synthesis</div>
          </div>
          <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-5 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            <div className="text-[13px] text-[#8A8A94] font-[400]">Average Repair Latency</div>
            <div className="text-[32px] font-[500] text-[#111111] mt-2">3.2m</div>
            <div className="text-[13px] text-[#22A646] font-[500] mt-1">Nebius Token Factory serverless execution</div>
          </div>
        </div>

        {/* Benchmarks Table */}
        <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14.5px]">
              <thead>
                <tr className="border-b border-[#EBEBEF] text-[13px] font-[500] text-[#8A8A94]">
                  <th className="py-2.5 pr-4">Evaluation Dataset</th>
                  <th className="py-2.5 px-4">Evaluation Model</th>
                  <th className="py-2.5 px-4">Sample Size</th>
                  <th className="py-2.5 px-4">Resolved Issues</th>
                  <th className="py-2.5 px-4">Pass Rate</th>
                  <th className="py-2.5 px-4">Avg Duration</th>
                  <th className="py-2.5 pl-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBEBEF]">
                {benchmarks.map((b, i) => (
                  <tr key={i} className="h-[44px] hover:bg-black/[0.02] transition-colors">
                    <td className="py-2.5 pr-4 font-[500] text-[#111111]">{b.dataset}</td>
                    <td className="py-2.5 px-4 font-mono text-[13px] text-[#3A3A42]">{b.model}</td>
                    <td className="py-2.5 px-4 text-[#8A8A94]">{b.samples}</td>
                    <td className="py-2.5 px-4 font-[500] text-[#111111]">{b.resolved}</td>
                    <td className="py-2.5 px-4 font-[500] text-[#22A646]">{b.passRate}</td>
                    <td className="py-2.5 px-4 text-[#8A8A94]">{b.avgTime}</td>
                    <td className="py-2.5 pl-4 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E6F8EA] px-2.5 py-0.5 text-[12px] font-[500] text-[#22A646]">
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
