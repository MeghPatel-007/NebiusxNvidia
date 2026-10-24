"use client";

import React from "react";
import { AppSidebar } from "@/components/layout/sidebar";
import { AppHeader } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#F7F8F7]">
      {/* Persistent Left Sidebar */}
      <AppSidebar />

      {/* Main Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
