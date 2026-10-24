"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

interface ConnectGitHubButtonProps {
  className?: string;
  variant?: "primary" | "outline";
  label?: string;
}

export function ConnectGitHubButton({
  className = "",
  variant = "primary",
  label = "Connect GitHub App",
}: ConnectGitHubButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleConnect = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/github/install?format=json");
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        router.push("/api/github/install");
      }
    } catch {
      router.push("/api/github/install");
    }
  };

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-[500] text-[13.5px] rounded-[8px] transition-all cursor-pointer h-[34px] px-3.5 select-none";
  const primaryStyles =
    "bg-[#111111] hover:bg-[#222222] text-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] active:scale-[0.98]";
  const outlineStyles =
    "border border-[#EBEBEF] bg-white hover:bg-[#F7F8F7] text-[#111111] shadow-[0_1px_2px_rgba(16,16,24,0.04)]";

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : outlineStyles} ${className}`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin text-current" />
      ) : (
        <IconBrandGithub className="h-4 w-4" />
      )}
      <span>{loading ? "Redirecting to GitHub..." : label}</span>
    </button>
  );
}
