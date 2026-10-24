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
    <div className="flex flex-col flex-1">
      <RepoBreadcrumbs
        workspace="RepoPilot Space"
        repositoryName="New Debug Session"
        isPrivate={false}
      />

      <div className="p-6 max-w-3xl space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/runs"
            className="p-1.5 rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280] hover:text-[#111827] transition-colors shadow-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Launch New Debug Session</h1>
            <p className="text-sm text-[#6B7280]">
              Specify the target repository defect for autonomous diagnosis and patch verification.
            </p>
          </div>
        </div>

        {/* Model Card Banner */}
        <div className="rounded-xl border border-[#C7E8CE] bg-[#E6F9F0] p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#10B981] text-white">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#059669]">
                NVIDIA Nemotron via Nebius Token Factory
              </div>
              <div className="text-xs text-[#065F46]">
                Hardware accelerated inference with automated test verification loop
              </div>
            </div>
          </div>
          <span className="rounded-md bg-white/80 px-2.5 py-1 text-xs font-semibold text-[#059669]">
            Active
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#374151]">Target Repository</label>
            <select
              value={repoId}
              onChange={(e) => setRepoId(e.target.value)}
              className="w-full h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
            >
              <option value="repo-1">Vektora / prime-marketplace-3.0</option>
              <option value="repo-2">Vektora / wesign-organization</option>
              <option value="repo-3">Odama / Company-Site</option>
              <option value="repo-4">Maryuandi / Mobile-App</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#374151]">Branch</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="main"
                className="w-full h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#374151]">Model Selection</label>
              <select
                value={modelUsed}
                onChange={(e) => setModelUsed(e.target.value)}
                className="w-full h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
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
            <label className="text-xs font-semibold text-[#374151]">Session Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Fix signature deserialization panic on malformed payload"
              className="w-full h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#374151]">Bug Report / Issue Details</label>
            <textarea
              required
              rows={5}
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              placeholder="Provide error logs, reproduction steps, or the failing assertion description..."
              className="w-full rounded-lg border border-[#E5E7EB] bg-white p-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#F3F4F6]">
            <Link
              href="/runs"
              className="px-4 py-2 rounded-lg border border-[#E5E7EB] text-sm font-medium text-[#4B5563] hover:bg-[#F9FAFB] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-[#10B981] px-5 py-2 text-sm font-semibold text-white hover:bg-[#059669] transition-colors disabled:opacity-50 shadow-xs"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Diagnosing & Patching...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
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
