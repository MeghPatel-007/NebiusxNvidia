"use client";

import React, { useState } from "react";
import { Settings, Shield, CheckCircle2, Cpu } from "lucide-react";
import { toast } from "sonner";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("RepoPilot Workspace");
  const [defaultBranch, setDefaultBranch] = useState("main");
  const [defaultModel, setDefaultModel] = useState("nvidia/nemotron-4-340b-instruct");
  const [testTimeout, setTestTimeout] = useState(120);
  const [requireApproval, setRequireApproval] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="flex flex-col flex-1">
      <RepoBreadcrumbs
        workspace="RepoPilot Space"
        repositoryName="Settings"
        isPrivate={false}
      />

      <div className="p-6 space-y-6 max-w-4xl">
        <div>
          <h1 className="text-xl font-bold text-[#111827]">Workspace & Agent Settings</h1>
          <p className="text-sm text-[#6B7280]">
            Configure autonomous agent execution boundaries, Nebius endpoints, and workspace preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Workspace Card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F3F4F6] pb-3">
              <Settings className="h-4 w-4 text-[#10B981]" />
              <h2 className="text-sm font-semibold text-[#111827]">General Configuration</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">Default Git Branch</label>
                <input
                  type="text"
                  value={defaultBranch}
                  onChange={(e) => setDefaultBranch(e.target.value)}
                  className="w-full h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Agent & Inference Card */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F3F4F6] pb-3">
              <Cpu className="h-4 w-4 text-[#10B981]" />
              <h2 className="text-sm font-semibold text-[#111827]">Autonomous Agent Settings</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">Default Inference Model</label>
                <select
                  value={defaultModel}
                  onChange={(e) => setDefaultModel(e.target.value)}
                  className="w-full h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
                >
                  <option value="nvidia/nemotron-4-340b-instruct">
                    nvidia/nemotron-4-340b-instruct
                  </option>
                  <option value="nvidia/llama-3.1-nemotron-70b-instruct">
                    nvidia/llama-3.1-nemotron-70b-instruct
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151]">Test Timeout (seconds)</label>
                <input
                  type="number"
                  value={testTimeout}
                  onChange={(e) => setTestTimeout(Number(e.target.value))}
                  className="w-full h-10 rounded-lg border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] focus:border-[#10B981] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="requireApproval"
                checked={requireApproval}
                onChange={(e) => setRequireApproval(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#10B981] focus:ring-[#10B981]"
              />
              <label htmlFor="requireApproval" className="text-xs font-medium text-[#374151]">
                Require human review and explicit approval before committing patches to remote branch
              </label>
            </div>
          </div>

          {/* Security & Sandbox Guardrails */}
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F3F4F6] pb-3">
              <Shield className="h-4 w-4 text-[#10B981]" />
              <h2 className="text-sm font-semibold text-[#111827]">Security & Sandbox Guardrails</h2>
            </div>

            <div className="space-y-2 text-xs text-[#4B5563]">
              <div className="flex items-center gap-2 text-[#059669]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Isolated container execution prevents untrusted repository code execution in Next.js</span>
              </div>
              <div className="flex items-center gap-2 text-[#059669]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Serverless Nebius Token Factory secrets kept strictly server-side</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-[#10B981] px-5 py-2 text-sm font-semibold text-white hover:bg-[#059669] transition-colors shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
