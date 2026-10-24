"use client";

import React from "react";
import { QueryProvider } from "./query-provider";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <Toaster position="bottom-right" />
    </QueryProvider>
  );
}
