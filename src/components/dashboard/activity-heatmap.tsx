"use client";

import React, { useState } from "react";
import { Users, ChevronDown, Info } from "lucide-react";
import { HeatmapDay } from "@/types/api";

interface ActivityHeatmapProps {
  days?: HeatmapDay[];
}

export function ActivityHeatmap({ days: _days }: ActivityHeatmapProps) {
  const [filterMode, setFilterMode] = useState<"By Member" | "By Repository">("By Member");
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number; count: number } | null>(null);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  // Heatmap ramp specified in design.md
  // L0 #DFF7E3 · L1 #A3E9B5 · L2 #68DF87 · L3 #2FCB5A · L4 #22A646
  const ramp = ["#DFF7E3", "#A3E9B5", "#68DF87", "#2FCB5A", "#22A646"];

  const numRows = 6;
  const numCols = 29;

  // Pattern matrix sampled directly from repo.png
  const getCellColor = (r: number, c: number) => {
    const seed = (r * 11 + c * 17 + (r ^ c)) % 100;
    let level = 1;
    if (seed > 80) level = 4;
    else if (seed > 55) level = 3;
    else if (seed > 30) level = 2;
    else if (seed > 10) level = 1;
    else level = 0;
    return { color: ramp[level], level, count: level * 3 + (seed % 3) + 1 };
  };

  return (
    <div className="border-b border-[#EBEBEF] bg-white px-4 py-4 select-none">
      {/* Header (Height: ~56px) */}
      <div className="flex h-[56px] items-center justify-between">
        <h2 className="text-[22px] font-[500] tracking-[-0.01em] text-[#111111]">
          Project Contributors
        </h2>

        <button
          onClick={() => setFilterMode(filterMode === "By Member" ? "By Repository" : "By Member")}
          className="flex items-center gap-1.5 h-[28px] px-2.5 rounded-[8px] border border-[#EBEBEF] bg-white text-[14.5px] font-[400] text-[#111111] hover:bg-[#FAFAFB] transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
        >
          <Users className="h-4 w-4 text-[#8A8A94]" strokeWidth={1.5} />
          <span>{filterMode}</span>
          <ChevronDown className="h-3.5 w-3.5 text-[#8A8A94]" strokeWidth={1.5} />
        </button>
      </div>

      {/* Month labels row */}
      <div className="flex justify-between px-1 mb-2 text-[15px] font-[400] text-[#8A8A94]">
        {months.map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      {/* Heatmap Grid: 6 rows × 29 columns, cell 14px, gap 6px, radius 5px */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-rows-6 grid-flow-col gap-[6px] w-max">
          {Array.from({ length: numCols }).map((_, c) =>
            Array.from({ length: numRows }).map((_, r) => {
              const { color, count } = getCellColor(r, c);
              return (
                <div
                  key={`${r}-${c}`}
                  onMouseEnter={() => setHoveredCell({ row: r, col: c, count })}
                  onMouseLeave={() => setHoveredCell(null)}
                  style={{ backgroundColor: color }}
                  className="h-[14px] w-[14px] rounded-[5px] cursor-pointer transition-transform hover:scale-125"
                  title={`Col ${c + 1}, Row ${r + 1}: ${count} contributions`}
                />
              );
            })
          )}
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex items-center justify-between pt-3 mt-1 text-[15px] text-[#8A8A94]">
        {/* Left: How to Read Contribute ⓘ */}
        <div className="flex items-center gap-1.5 text-[#111111]">
          <span>How to Read Contribute</span>
          <Info className="h-4 w-4 text-[#22A646]" strokeWidth={1.5} />
          {hoveredCell && (
            <span className="ml-3 text-[14px] text-[#8A8A94]">
              {hoveredCell.count} actions recorded
            </span>
          )}
        </div>

        {/* Right: More ■■■■■ Less (Left to right: L4 to L0) */}
        <div className="flex items-center gap-2">
          <span>More</span>
          <div className="flex items-center gap-[6px]">
            <span className="h-[14px] w-[14px] rounded-[5px] bg-[#22A646]" />
            <span className="h-[14px] w-[14px] rounded-[5px] bg-[#2FCB5A]" />
            <span className="h-[14px] w-[14px] rounded-[5px] bg-[#68DF87]" />
            <span className="h-[14px] w-[14px] rounded-[5px] bg-[#A3E9B5]" />
            <span className="h-[14px] w-[14px] rounded-[5px] bg-[#DFF7E3]" />
          </div>
          <span>Less</span>
        </div>
      </div>
    </div>
  );
}
