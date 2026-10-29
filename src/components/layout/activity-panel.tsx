"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  GitCommitHorizontal,
  Book,
} from "lucide-react";
import { AgentEvent } from "@/types/agent";

interface ActivityPanelProps {
  events?: AgentEvent[];
}

export function ActivityPanel({ events: _events = [] }: ActivityPanelProps) {
  const [reviewsHandled, setReviewsHandled] = useState<Record<string, "accepted" | "declined">>({});

  const handleReview = (id: string, action: "accepted" | "declined") => {
    setReviewsHandled((prev) => ({ ...prev, [id]: action }));
  };

  return (
    <aside className="w-full xl:w-[296px] shrink-0 border-l border-border bg-card flex flex-col select-none">
      {/* Latest Activity Header (Height: 50px, border-b hairline #EBEBEF) */}
      <div className="flex h-[50px] items-center gap-2 px-4 border-b border-border">
        <Rocket className="h-[18px] w-[18px] text-(--brand)" strokeWidth={1.5} />
        <h3 className="text-[18px] font-[500] text-foreground">Latest Activity</h3>
      </div>

      <div className="p-4 space-y-5">
        {/* Date Row: GitCommitHorizontal icon (green) + "12 January 2023" */}
        <div className="flex items-center gap-2 text-[16.5px] font-[400] text-foreground">
          <GitCommitHorizontal className="h-5 w-5 text-(--brand)" strokeWidth={1.5} />
          <span>12 January 2026</span>
        </div>

        {/* Activity Items */}
        <div className="space-y-4">
          {/* Item 1: Ihya Commited */}
          <div className="flex items-start gap-3">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#111827] text-[10px] font-bold text-white shrink-0 mt-0.5">
              IH
            </div>
            <div className="text-[15.5px] leading-tight space-y-1">
              <div>
                <span className="font-[500] text-foreground">Ihya</span>{" "}
                <span className="font-[400] text-muted-foreground">Commited</span>
              </div>
              <div className="inline-flex items-center h-[22px] px-2 rounded-[6px] border border-border bg-(--neutral-pill-bg) font-mono text-[13px] text-foreground max-w-[210px] truncate">
                merchant_store_main_con
              </div>
            </div>
          </div>

          {/* Item 2: Devrizal is requesting review with Accept / Decline buttons */}
          <div className="flex items-start gap-3">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#3B82F6] text-[10px] font-bold text-white shrink-0 mt-0.5">
              DV
            </div>
            <div className="flex-1 text-[15.5px] leading-tight space-y-1.5">
              <div>
                <span className="font-[500] text-foreground">Devrizal</span>{" "}
                <span className="font-[400] text-muted-foreground">is requesting review</span>
              </div>
              <div className="inline-flex items-center h-[22px] px-2 rounded-[6px] border border-border bg-(--neutral-pill-bg) font-mono text-[13px] text-foreground max-w-[210px] truncate">
                merchant_store_out_auth
              </div>

              {!reviewsHandled["rev-1"] ? (
                <div className="flex items-center gap-2 pt-0.5">
                  <button
                    onClick={() => handleReview("rev-1", "accepted")}
                    className="flex items-center justify-center h-[26px] px-3 rounded-[8px] border border-[#76B900]/30 bg-(--success-bg) text-[13.5px] font-[500] text-(--brand) hover:bg-[#76B900]/10 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReview("rev-1", "declined")}
                    className="flex items-center justify-center h-[26px] px-3 rounded-[8px] border border-[#E5484D]/20 bg-(--danger-bg) text-[13.5px] font-[500] text-(--danger) hover:bg-[#E5484D]/20 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              ) : (
                <div className="text-[13px] font-[500] text-(--brand) pt-0.5">
                  {reviewsHandled["rev-1"] === "accepted" ? "✓ Accepted" : "✕ Declined"}
                </div>
              )}
            </div>
          </div>

          {/* Item 3: Bagas Commited */}
          <div className="flex items-start gap-3">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#059669] text-[10px] font-bold text-white shrink-0 mt-0.5">
              BG
            </div>
            <div className="text-[15.5px] leading-tight space-y-1">
              <div>
                <span className="font-[500] text-foreground">Bagas</span>{" "}
                <span className="font-[400] text-muted-foreground">Commited</span>
              </div>
              <div className="inline-flex items-center h-[22px] px-2 rounded-[6px] border border-border bg-(--neutral-pill-bg) font-mono text-[13px] text-foreground max-w-[210px] truncate">
                new_user_validation_cont...
              </div>
            </div>
          </div>

          {/* Item 4: Jordan Left Comments */}
          <div className="flex items-start gap-3">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#D97706] text-[10px] font-bold text-white shrink-0 mt-0.5">
              JD
            </div>
            <div className="text-[15.5px] leading-tight space-y-1">
              <div>
                <span className="font-[500] text-foreground">Jordan</span>{" "}
                <span className="font-[400] text-muted-foreground">Left 5 Comments</span>
              </div>
              <div className="inline-flex items-center h-[22px] px-2 rounded-[6px] border border-border bg-(--neutral-pill-bg) font-mono text-[13px] text-foreground max-w-[210px] truncate">
                old_error_currency
              </div>
            </div>
          </div>

          {/* Item 5: Faris is Enabled */}
          <div className="flex items-start gap-3">
            <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-[#64748B] text-[10px] font-bold text-white shrink-0 mt-0.5">
              FR
            </div>
            <div className="text-[15.5px] leading-tight">
              <span className="font-[500] text-foreground">Faris</span>{" "}
              <span className="font-[400] text-muted-foreground">is Enabled</span>
            </div>
          </div>
        </div>

        {/* Section 2: Active Repository */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center gap-2">
            <Book className="h-[18px] w-[18px] text-(--brand)" strokeWidth={1.5} />
            <h3 className="text-[18px] font-[500] text-foreground">Active Repository</h3>
          </div>

          <div className="space-y-3">
            <Link
              href="/repositories/repo-1"
              className="block group"
            >
              <div className="flex items-center gap-2 text-[15.5px]">
                <Book className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                <span className="font-[500] text-foreground group-hover:underline">Vektora</span>
                <span className="text-muted-foreground">/ prime-marketplace-3.0</span>
              </div>
              <p className="text-[14px] text-muted-foreground pl-6 mt-0.5 truncate">
                Prime marketplaces is a Web 3.0…
              </p>
            </Link>

            <Link
              href="/repositories/repo-2"
              className="block group"
            >
              <div className="flex items-center gap-2 text-[15.5px]">
                <Book className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
                <span className="font-[500] text-foreground group-hover:underline">Vektora</span>
                <span className="text-muted-foreground">/ wesign-organization</span>
              </div>
              <p className="text-[14px] text-muted-foreground pl-6 mt-0.5 truncate">
                Multi-sig signature verification…
              </p>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
