"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || props.name || "password-input";
    const errorId = error ? `${inputId}-error` : undefined;

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13.5px] font-[500] text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            className={cn(
              "flex h-[38px] w-full rounded-[8px] border border-border bg-card px-3 py-1.5 text-[14px] text-foreground placeholder:text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors focus:border-(--brand) focus:outline-none focus:ring-1 focus:ring-(--brand) disabled:cursor-not-allowed disabled:opacity-50 pr-10",
              error && "border-(--danger) focus:border-(--danger) focus:ring-(--danger)",
              className
            )}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" strokeWidth={1.75} />
            ) : (
              <Eye className="h-4 w-4" strokeWidth={1.75} />
            )}
          </button>
        </div>
        {error && (
          <p id={errorId} className="text-[12.5px] text-(--danger) font-[400]">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
