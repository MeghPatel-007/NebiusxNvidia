import React from "react";
import Link from "next/link";
import { LiquidGlass } from "@/components/ui/liquid-glass";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-[440px] px-4 py-8 sm:px-0">
      <LiquidGlass
        radius={16}
        tint={0.06}
        className="w-full border border-border bg-card/60"
        contentClassName="p-6 sm:p-8"
      >
        {/* Brand Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 flex items-center gap-2 group">
            {/* Node/cluster favicon as brand mark */}
            <img
              src="/favicon.ico"
              alt="RepoPilot"
              width={28}
              height={28}
              className="shrink-0 transition-transform group-hover:rotate-45 duration-300"
            />
            <span className="font-[500] text-[22px] tracking-tight text-(--brand)">
              RepoPilot
            </span>
          </Link>
          <h1 className="text-[20px] sm:text-[22px] font-[500] tracking-[-0.01em] text-foreground">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-[14px] text-muted-foreground max-w-[320px]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Body */}
        {children}

        {/* Footer */}
        {footer && (
          <div className="mt-6 border-t border-border pt-4 text-center text-[13.5px] text-muted-foreground">
            {footer}
          </div>
        )}
      </LiquidGlass>
    </div>
  );
}
