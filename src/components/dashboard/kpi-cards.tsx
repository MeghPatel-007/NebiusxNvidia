"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import { MetricSummary } from "@/types/api";
import { cn } from "@/lib/utils";

interface KpiCardsProps {
  metrics?: MetricSummary;
}

export function KpiCards({ metrics }: KpiCardsProps) {
  const cards = [
    {
      title: "Contribute Rate",
      subtitle: "Member Average",
      value: metrics ? `${metrics.verifiedFixes}` : "65,4",
      change: "+21.8%",
      isPositive: true,
      isNeutral: false,
    },
    {
      title: "Commit Rate",
      subtitle: "Member Average",
      value: metrics ? `${metrics.testPassRate}` : "32,6",
      change: "0.0%",
      isPositive: false,
      isNeutral: true,
    },
    {
      title: "Hours Rate",
      subtitle: "Member Average",
      value: metrics ? `${metrics.avgRepairTimeMinutes}` : "35,6",
      change: "+12.0%",
      isPositive: true,
      isNeutral: false,
    },
    {
      title: "Work Rate",
      subtitle: "Member Average",
      value: metrics ? `${metrics.connectedReposChange < 0 ? "31,1%" : "31.1%"}` : "31,1%",
      change: "-9.0%",
      isPositive: false,
      isNeutral: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-[#E5E7EB] bg-white p-5 flex flex-col justify-between hover:border-[#D1D5DB] transition-all shadow-2xs"
        >
          {/* Top title & three dots */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-medium text-[#111827]">{card.title}</span>
            <button
              aria-label="Options"
              className="text-[#9CA3AF] hover:text-[#4B5563] p-1 rounded-md hover:bg-[#F3F4F6] transition-colors"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>

          <div className="text-[12px] text-[#9CA3AF] mb-3">{card.subtitle}</div>

          {/* Big number and delta pill */}
          <div className="flex items-baseline justify-between mt-auto">
            <span className="text-[28px] font-semibold text-[#111827] tracking-tight">
              {card.value}
            </span>

            <span
              className={cn(
                "rounded-md px-2 py-0.5 text-[12px] font-semibold",
                card.isNeutral
                  ? "bg-[#F3F4F6] text-[#6B7280]"
                  : card.isPositive
                  ? "bg-[#E6F9F0] text-[#10B981]"
                  : "bg-[#FEE2E2] text-[#EF4444]"
              )}
            >
              {card.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
