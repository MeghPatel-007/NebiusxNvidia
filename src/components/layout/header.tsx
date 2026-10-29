'use client'

import React from 'react'
import Link from 'next/link'
import {
  Clock,
  Calendar,
  Plus,
  ArrowLeftRight,
  Bot,
  Search,
  ChevronDown,
} from 'lucide-react'
import { useAppStore } from '@/lib/stores/app-store'
import { ModeToggle } from '@/components/mode-toggle'

export function AppHeader() {
  const { searchQuery, setSearchQuery } = useAppStore()

  return (
    <div className="flex flex-col w-full bg-card select-none">
      {/* Row 1: Page Header (Height: 50px, border-b hairline #EBEBEF) */}
      <div className="flex h-[50px] items-center justify-between px-4 border-b border-border">
        {/* Left: 28px dark-green logo + Vektora + Code Space chip */}
        <div className="flex items-center gap-3">
          <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#0E2A1F] text-[13px] font-bold text-(--brand)">
            V
          </div>
          <span className="text-[22px] font-[500] tracking-[-0.01em] text-foreground">
            Vektora
          </span>
          <div className="flex items-center h-[32px] px-3 rounded-[8px] bg-(--neutral-pill-bg) text-[15px] font-[400] text-foreground">
            Code Space
          </div>
        </div>

        {/* Right: Overlapping 4-avatar stack + Invite people button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-1.5">
            <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white bg-[#334155] text-[8px] font-semibold text-white">
              JD
            </div>
            <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white bg-[#0E2A1F] text-[8px] font-semibold text-(--brand)">
              IH
            </div>
            <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white bg-[#4338CA] text-[8px] font-semibold text-white">
              BG
            </div>
            <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-2 border-white bg-[#B45309] text-[8px] font-semibold text-white">
              DV
            </div>
          </div>

          <Link
            href="/runs/new"
            className="flex items-center justify-center h-[34px] px-3.5 rounded-[10px] border border-border bg-card text-[15px] font-[400] text-foreground hover:bg-accent hover:border-foreground/30 transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          >
            Invite people
          </Link>
        </div>
      </div>

      {/* Row 2: Toolbar (Height: ~51px, border-b hairline #EBEBEF) */}
      <div className="flex h-[51px] items-center justify-between px-4 border-b border-border">
        {/* Left cluster: Recents Work + Date Selector */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 h-[28px] px-2.5 rounded-[8px] border border-border bg-card text-[14.5px] font-[400] text-foreground hover:bg-accent hover:border-foreground/30 transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            <Clock
              className="h-4 w-4 text-muted-foreground"
              strokeWidth={1.5}
            />
            <span>Recents Work</span>
          </button>

          <button className="flex items-center gap-1.5 h-[28px] px-2.5 rounded-[8px] border border-border bg-card text-[14.5px] font-[400] text-foreground hover:bg-accent hover:border-foreground/30 transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            <Calendar
              className="h-4 w-4 text-muted-foreground"
              strokeWidth={1.5}
            />
            <span>January 2026</span>
            <ChevronDown
              className="h-3.5 w-3.5 text-muted-foreground"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* Right cluster: 3 icon buttons + Search input */}
        <div className="flex items-center gap-2">
          <ModeToggle
            title="Toggle theme"
            className="rounded-[8px] border border-border bg-card text-foreground hover:bg-accent hover:text-foreground hover:border-foreground/30 shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          />
          <Link
            href="/runs/new"
            title="Add debug session"
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] border border-border bg-card text-foreground hover:bg-accent hover:border-foreground/30 transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          >
            <Plus className="h-4 w-4" strokeWidth={1.5} />
          </Link>

          <button
            title="Sync repository"
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] border border-border bg-card text-foreground hover:bg-accent hover:border-foreground/30 transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          >
            <ArrowLeftRight
              className="h-4 w-4 text-muted-foreground"
              strokeWidth={1.5}
            />
          </button>

          <Link
            href="/models"
            title="AI Agent / Bot"
            className="flex h-[28px] w-[28px] items-center justify-center rounded-[8px] border border-border bg-card text-foreground hover:bg-accent hover:border-foreground/30 transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          >
            <Bot className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          </Link>

          {/* Search input with / shortcut */}
          <div className="relative w-[190px] md:w-[210px]">
            <Search
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Type / to search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[28px] w-full rounded-[8px] border border-border bg-card pl-8 pr-2.5 text-[13px] text-foreground placeholder:text-muted-foreground focus:border-[#76B900] focus:outline-none transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
