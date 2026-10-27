"use client";
import React from "react";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";


export default function BackgroundRippleEffectDemo() {
  return (
    <div className="relative flex min-h-fit w-full flex-col items-start justify-start overflow-hidden">
      <BackgroundRippleEffect />
      <div className="mt-60 w-full">
        <p className="relative z-10 mx-auto mb-4 max-w-xl text-center text-neutral-800 dark:text-neutral-500">
           Find the bug. Understand the cause. Ship the fix.
        </p>

      </div>
    </div>
  );
}
