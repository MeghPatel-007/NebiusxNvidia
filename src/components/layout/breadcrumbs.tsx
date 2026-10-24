"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Tag, GitBranch } from "lucide-react";

interface BreadcrumbsProps {
  workspace?: string;
  repositoryName?: string;
  isPrivate?: boolean;
  tagsCount?: number;
  branchesCount?: number;
}

export function RepoBreadcrumbs({
  workspace = "Vektora Space",
  repositoryName = "prime-marketplace-3.0",
  isPrivate = true,
  tagsCount = 7,
  branchesCount = 10,
}: BreadcrumbsProps) {
  return (
    <div className="flex h-[57px] items-center justify-between px-4 border-b border-[#EBEBEF] bg-white select-none">
      {/* Left: Crumbs + Private badge */}
      <div className="flex items-center gap-2 text-[15px]">
        <span className="font-[500] text-[#111111]">{workspace}</span>
        <ChevronRight className="h-4 w-4 text-[#8A8A94]" strokeWidth={1.5} />
        <Link
          href="/repositories/repo-1"
          className="font-[400] text-[#111111] hover:underline transition-colors"
        >
          {repositoryName}
        </Link>
        {isPrivate && (
          <span className="inline-flex items-center h-[20px] px-2 rounded-[6px] border border-[#EBEBEF] bg-white text-[12px] font-[400] text-[#111111]">
            Private
          </span>
        )}
      </div>

      {/* Right: Tags(7) and Branch(10) with green count pills */}
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 h-[28px] px-2.5 rounded-[8px] border border-[#EBEBEF] bg-white text-[14.5px] font-[400] text-[#111111] hover:bg-[#FAFAFB] transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
          <Tag className="h-4 w-4 text-[#8A8A94]" strokeWidth={1.5} />
          <span>Tags</span>
          <span className="flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#22A646] px-1 text-[11px] font-[500] text-white">
            {tagsCount}
          </span>
        </button>

        <button className="flex items-center gap-2 h-[28px] px-2.5 rounded-[8px] border border-[#EBEBEF] bg-white text-[14.5px] font-[400] text-[#111111] hover:bg-[#FAFAFB] transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
          <GitBranch className="h-4 w-4 text-[#8A8A94]" strokeWidth={1.5} />
          <span>Branch</span>
          <span className="flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[#22A646] px-1 text-[11px] font-[500] text-white">
            {branchesCount}
          </span>
        </button>
      </div>
    </div>
  );
}
