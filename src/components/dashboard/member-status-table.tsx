"use client";

import React from "react";
import Link from "next/link";
import { LayoutPanelTop, ListFilter } from "lucide-react";
import { AgentRun } from "@/types/agent";

interface MemberStatusTableProps {
  runs?: AgentRun[];
}

export function MemberStatusTable({ runs: _runs }: MemberStatusTableProps) {
  // Exact data from repo.png & design.md
  const members = [
    {
      id: "run-701",
      name: "Jordan A.A",
      avatarText: "JA",
      avatarBg: "bg-[#1E293B] text-white",
      contribute: "76 Contribute",
      commit: "42 Commit",
      hours: "90 Hrs",
      workLabel: "( Work in Repo )",
      dotColor: "#F04438", // status-red
      wrValue: "69,3%",
    },
    {
      id: "run-702",
      name: "Bagas A.S",
      avatarText: "BA",
      avatarBg: "bg-[#065F46] text-[#A7F3D0]",
      contribute: "89 Contribute",
      commit: "35 Commit",
      hours: "31 Hrs",
      workLabel: "( Work in Repo )",
      dotColor: "#22C55E", // status-green
      wrValue: "51,6%",
    },
    {
      id: "run-703",
      name: "Devrizal M",
      avatarText: "DM",
      avatarBg: "bg-[#1E3A8A] text-[#BFDBFE]",
      contribute: "43 Contribute",
      commit: "29 Commit",
      hours: "21 Hrs",
      workLabel: "( Work in Repo )",
      dotColor: "#2F6BFF", // status-blue
      wrValue: "31,9%",
    },
  ];

  return (
    <div className="bg-card px-4 py-4 select-none">
      {/* Header: Title + Project / Filter buttons */}
      <div className="flex h-[56px] items-center justify-between mb-2">
        <h2 className="text-[22px] font-[500] tracking-[-0.01em] text-foreground">
          Member Status
        </h2>

        <div className="flex items-center gap-2">
          <Link
            href="/repositories"
            className="flex items-center gap-1.5 h-[28px] px-2.5 rounded-[8px] border border-border bg-card text-[14.5px] font-[400] text-foreground hover:bg-accent transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          >
            <LayoutPanelTop className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span>Project</span>
          </Link>

          <button
            className="flex items-center gap-1.5 h-[28px] px-2.5 rounded-[8px] border border-border bg-card text-[14.5px] font-[400] text-foreground hover:bg-accent transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          >
            <ListFilter className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Table Rows (Height ~40px per row, 1px bottom border) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[15.5px]">
          <tbody>
            {members.map((row) => (
              <tr
                key={row.id}
                className="h-[44px] border-b border-border hover:bg-accent/50 transition-colors"
              >
                {/* Col 1: Avatar + Name (Weight: 500) */}
                <td className="py-1 pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-[26px] w-[26px] items-center justify-center rounded-full text-[11px] font-bold shrink-0 ${row.avatarBg}`}
                    >
                      {row.avatarText}
                    </div>
                    <span className="font-[500] text-foreground">{row.name}</span>
                  </div>
                </td>

                {/* Col 2: 76 Contribute (Foreground 500) */}
                <td className="py-1 px-6 font-[500] text-foreground whitespace-nowrap">
                  {row.contribute}
                </td>

                {/* Col 3: 42 Commit (Muted) */}
                <td className="py-1 px-6 font-[400] text-muted-foreground whitespace-nowrap">
                  {row.commit}
                </td>

                {/* Col 4: status dot (8px) + Hours + ( Work in Repo ) */}
                <td className="py-1 px-6 whitespace-nowrap">
                  <div className="flex items-center gap-2 font-[400]">
                    <span
                      style={{ backgroundColor: row.dotColor }}
                      className="h-[8px] w-[8px] rounded-full shrink-0"
                    />
                    <span className="text-foreground">{row.hours}</span>
                    <span className="text-muted-foreground">{row.workLabel}</span>
                  </div>
                </td>

                {/* Col 5: Right-aligned 69,3% WR */}
                <td className="py-1 pl-6 text-right whitespace-nowrap">
                  <span className="font-[500] text-foreground">{row.wrValue}</span>{" "}
                  <span className="font-[400] text-muted-foreground">WR</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
