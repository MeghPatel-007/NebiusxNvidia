"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, FolderGit2, Check, X } from "lucide-react";
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
    <aside className="w-full xl:w-[320px] shrink-0 border-l border-[#E5E7EB] bg-white p-5 flex flex-col gap-6">
      {/* Latest Activity Heading */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#E6F9F0] text-[#10B981]">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <h2 className="text-[14px] font-semibold text-[#111827]">Latest Activity</h2>
        </div>

        {/* Date separator line */}
        <div className="flex items-center gap-2 mb-4 text-[12px] font-medium text-[#6B7280]">
          <span className="h-2 w-2 rounded-full border-2 border-[#10B981] bg-white" />
          <span>24 October 2026</span>
        </div>

        {/* Activity feed list */}
        <div className="space-y-4">
          {/* Item 1: Ihya Commited */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-semibold text-emerald-800 shrink-0">
              IH
            </div>
            <div className="text-[12px] leading-snug">
              <span className="font-semibold text-[#111827]">Ihya</span>{" "}
              <span className="text-[#4B5563]">Commited</span>{" "}
              <span className="rounded bg-[#F3F4F6] px-1 py-0.5 font-mono text-[11px] text-[#374151]">
                merchant_store_main_con
              </span>
            </div>
          </div>

          {/* Item 2: Devrizal requesting review with Accept/Decline */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-800 shrink-0">
              DV
            </div>
            <div className="flex-1 text-[12px] leading-snug space-y-2">
              <div>
                <span className="font-semibold text-[#111827]">Devrizal</span>{" "}
                <span className="text-[#4B5563]">is requesting review on</span>{" "}
                <span className="rounded bg-[#F3F4F6] px-1 py-0.5 font-mono text-[11px] text-[#374151]">
                  merchant_store_out_auth
                </span>
              </div>

              {!reviewsHandled["rev-1"] ? (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleReview("rev-1", "accepted")}
                    className="flex items-center gap-1 rounded-md border border-[#C7E8CE] bg-[#E6F9F0] px-2.5 py-1 text-[11px] font-medium text-[#059669] hover:bg-[#dcfce7] transition-colors"
                  >
                    <Check className="h-3 w-3" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleReview("rev-1", "declined")}
                    className="flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-white px-2.5 py-1 text-[11px] font-medium text-[#6B7280] hover:bg-[#F3F4F6] transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Decline
                  </button>
                </div>
              ) : (
                <div className="text-[11px] font-medium text-[#059669]">
                  {reviewsHandled["rev-1"] === "accepted" ? "✓ Review accepted" : "✕ Declined"}
                </div>
              )}
            </div>
          </div>

          {/* Item 3: Bagas Commited */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-semibold text-indigo-800 shrink-0">
              BG
            </div>
            <div className="text-[12px] leading-snug">
              <span className="font-semibold text-[#111827]">Bagas</span>{" "}
              <span className="text-[#4B5563]">Commited</span>{" "}
              <span className="rounded bg-[#F3F4F6] px-1 py-0.5 font-mono text-[11px] text-[#374151]">
                new_user_validation_control
              </span>
            </div>
          </div>

          {/* Item 4: Jordan Left Comments */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-[11px] font-semibold text-amber-800 shrink-0">
              JD
            </div>
            <div className="text-[12px] leading-snug">
              <span className="font-semibold text-[#111827]">Jordan</span>{" "}
              <span className="text-[#4B5563]">Left 5 Comments</span>{" "}
              <span className="rounded bg-[#F3F4F6] px-1 py-0.5 font-mono text-[11px] text-[#374151]">
                old_error_currency
              </span>
            </div>
          </div>

          {/* Item 5: Faris is Enabled */}
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-800 shrink-0">
              FR
            </div>
            <div className="text-[12px] leading-snug">
              <span className="font-semibold text-[#111827]">Faris</span>{" "}
              <span className="text-[#4B5563]">is Enabled</span>{" "}
              <span className="text-[#10B981] font-medium">auto-diagnostics</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-[#E5E7EB]" />

      {/* Active Repository Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="h-2 w-2 rounded-full bg-[#10B981]" />
          <h2 className="text-[13px] font-semibold text-[#111827]">Active Repository</h2>
        </div>

        <div className="space-y-2.5">
          <Link
            href="/repositories/repo-1"
            className="block p-3 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] hover:bg-[#F3F4F6] hover:border-[#D1D5DB] transition-all"
          >
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#111827] mb-1">
              <FolderGit2 className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Vektora / prime-marketplace-3.0</span>
            </div>
            <p className="text-[11px] text-[#6B7280] line-clamp-2">
              Prime marketplaces is a Web 3.0 decentralized commerce protocol.
            </p>
          </Link>

          <Link
            href="/repositories/repo-2"
            className="block p-3 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] hover:bg-[#F3F4F6] hover:border-[#D1D5DB] transition-all"
          >
            <div className="flex items-center gap-2 text-[13px] font-semibold text-[#111827] mb-1">
              <FolderGit2 className="h-3.5 w-3.5 text-[#10B981]" />
              <span>Vektora / wesign-organization</span>
            </div>
            <p className="text-[11px] text-[#6B7280] line-clamp-2">
              Multi-sig signature verification and cryptographic access controller.
            </p>
          </Link>
        </div>
      </div>
    </aside>
  );
}
