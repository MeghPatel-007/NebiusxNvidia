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
      bg: "bg-[#FFE8EA] border-[#FFD0D4] text-[#E5484D]",
      icon: AlertCircle,
    },
    success: {
      bg: "bg-[#E6F8EA] border-[#C8F1D0] text-[#22A646]",
      icon: CheckCircle2,
    },
    info: {
      bg: "bg-[#F4F4F6] border-[#EBEBEF] text-[#4B4B52]",
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
