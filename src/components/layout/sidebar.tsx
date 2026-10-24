"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Book,
  Database,
  Layers,
  Package,
  Users,
  BarChart3,
  Settings,
  CircleUser,
  Share2,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeft,
  LogOut,
} from "lucide-react";
import { useSidebarStore } from "@/lib/stores/sidebar-store";
import { cn } from "@/lib/utils";
import { authClient, signOut } from "@/lib/auth-client";

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const [projectsOpen, setProjectsOpen] = useState(true);

  const handleSignOut = async () => {
    try {
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/sign-in";
          },
        },
      });
    } catch {
      window.location.href = "/sign-in";
    }
  };

  const dashboardNav = [
    { title: "Overview", href: "/overview", icon: LayoutGrid },
    { title: "Repository", href: "/repositories", icon: Book },
  ];

  const codeSpaceNav = [
    { title: "Database", href: "/overview#database", icon: Database },
  ];

  const secondaryCodeSpaceNav = [
    { title: "Packages", href: "/overview#packages", icon: Package },
    { title: "Member", href: "/runs", icon: Users },
    { title: "Analytics", href: "/benchmarks", icon: BarChart3 },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  const userProfileNav = [
    { title: "Profile", href: "/settings#profile", icon: CircleUser },
    { title: "Work Preferences", href: "/settings#preferences", icon: Share2 },
  ];

  const projects = [
    {
      name: "Vektora/Marketplace",
      href: "/repositories/repo-1",
      badgeText: "V",
      badgeBg: "bg-[#0E2A1F] text-[#1FBF5B]",
    },
    {
      name: "Odama/Company-Site",
      href: "/repositories/repo-3",
      badgeText: "O",
      badgeBg: "bg-[#EA580C] text-white",
    },
    {
      name: "Maryuandi/Mobile-App",
      href: "/repositories/repo-4",
      badgeText: "M",
      badgeBg: "bg-[#2563EB] text-white",
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col shrink-0 border-r border-[#EBEBEF] bg-white transition-all duration-200 select-none",
        isCollapsed ? "w-[64px]" : "w-[203px]"
      )}
    >
      {/* Top Logo Row (Height: 50px, border-b hairline) */}
      <div className="flex h-[50px] items-center justify-between px-3 border-b border-[#EBEBEF]">
        {!isCollapsed && (
          <Link href="/overview" className="flex items-center gap-2 group">
            {/* 8-pointed star/asterisk glyph 24px in brand green #1FBF5B */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1FBF5B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
            </svg>
            <span className="font-[500] text-[20px] tracking-tight text-[#1FBF5B]">
              Repoverse
            </span>
          </Link>
        )}

        {isCollapsed && (
          <Link href="/overview" className="mx-auto">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#1FBF5B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
            </svg>
          </Link>
        )}

        <button
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-[#8A8A94] hover:text-[#111111] p-1 rounded-md hover:bg-black/[0.03] transition-colors"
        >
          {isCollapsed ? (
            <PanelLeft className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <PanelLeftClose className="h-5 w-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {/* Section: MY DASHBOARD */}
        <div>
          {!isCollapsed && (
            <div className="px-1 mb-2 text-[12.5px] font-[400] tracking-[0.02em] text-[#9A9AA3] uppercase">
              My Dashboard
            </div>
          )}
          <nav className="space-y-0.5">
            {dashboardNav.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/overview"
                  ? pathname === "/overview"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-2 h-[40px] rounded-[8px] text-[15.5px] transition-colors",
                    isActive
                      ? "text-[#111111] font-[500] bg-black/[0.03]"
                      : "text-[#111111] font-[400] hover:bg-black/[0.03]",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <Icon className="h-5 w-5 text-[#111111] shrink-0" strokeWidth={1.5} />
                  {!isCollapsed && <span className="truncate">{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Section: CODE SPACE */}
        <div>
          {!isCollapsed && (
            <div className="px-1 mb-2 text-[12.5px] font-[400] tracking-[0.02em] text-[#9A9AA3] uppercase">
              Code Space
            </div>
          )}
          <nav className="space-y-0.5">
            {codeSpaceNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-2 h-[40px] rounded-[8px] text-[15.5px] text-[#111111] font-[400] hover:bg-black/[0.03] transition-colors",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <Icon className="h-5 w-5 text-[#111111] shrink-0" strokeWidth={1.5} />
                  {!isCollapsed && <span className="truncate">{item.title}</span>}
                </Link>
              );
            })}

            {/* Collapsible Projects Row */}
            {!isCollapsed ? (
              <div>
                <button
                  onClick={() => setProjectsOpen(!projectsOpen)}
                  className="flex w-full items-center justify-between px-2 h-[40px] rounded-[8px] text-[15.5px] text-[#111111] font-[400] hover:bg-black/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Layers className="h-5 w-5 text-[#111111] shrink-0" strokeWidth={1.5} />
                    <span>Projects</span>
                  </div>
                  {projectsOpen ? (
                    <ChevronDown className="h-4 w-4 text-[#8A8A94]" strokeWidth={1.5} />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-[#8A8A94]" strokeWidth={1.5} />
                  )}
                </button>

                {projectsOpen && (
                  <div className="mt-0.5 space-y-0.5">
                    {projects.map((proj) => {
                      const isProjActive = pathname.includes(proj.href.split("/")[2]);
                      return (
                        <Link
                          key={proj.name}
                          href={proj.href}
                          className={cn(
                            "flex items-center gap-2.5 pl-6 pr-2 h-[36px] rounded-[8px] text-[14.5px] transition-colors",
                            isProjActive
                              ? "font-[500] text-[#111111] bg-black/[0.03]"
                              : "font-[400] text-[#111111] hover:bg-black/[0.03]"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-[22px] w-[22px] items-center justify-center rounded-full text-[11px] font-bold shrink-0",
                              proj.badgeBg
                            )}
                          >
                            {proj.badgeText}
                          </span>
                          <span className="truncate">{proj.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : null}

            {secondaryCodeSpaceNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-2 h-[40px] rounded-[8px] text-[15.5px] transition-colors",
                    isActive
                      ? "text-[#111111] font-[500] bg-black/[0.03]"
                      : "text-[#111111] font-[400] hover:bg-black/[0.03]",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <Icon className="h-5 w-5 text-[#111111] shrink-0" strokeWidth={1.5} />
                  {!isCollapsed && <span className="truncate">{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Section: USER PROFILE */}
        <div>
          {!isCollapsed && (
            <div className="px-1 mb-2 text-[12.5px] font-[400] tracking-[0.02em] text-[#9A9AA3] uppercase">
              User Profile
            </div>
          )}
          <nav className="space-y-0.5">
            {userProfileNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-2 h-[40px] rounded-[8px] text-[15.5px] text-[#111111] font-[400] hover:bg-black/[0.03] transition-colors",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <Icon className="h-5 w-5 text-[#111111] shrink-0" strokeWidth={1.5} />
                  {!isCollapsed && <span className="truncate">{item.title}</span>}
                </Link>
              );
            })}

            <button
              onClick={handleSignOut}
              title={isCollapsed ? "Sign Out" : undefined}
              className={cn(
                "flex w-full items-center gap-3 px-2 h-[40px] rounded-[8px] text-[15.5px] text-[#E5484D] font-[400] hover:bg-[#FFE8EA] transition-colors",
                isCollapsed && "justify-center px-0"
              )}
            >
              <LogOut className="h-5 w-5 text-[#E5484D] shrink-0" strokeWidth={1.5} />
              {!isCollapsed && <span className="truncate">Sign Out</span>}
            </button>
          </nav>
        </div>
      </div>

      {/* Pinned Footer Caption */}
      {!isCollapsed && (
        <div className="p-3 border-t border-[#EBEBEF] text-[11px] font-[400] tracking-[0.02em] text-[#9A9AA3] uppercase">
          Repoverse® Community
        </div>
      )}
    </aside>
  );
}
