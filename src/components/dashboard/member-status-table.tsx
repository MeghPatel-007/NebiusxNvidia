"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FolderGit2, Filter, ExternalLink } from "lucide-react";
import { AgentRun } from "@/types/agent";

interface MemberStatusTableProps {
  runs?: AgentRun[];
}

export function MemberStatusTable({ runs: _runs = [] }: MemberStatusTableProps) {
  const [filterActive, setFilterActive] = useState(false);

  // Table rows matching repo.png visual design
  const members = [
    {
      id: "run-701",
      name: "Jordan A.A",
      avatar: "JA",
      avatarBg: "bg-slate-800",
      contribute: "76 Contribute",
      commit: "42 Commit",
      hours: "90 Hrs ( Work in Repo )",
      dotColor: "bg-rose-500",
      workRate: "69,3% WR",
      status: "passed",
      title: "Fix signature deserialization panic on malformed payload",
    },
    {
      id: "run-702",
      name: "Bagas A.S",
      avatar: "BA",
      avatarBg: "bg-emerald-800",
      contribute: "89 Contribute",
      commit: "35 Commit",
      hours: "31 Hrs ( Work in Repo )",
      dotColor: "bg-emerald-500",
      workRate: "51,6% WR",
      status: "running",
      title: "Resolve race condition in payment state lock",
    },
    {
      id: "run-703",
      name: "Devrizal M",
      avatar: "DM",
      avatarBg: "bg-indigo-800",
      contribute: "43 Contribute",
      commit: "29 Commit",
      hours: "21 Hrs ( Work in Repo )",
      dotColor: "bg-blue-500",
      workRate: "31,9% WR",
      status: "passed",
      title: "Multi-sig quorum threshold off-by-one check",
    },
    {
      id: "run-704",
      name: "Ihya N",
      avatar: "IN",
      avatarBg: "bg-amber-800",
      contribute: "62 Contribute",
      commit: "38 Commit",
      hours: "48 Hrs ( Work in Repo )",
      dotColor: "bg-teal-500",
      workRate: "44,1% WR",
      status: "passed",
      title: "Sanitize user redirect URL after OAuth callback",
    },
  ];

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs">
      {/* Table Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[16px] font-semibold text-[#111827]">Member Status</h3>

        <div className="flex items-center gap-2">
          <Link
            href="/repositories"
            className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors shadow-2xs"
          >
            <FolderGit2 className="h-3.5 w-3.5 text-[#6B7280]" />
            <span>Project</span>
          </Link>

          <button
            onClick={() => setFilterActive(!filterActive)}
            className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-[12px] font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors shadow-2xs"
          >
            <Filter className="h-3.5 w-3.5 text-[#6B7280]" />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <tbody className="divide-y divide-[#F3F4F6]">
            {members.map((row) => (
              <tr key={row.id} className="hover:bg-[#F9FAFB] transition-colors group">
                {/* Column 1: Avatar + Name */}
                <td className="py-3.5 pr-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${row.avatarBg} text-[11px] font-semibold text-white shrink-0`}
                    >
                      {row.avatar}
                    </div>
                    <div>
                      <span className="font-semibold text-[#111827]">{row.name}</span>
                      <div className="text-[11px] text-[#6B7280] line-clamp-1 group-hover:text-[#111827] transition-colors">
                        {row.title}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Column 2: Contribute count */}
                <td className="py-3.5 px-4 font-semibold text-[#111827] whitespace-nowrap">
                  {row.contribute}
                </td>

                {/* Column 3: Commit count */}
                <td className="py-3.5 px-4 text-[#6B7280] whitespace-nowrap">
                  {row.commit}
                </td>

                {/* Column 4: Hours with dot */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-[#4B5563]">
                    <span className={`h-2 w-2 rounded-full ${row.dotColor}`} />
                    <span>{row.hours}</span>
                  </div>
                </td>

                {/* Column 5: Work Rate */}
                <td className="py-3.5 px-4 font-semibold text-[#111827] whitespace-nowrap">
                  {row.workRate}
                </td>

                {/* Column 6: Action link to run */}
                <td className="py-3.5 pl-4 text-right whitespace-nowrap">
                  <Link
                    href={`/runs/${row.id}`}
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-medium text-[#10B981] hover:bg-[#E6F9F0] transition-colors"
                  >
                    <span>Inspect</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
