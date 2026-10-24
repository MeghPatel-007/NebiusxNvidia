"use client";

import React from "react";
import Link from "next/link";
import {
  Clock,
  Calendar,
  Plus,
  SlidersHorizontal,
  Bell,
  Search,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/stores/app-store";

export function AppHeader() {
  const { currentWorkspace, searchQuery, setSearchQuery } = useAppStore();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#E5E7EB] bg-white px-6">
      {/* Left Workspace Indicator */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-full bg-black px-3 py-1.5 text-white">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981] text-[11px] font-bold text-black">
            R
          </div>
          <span className="text-[13px] font-medium">{currentWorkspace}</span>
        </div>
      </div>

      {/* Middle & Right Actions Toolbar */}
      <div className="flex items-center gap-3">
        {/* Recents Work button */}
        <button className="hidden md:flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors shadow-2xs">
          <Clock className="h-3.5 w-3.5 text-[#6B7280]" />
          <span>Recents Work</span>
        </button>

        {/* Date Dropdown */}
        <button className="hidden lg:flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 text-[13px] font-medium text-[#374151] hover:bg-[#F9FAFB] transition-colors shadow-2xs">
          <Calendar className="h-3.5 w-3.5 text-[#6B7280]" />
          <span>October 2026</span>
          <ChevronDown className="h-3 w-3 text-[#9CA3AF]" />
        </button>

        {/* Quick icon actions: + and Filter */}
        <Link
          href="/runs/new"
          title="New Debug Session"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827] transition-colors shadow-2xs"
        >
          <Plus className="h-4 w-4" />
        </Link>

        <button
          title="Filter Preferences"
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827] transition-colors shadow-2xs"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>

        <button
          title="Notifications"
          className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#4B5563] hover:bg-[#F9FAFB] hover:text-[#111827] transition-colors shadow-2xs"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#10B981]" />
        </button>

        {/* Search Input */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9CA3AF]" />
          <input
            type="text"
            placeholder="Type / to search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] pl-8 pr-3 text-[12px] text-[#111827] placeholder-[#9CA3AF] focus:border-[#10B981] focus:bg-white focus:outline-none transition-colors"
          />
        </div>

        {/* User Avatars Stack */}
        <div className="hidden xl:flex items-center -space-x-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-slate-700 text-[10px] font-semibold text-white">
            JD
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-emerald-700 text-[10px] font-semibold text-white">
            IH
          </div>
          <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-indigo-700 text-[10px] font-semibold text-white">
            BG
          </div>
        </div>

        {/* Primary Action Button */}
        <Link
          href="/runs/new"
          className="flex items-center gap-1.5 rounded-lg bg-[#10B981] px-3.5 py-1.5 text-[13px] font-semibold text-white hover:bg-[#059669] transition-colors shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>New Debug Session</span>
        </Link>
      </div>
    </header>
  );
}
