"use client";

import React, { useState } from "react";
import { ChevronDown, Info } from "lucide-react";
import { HeatmapDay } from "@/types/api";
import { cn } from "@/lib/utils";

interface ActivityHeatmapProps {
  days?: HeatmapDay[];
}

export function ActivityHeatmap({ days = [] }: ActivityHeatmapProps) {
  const [filterMode, setFilterMode] = useState<"By Member" | "By Repository">("By Member");
  const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  // Colors matching repo.png
  const getColorClass = (level: number) => {
    switch (level) {
      case 4:
        return "bg-[#15803D]"; // deep forest
      case 3:
        return "bg-[#22C55E]"; // vibrant emerald
      case 2:
        return "bg-[#4ADE80]"; // medium green
      case 1:
      default:
        return "bg-[#BBF7D0]"; // light mint
    }
  };

  // 32 columns x 7 rows
  const numCols = 32;
  const numRows = 7;

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs">
      {/* Header row */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-semibold text-[#111827]">Project Contributors</h3>

        <div className="relative">
          <button
            onClick={() => setFilterMode(filterMode === "By Member" ? "By Repository" : "By Member")}
            className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors shadow-2xs"
          >
            <span>👥 {filterMode}</span>
            <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" />
          </button>
        </div>
      </div>

      {/* Month labels */}
      <div className="flex justify-between px-1 mb-2 text-[12px] font-medium text-[#6B7280]">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* Heatmap Grid */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-grid grid-rows-7 grid-flow-col gap-1.5 w-full min-w-[640px]">
          {Array.from({ length: numCols * numRows }).map((_, index) => {
            const day = days[index % (days.length || 1)] || {
              date: "2026-10-24",
              count: (index % 5) + 1,
              level: ((index * 3) % 4) + 1,
            };

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
                className={cn(
                  "h-3.5 w-full min-w-[12px] rounded-xs transition-transform hover:scale-125 cursor-pointer",
                  getColorClass(day.level)
                )}
                title={`${day.date}: ${day.count} activities`}
              />
            );
          })}
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-2 border-t border-[#F3F4F6] text-[12px] text-[#6B7280]">
        <div className="flex items-center gap-1.5">
          <span>How to Read Contribute</span>
          <Info className="h-3.5 w-3.5 text-[#9CA3AF]" />
          {hoveredDay && (
            <span className="ml-3 font-medium text-[#111827]">
              {hoveredDay.date}: <span className="text-[#10B981]">{hoveredDay.count} agent actions</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span>More</span>
          <div className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-xs bg-[#15803D]" />
            <span className="h-3 w-3 rounded-xs bg-[#22C55E]" />
            <span className="h-3 w-3 rounded-xs bg-[#4ADE80]" />
            <span className="h-3 w-3 rounded-xs bg-[#BBF7D0]" />
          </div>
          <span>Less</span>
        </div>
      </div>
    </div>
  );
}
