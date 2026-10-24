import React from "react";
import Link from "next/link";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
  return (
    <div className="w-full max-w-[440px] px-4 py-8 sm:px-0">
      <div className="rounded-[16px] border border-[#EBEBEF] bg-white p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        {/* Brand Header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <Link href="/" className="mb-4 flex items-center gap-2 group">
            {/* 8-pointed star/asterisk glyph in brand green */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1FBF5B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 transition-transform group-hover:rotate-45 duration-300"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
            </svg>
            <span className="font-[500] text-[22px] tracking-tight text-[#1FBF5B]">
              Repoverse
            </span>
          </Link>
          <h1 className="text-[20px] sm:text-[22px] font-[500] tracking-[-0.01em] text-[#111111]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-[14px] text-[#8A8A94] max-w-[320px]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Form Body */}
        {children}

        {/* Footer */}
        {footer && (
          <div className="mt-6 border-t border-[#EBEBEF] pt-4 text-center text-[13.5px] text-[#8A8A94]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
