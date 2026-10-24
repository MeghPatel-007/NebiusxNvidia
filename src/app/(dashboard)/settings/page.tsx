"use client";

import React, { useState } from "react";
import { Settings, Shield, CheckCircle2, Cpu } from "lucide-react";
import { toast } from "sonner";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export default function SettingsPage() {
  const [workspaceName, setWorkspaceName] = useState("Vektora Space");
  const [defaultBranch, setDefaultBranch] = useState("main");
  const [defaultModel, setDefaultModel] = useState("nvidia/nemotron-4-340b-instruct");
  const [testTimeout, setTestTimeout] = useState(120);
  const [requireApproval, setRequireApproval] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="flex flex-col flex-1 bg-white">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="Settings"
        isPrivate={false}
      />

      <div className="p-6 space-y-6 max-w-4xl">
        <div>
          <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-[#111111]">
            Workspace & Agent Settings
          </h1>
          <p className="text-[14.5px] font-[400] text-[#8A8A94]">
            Configure autonomous agent execution boundaries, Nebius endpoints, and workspace preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Workspace Card */}
          <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#EBEBEF] pb-3">
              <Settings className="h-4 w-4 text-[#22A646]" strokeWidth={1.5} />
              <h2 className="text-[16px] font-[500] text-[#111111]">General Configuration</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-[500] text-[#3A3A42]">Workspace Name</label>
                <input
                  type="text"
                  value={workspaceName}
                  onChange={(e) => setWorkspaceName(e.target.value)}
                  className="w-full h-[36px] rounded-[8px] border border-[#EBEBEF] bg-white px-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-[500] text-[#3A3A42]">Default Git Branch</label>
                <input
                  type="text"
                  value={defaultBranch}
                  onChange={(e) => setDefaultBranch(e.target.value)}
                  className="w-full h-[36px] rounded-[8px] border border-[#EBEBEF] bg-white px-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Agent & Inference Card */}
          <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#EBEBEF] pb-3">
              <Cpu className="h-4 w-4 text-[#22A646]" strokeWidth={1.5} />
              <h2 className="text-[16px] font-[500] text-[#111111]">Autonomous Agent Settings</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-[500] text-[#3A3A42]">Default Inference Model</label>
                <select
                  value={defaultModel}
                  onChange={(e) => setDefaultModel(e.target.value)}
                  className="w-full h-[36px] rounded-[8px] border border-[#EBEBEF] bg-white px-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
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
                <label className="text-[13px] font-[500] text-[#3A3A42]">Test Timeout (seconds)</label>
                <input
                  type="number"
                  value={testTimeout}
                  onChange={(e) => setTestTimeout(Number(e.target.value))}
                  className="w-full h-[36px] rounded-[8px] border border-[#EBEBEF] bg-white px-3 text-[14px] text-[#111111] focus:border-[#22A646] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="requireApproval"
                checked={requireApproval}
                onChange={(e) => setRequireApproval(e.target.checked)}
                className="h-4 w-4 rounded border-[#EBEBEF] text-[#22A646] focus:ring-[#22A646]"
              />
              <label htmlFor="requireApproval" className="text-[13.5px] font-[400] text-[#3A3A42]">
                Require human review and explicit approval before committing patches to remote branch
              </label>
            </div>
          </div>

          {/* Security & Sandbox Guardrails */}
          <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-6 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#EBEBEF] pb-3">
              <Shield className="h-4 w-4 text-[#22A646]" strokeWidth={1.5} />
              <h2 className="text-[16px] font-[500] text-[#111111]">Security & Sandbox Guardrails</h2>
            </div>

            <div className="space-y-2 text-[13.5px] text-[#3A3A42]">
              <div className="flex items-center gap-2 text-[#22A646]">
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} />
                <span>Isolated container execution prevents untrusted repository code execution in Next.js</span>
              </div>
              <div className="flex items-center gap-2 text-[#22A646]">
                <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} />
                <span>Serverless Nebius Token Factory secrets kept strictly server-side</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center justify-center h-[34px] px-4 rounded-[10px] bg-[#22A646] text-[14px] font-[500] text-white hover:bg-[#1f963f] transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
