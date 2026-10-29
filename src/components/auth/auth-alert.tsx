import React from "react";
import { AlertCircle, CheckCircle2, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthAlertProps {
  type: "error" | "success" | "info";
  message: string;
  className?: string;
}

export function AuthAlert({ type, message, className }: AuthAlertProps) {
  if (!message) return null;

  const styles = {
    error: {
      bg: "bg-(--danger-bg) border-[#E5484D]/25 text-(--danger)",
      icon: AlertCircle,
    },
    success: {
      bg: "bg-(--success-bg) border-[#76B900]/25 text-(--success)",
      icon: CheckCircle2,
    },
    info: {
      bg: "bg-(--neutral-pill-bg) border-border text-muted-foreground",
      icon: Info,
    },
  }[type];

  const Icon = styles.icon;

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      aria-live="polite"
      className={cn(
        "flex items-start gap-2.5 rounded-[8px] border p-3 text-[13.5px] leading-relaxed transition-all",
        styles.bg,
        className
      )}
    >
      <Icon className="h-4 w-4 shrink-0 mt-0.5" strokeWidth={2} />
      <span className="flex-1">{message}</span>
    </div>
  );
}
