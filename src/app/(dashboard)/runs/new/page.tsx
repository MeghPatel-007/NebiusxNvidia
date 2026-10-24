"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowLeft, Loader2, Cpu } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export default function NewDebugSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [repoId, setRepoId] = useState("repo-1");
  const [branch, setBranch] = useState("main");
  const [title, setTitle] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [modelUsed, setModelUsed] = useState("nvidia/nemotron-4-340b-instruct");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !issueDescription.trim()) {
      toast.error("Please fill in both the session title and bug description.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repoId,
          branch,
          title,
          issueDescription,
          modelUsed,
        }),
      });

      const res = await response.json();
      if (!response.ok || !res.success) {
        throw new Error(res.error || "Failed to start debug session");
      }

      toast.success("Debug session created! Diagnosing with NVIDIA Nemotron...");
      router.push(`/runs/${res.data.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="New Debug Session"
        isPrivate={false}
      />

      <div className="p-6 max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/runs"
            className="flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border border-[#EBEBEF] bg-white text-[#8A8A94] hover:text-[#111111] transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          </Link>
          <div>
            <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-[#111111]">
              Launch New Debug Session
            </h1>
            <p className="text-[14.5px] font-[400] text-[#8A8A94]">
              Specify the target repository defect for autonomous diagnosis and patch verification.
            </p>
          </div>
        </div>

        {/* Model Card Banner */}
        <div className="rounded-[10px] border border-[#A3E9B5] bg-[#E6F8EA] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[8px] bg-[#22A646] text-white">
              <Cpu className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-[15px] font-[500] text-[#111111]">
                NVIDIA Nemotron via Nebius Token Factory
              </div>
              <div className="text-[13px] text-[#22A646]">
                Hardware accelerated inference with automated test verification loop
              </div>
            </div>
          </div>
          <span className="rounded-[6px] bg-white px-2.5 py-1 text-[12px] font-[500] text-[#22A646] shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
            Active
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-[10px] border border-[#EBEBEF] bg-white p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-[500] text-[#3A3A42]">Target Repository</label>
            <select
              value={repoId}
              onChange={(e) => setRepoId(e.target.value)}
              className="w-full h-[36px] rounded-[8px] border border-[#EBEBEF] bg-white px-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
            >
              <option value="repo-1">Vektora / prime-marketplace-3.0</option>
              <option value="repo-2">Vektora / wesign-organization</option>
              <option value="repo-3">Odama / Company-Site</option>
              <option value="repo-4">Maryuandi / Mobile-App</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[13px] font-[500] text-[#3A3A42]">Branch</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="main"
                className="w-full h-[36px] rounded-[8px] border border-[#EBEBEF] bg-white px-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[13px] font-[500] text-[#3A3A42]">Model Selection</label>
              <select
                value={modelUsed}
                onChange={(e) => setModelUsed(e.target.value)}
                className="w-full h-[36px] rounded-[8px] border border-[#EBEBEF] bg-white px-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
              >
                <option value="nvidia/nemotron-4-340b-instruct">
                  nvidia/nemotron-4-340b-instruct (Recommended)
                </option>
                <option value="nvidia/llama-3.1-nemotron-70b-instruct">
                  nvidia/llama-3.1-nemotron-70b-instruct (Fast)
                </option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-[500] text-[#3A3A42]">Session Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fix signature deserialization panic on malformed payload"
              className="w-full h-[36px] rounded-[8px] border border-[#EBEBEF] bg-white px-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-[500] text-[#3A3A42]">Bug Report / Issue Details</label>
            <textarea
              required
              rows={5}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Provide error logs, reproduction steps, or the failing assertion description..."
              className="w-full rounded-[8px] border border-[#EBEBEF] bg-white p-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#EBEBEF]">
            <Link
              href="/runs"
              className="flex items-center justify-center h-[34px] px-4 rounded-[10px] border border-[#EBEBEF] text-[14px] font-[400] text-[#111111] hover:bg-[#FAFAFB] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 h-[34px] px-4 rounded-[10px] bg-[#22A646] text-[14px] font-[500] text-white hover:bg-[#1f963f] transition-colors disabled:opacity-50 shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Diagnosing & Patching...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  <span>Start Autonomous Debug Session</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
