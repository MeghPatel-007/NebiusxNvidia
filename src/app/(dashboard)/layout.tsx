import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/authorization";
import { AppSidebar } from "@/components/layout/sidebar";
import { AppHeader } from "@/components/layout/header";

export const instant = false;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sessionData = await getServerSession();

  if (!sessionData || !sessionData.session || !sessionData.user) {
    redirect("/sign-in");
  }

  if (!sessionData.user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(sessionData.user.email)}`);
  }

  return (
    <div className="flex min-h-screen bg-card text-foreground">
      {/* Persistent Left Sidebar (width: 203px, hairline border-r #EBEBEF) */}
      <Suspense fallback={<aside className="w-[203px] h-screen bg-sidebar border-r border-border shrink-0" />}>
        <AppSidebar />
      </Suspense>

      {/* Main Column */}
      <div className="flex flex-1 flex-col min-w-0">
        <Suspense fallback={<div className="h-[50px] border-b border-border bg-card" />}>
          <AppHeader />
        </Suspense>
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    </div>
  );
}
