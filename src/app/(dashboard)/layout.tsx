import React, { Suspense } from "react";
import { AppSidebar } from "@/components/layout/sidebar";
import { AppHeader } from "@/components/layout/header";

export const instant = false;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white text-[#111111]">
      {/* Persistent Left Sidebar (width: 203px, hairline border-r #EBEBEF) */}
      <Suspense fallback={<aside className="w-[203px] h-screen bg-[#FAFAFA] border-r border-[#EBEBEF] shrink-0" />}>
        <AppSidebar />
      </Suspense>

      {/* Main Column */}
      <div className="flex flex-1 flex-col min-w-0">
        <Suspense fallback={<div className="h-[50px] border-b border-[#EBEBEF] bg-white" />}>
          <AppHeader />
        </Suspense>
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}

