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
    <div className="flex flex-col flex-1 bg-white">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="Models & Usage"
        isPrivate={false}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        <div>
          <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-[#111111]">
            AI Models & Infrastructure
          </h1>
          <p className="text-[14.5px] font-[400] text-[#8A8A94]">
            Inference engine and Token Factory telemetry running on NVIDIA GPU clusters via Nebius AI Cloud.
          </p>
        </div>

        {/* Status Callout */}
        <div className="rounded-[10px] border border-[#A3E9B5] bg-[#E6F8EA] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#22A646] text-white">
              <Cpu className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <div className="font-[500] text-[15px] text-[#111111]">
                Nebius Token Factory Integration Active
              </div>
              <div className="text-[13px] text-[#22A646]">
                Serverless endpoint connected with promo credits (NEBIUS-DEVPOST-GLOBAL26)
              </div>
            </div>
          </div>
          <span className="rounded-[6px] bg-white px-3 py-1 text-[12px] font-[500] text-[#22A646] shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            Operational
          </span>
        </div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {models.map((m, idx) => (
            <div
              key={idx}
              className="rounded-[10px] border border-[#EBEBEF] bg-white p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-[500] text-[17px] text-[#111111]">{m.name}</h3>
                    <span className="text-[13px] text-[#8A8A94]">{m.provider}</span>
                  </div>
                  {m.isDefault && (
                    <span className="rounded-full bg-[#E6F8EA] px-2.5 py-0.5 text-[12px] font-[500] text-[#22A646]">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-[13.5px] text-[#3A3A42] mt-2">{m.role}</p>

                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[#EBEBEF] text-[13px]">
                  <div>
                    <div className="text-[#8A8A94]">Tokens Billed</div>
                    <div className="font-[500] text-[#111111] mt-0.5">{m.tokensUsed}</div>
                  </div>
                  <div>
                    <div className="text-[#8A8A94]">Avg Generation Latency</div>
                    <div className="font-[500] text-[#111111] mt-0.5">{m.avgLatency}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#EBEBEF] text-[13px]">
                <span className="inline-flex items-center gap-1.5 font-[500] text-[#22A646]">
                  <span className="h-2 w-2 rounded-full bg-[#22A646]" />
                  {m.status}
                </span>
                <span className="text-[#8A8A94]">Context: {m.contextWindow}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
