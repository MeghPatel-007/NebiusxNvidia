"use client";

import React, { useEffect, useState } from "react";
import {
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { ConnectGitHubButton } from "./connect-github-button";

interface InstallationItem {
  id: string;
  installationId: string;
  accountLogin: string;
  accountType: string;
  accountAvatarUrl: string | null;
  repositorySelection: string;
  repositoryCount: number;
  createdAt: string;
  updatedAt: string;
}

interface GitHubAppStatus {
  appId: string | null;
  clientId: string | null;
  slug: string;
  isPrivateKeyValid: boolean;
  isConfigured: boolean;
  keyStatusMessage: string;
  installUrl: string;
}

export function GitHubConnectionCard({
  onRefresh,
}: {
  onRefresh?: () => void;
}) {
  const [installations, setInstallations] = useState<InstallationItem[]>([]);
  const [appStatus, setAppStatus] = useState<GitHubAppStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/github/installations");
      if (res.ok) {
        const data = await res.json();
        setInstallations(data.installations || []);
        setAppStatus(data.appStatus || null);
      }
    } catch (err) {
      console.warn("Failed to load installations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function init() {
      try {
        const res = await fetch("/api/github/installations");
        if (res.ok && !ignore) {
          const data = await res.json();
          setInstallations(data.installations || []);
          setAppStatus(data.appStatus || null);
        }
      } catch (err) {
        console.warn("Failed to load installations:", err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    init();
    return () => {
      ignore = true;
    };
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      const res = await fetch("/api/github/sync", { method: "POST" });
      if (res.ok) {
        await fetchStatus();
        onRefresh?.();
      }
    } finally {
      setSyncing(false);
    }
  };

  const handleDisconnect = async (id: string) => {
    if (!confirm("Disconnect this GitHub App installation from this workspace?")) {
      return;
    }
    try {
      const res = await fetch(`/api/github/installations/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchStatus();
        onRefresh?.();
      }
    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  if (loading) {
    return (
      <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-5 animate-pulse">
        <div className="h-5 bg-gray-200 rounded w-1/4 mb-3" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
      </div>
    );
  }

  const isConnected = installations.length > 0;

  return (
    <div className="rounded-[10px] border border-[#EBEBEF] bg-white p-5 shadow-[0_1px_2px_rgba(16,16,24,0.04)] space-y-4">
      {/* Top Banner: Warning if private key is not PEM */}
      {appStatus && !appStatus.isPrivateKeyValid && (
        <div className="rounded-[8px] border border-amber-200 bg-amber-50/70 p-3.5 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-[13px] text-amber-900 leading-relaxed">
            <span className="font-[600]">GitHub App Private Key Notice: </span>
            {appStatus.keyStatusMessage}. Please download the <code>.pem</code> file from your GitHub Developer Settings and add it to <code>.env.local</code> as <code>GITHUB_PRIVATE_KEY</code>.
          </div>
        </div>
      )}

      {/* Main Connection Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#111111] text-white">
            <IconBrandGithub className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[16px] font-[500] text-[#111111]">
                GitHub App Integration
              </h3>
              {isConnected ? (
                <span className="inline-flex items-center gap-1 h-[20px] px-2 rounded-full bg-[#E6F8EA] text-[#22A646] text-[11.5px] font-[500]">
                  <CheckCircle2 className="h-3 w-3" /> Connected
                </span>
              ) : (
                <span className="inline-flex items-center h-[20px] px-2 rounded-full bg-[#F4F4F6] text-[#8A8A94] text-[11.5px] font-[400]">
                  Ready to Connect
                </span>
              )}
            </div>
            <p className="text-[13px] text-[#8A8A94] mt-0.5">
              App Slug: <code className="text-[#111111] font-mono">{appStatus?.slug || "repository-helper"}</code> • App ID: {appStatus?.appId || "—"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isConnected && (
            <button
              onClick={handleSync}
              disabled={syncing}
              className="inline-flex items-center gap-1.5 h-[32px] px-3 rounded-[8px] border border-[#EBEBEF] bg-white text-[13px] font-[400] text-[#111111] hover:bg-[#F7F8F7] transition-colors cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 text-[#8A8A94] ${syncing ? "animate-spin" : ""}`} />
              <span>{syncing ? "Syncing..." : "Sync Repos"}</span>
            </button>
          )}

          <ConnectGitHubButton
            label={isConnected ? "Install on More Repos" : "Connect GitHub App"}
            variant={isConnected ? "outline" : "primary"}
          />
        </div>
      </div>

      {/* Connected Accounts List */}
      {isConnected && (
        <div className="border-t border-[#EBEBEF] pt-4 space-y-2">
          <div className="text-[12px] font-[500] uppercase tracking-wider text-[#8A8A94]">
            Authorized Installations
          </div>
          <div className="divide-y divide-[#EBEBEF] rounded-[8px] border border-[#EBEBEF] overflow-hidden">
            {installations.map((inst) => (
              <div
                key={inst.id}
                className="flex items-center justify-between p-3 bg-white hover:bg-[#FAFAFB] transition-colors"
              >
                <div className="flex items-center gap-3">
                  {inst.accountAvatarUrl ? (
                    <img
                      src={inst.accountAvatarUrl}
                      alt={inst.accountLogin}
                      className="h-8 w-8 rounded-full border border-[#EBEBEF]"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-[#EBEBEF] flex items-center justify-center font-bold text-xs text-[#8A8A94]">
                      {inst.accountLogin.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2 font-[500] text-[14px] text-[#111111]">
                      <span>{inst.accountLogin}</span>
                      <span className="text-[11px] font-[400] text-[#8A8A94] border border-[#EBEBEF] rounded px-1.5 py-0.5">
                        {inst.accountType}
                      </span>
                    </div>
                    <div className="text-[12px] text-[#8A8A94]">
                      Installation #{inst.installationId} • Access to {inst.repositoryCount} repositories ({inst.repositorySelection})
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://github.com/settings/installations/${inst.installationId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[12px] text-[#8A8A94] hover:text-[#111111] px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                  >
                    <span>Configure on GitHub</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>

                  <button
                    onClick={() => handleDisconnect(inst.id)}
                    title="Disconnect local association"
                    className="p-1.5 text-[#8A8A94] hover:text-red-600 rounded hover:bg-red-50 transition-colors cursor-pointer"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
