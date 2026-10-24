import React from "react";
import { Cpu } from "lucide-react";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export default function ModelsPage() {
  const models = [
    {
      name: "nvidia/nemotron-4-340b-instruct",
      provider: "Nebius Token Factory",
      status: "Ready",
      contextWindow: "4,096 tokens",
      tokensUsed: "1,248,300",
      avgLatency: "240ms/tok",
      role: "Primary code reasoning & multi-file synthesis",
      isDefault: true,
    },
    {
      name: "nvidia/llama-3.1-nemotron-70b-instruct",
      provider: "Nebius Token Factory",
      status: "Ready",
      contextWindow: "128k tokens",
      tokensUsed: "834,100",
      avgLatency: "95ms/tok",
      role: "Fast localized bug diagnosis & patch verification",
      isDefault: false,
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <RepoBreadcrumbs
        workspace="RepoPilot Space"
        repositoryName="Models & Usage"
        isPrivate={false}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">AI Models & Infrastructure</h1>
          <p className="text-sm text-[#6B7280]">
            Inference engine and Token Factory telemetry running on NVIDIA GPU clusters via Nebius AI Cloud.
          </p>
        </div>

        {/* Status Callout */}
        <div className="rounded-2xl border border-[#C7E8CE] bg-[#E6F9F0] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981] text-white">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-sm text-[#065F46]">
                Nebius Token Factory Integration Active
              </div>
              <div className="text-xs text-[#047857]">
                Serverless endpoint connected with promo credits (NEBIUS-DEVPOST-GLOBAL26)
              </div>
            </div>
          </div>
          <span className="rounded-lg bg-white px-3 py-1 text-xs font-semibold text-[#059669] shadow-2xs">
            Operational
          </span>
        </div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((m, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-semibold text-base text-[#111827]">{m.name}</h3>
                    <span className="text-xs text-[#6B7280]">{m.provider}</span>
                  </div>
                  {m.isDefault && (
                    <span className="rounded-full bg-[#E6F9F0] px-2.5 py-0.5 text-xs font-semibold text-[#059669]">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#4B5563] mt-2">{m.role}</p>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#F3F4F6] text-xs">
                  <div>
                    <div className="text-[#9CA3AF]">Tokens Billed</div>
                    <div className="font-semibold text-[#111827] mt-0.5">{m.tokensUsed}</div>
                  </div>
                  <div>
                    <div className="text-[#9CA3AF]">Avg Generation Latency</div>
                    <div className="font-semibold text-[#111827] mt-0.5">{m.avgLatency}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#F3F4F6] text-xs">
                <span className="inline-flex items-center gap-1.5 font-medium text-[#059669]">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  {m.status}
                </span>
                <span className="text-[#9CA3AF]">Context: {m.contextWindow}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
