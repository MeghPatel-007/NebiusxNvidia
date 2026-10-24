"use client";

import React, { useEffect, useState } from "react";
import { ExternalLink, ShieldCheck, Clock, Loader2 } from "lucide-react";

interface CommitItem {
  sha: string;
  shortSha: string;
  message: string;
  author: {
    name: string;
    avatarUrl?: string;
    date: string;
  };
  htmlUrl: string;
  verified: boolean;
}

export function RepositoryCommitHistory({
  repoId,
  branch = "main",
}: {
  repoId: string;
  branch?: string;
}) {
  const [commits, setCommits] = useState<CommitItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadCommits() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `/api/github/repositories/${encodeURIComponent(repoId)}/commits?branch=${encodeURIComponent(
            branch
          )}`
        );
        const data = await res.json();
        if (isMounted) {
          if (res.ok) {
            setCommits(data.commits || []);
          } else {
            setError(data.error || "Failed to load commits");
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : "Error fetching commits";
          setError(msg);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadCommits();
    return () => {
      isMounted = false;
    };
  }, [repoId, branch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-[#8A8A94] gap-2">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-[13.5px]">Fetching commit history...</span>
      </div>
    );
  }

  if (error && commits.length === 0) {
    return (
      <div className="p-4 rounded-[8px] border border-gray-200 bg-gray-50 text-[13px] text-[#8A8A94]">
        {error}
      </div>
    );
  }

  if (commits.length === 0) {
    return (
      <div className="text-center py-8 text-[13px] text-[#8A8A94]">
        No commits found for this branch.
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#EBEBEF] rounded-[8px] border border-[#EBEBEF] bg-white overflow-hidden">
      {commits.map((c) => (
        <div
          key={c.sha}
          className="p-3.5 flex items-start justify-between gap-4 hover:bg-[#FAFAFB] transition-colors"
        >
          <div className="space-y-1 min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[12px] font-[500] px-2 py-0.5 rounded bg-[#F4F4F6] text-[#111111] shrink-0">
                {c.shortSha}
              </span>
              <p className="text-[14px] font-[400] text-[#111111] truncate">
                {c.message.split("\n")[0]}
              </p>
              {c.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-[500] text-[#22A646] shrink-0">
                  <ShieldCheck className="h-3 w-3" /> Verified
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[12px] text-[#8A8A94]">
              {c.author.avatarUrl ? (
                <img
                  src={c.author.avatarUrl}
                  alt={c.author.name}
                  className="h-4 w-4 rounded-full"
                />
              ) : (
                <div className="h-4 w-4 rounded-full bg-gray-200 text-[9px] flex items-center justify-center font-bold">
                  {c.author.name[0]}
                </div>
              )}
              <span>{c.author.name} committed</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(c.author.date).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
          </div>

          <a
            href={c.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[#8A8A94] hover:text-[#111111] p-1.5 rounded hover:bg-gray-100 transition-colors shrink-0"
            title="View commit on GitHub"
          >
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      ))}
    </div>
  );
}
