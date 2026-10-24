"use client";

import React from "react";
import { MoreHorizontal } from "lucide-react";
import { MetricSummary } from "@/types/api";

interface KpiCardsProps {
  metrics?: MetricSummary;
}

export function KpiCards({ metrics: _metrics }: KpiCardsProps) {
  const cards = [
    {
      title: "Contribute Rate",
      caption: "Member Average",
      value: "65,4",
      change: "+21.8%",
      pillClass: "bg-[#E6F8EA] text-[#22A646]",
    },
    {
      title: "Commit Rate",
      caption: "Member Average",
      value: "32,6",
      change: "0.0%",
      pillClass: "bg-[#F6F6F8] text-[#111111] border border-[#EBEBEF]",
    },
    {
      title: "Hours Rate",
      caption: "Member Average",
      value: "35,6",
      change: "+12.0%",
      pillClass: "bg-[#E6F8EA] text-[#22A646]",
    },
    {
      title: "Work Rate",
      caption: "Member Average",
      value: "31,1%",
      change: "-9.0%",
      pillClass: "bg-[#FFE8EA] text-[#E5484D]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-[#EBEBEF] bg-white py-3">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between px-4 py-2 min-h-[97px]"
        >
          {/* Row 1: Title + Three dots */}
          <div className="flex items-center justify-between">
            <span className="text-[16.5px] font-[450] text-[#3A3A42]">
              {card.title}
            </span>
            <button
              aria-label="Options"
              className="text-[#8A8A94] hover:text-[#111111] p-0.5 rounded transition-colors"
            >
              <MoreHorizontal className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Row 2: Caption */}
          <div className="text-[14.5px] font-[400] text-[#8A8A94]">
            {card.caption}
          </div>

          {/* Row 3: Big Value + Delta Pill on shared baseline */}
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-[32px] font-[500] leading-none tracking-[-0.01em] text-[#111111]">
              {card.value}
            </span>

            <span
              className={`inline-flex items-center justify-center h-[24px] px-2 rounded-[6px] text-[14px] font-[400] leading-none ${card.pillClass}`}
            >
              {card.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
