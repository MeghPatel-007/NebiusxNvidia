"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, GitBranch, Tag, Lock } from "lucide-react";

interface BreadcrumbsProps {
  workspace?: string;
  repositoryName?: string;
  isPrivate?: boolean;
  tagsCount?: number;
  branchesCount?: number;
}

export function RepoBreadcrumbs({
  workspace = "RepoPilot Space",
  repositoryName = "prime-marketplace-3.0",
  isPrivate = true,
  tagsCount = 7,
  branchesCount = 10,
}: BreadcrumbsProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] bg-white px-6 py-3.5">
      {/* Path */}
      <div className="flex items-center gap-2 text-[14px]">
        <span className="font-semibold text-[#111827]">{workspace}</span>
        <ChevronRight className="h-4 w-4 text-[#9CA3AF]" />
        <Link
          href="/repositories/repo-1"
          className="font-medium text-[#4B5563] hover:text-[#111827] transition-colors"
        >
          {repositoryName}
        </Link>
        {isPrivate && (
          <span className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 text-[11px] font-medium text-[#6B7280]">
            <Lock className="h-2.5 w-2.5" />
            Private
          </span>
        )}
      </div>

      {/* Badges on right */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-[12px] font-medium text-[#4B5563] shadow-2xs">
          <Tag className="h-3 w-3 text-[#6B7280]" />
          <span>Tags</span>
          <span className="rounded-full bg-[#E6F9F0] px-1.5 py-0.2 text-[11px] font-semibold text-[#10B981]">
            {tagsCount}
          </span>
        </div>

        <div className="flex items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-2.5 py-1 text-[12px] font-medium text-[#4B5563] shadow-2xs">
          <GitBranch className="h-3 w-3 text-[#6B7280]" />
          <span>Branch</span>
          <span className="rounded-full bg-[#E6F9F0] px-1.5 py-0.2 text-[11px] font-semibold text-[#10B981]">
            {branchesCount}
          </span>
        </div>
      </div>
    </div>
  );
}
