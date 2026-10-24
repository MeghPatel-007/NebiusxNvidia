"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FolderGit2,
  PlayCircle,
  BarChart3,
  Cpu,
  Settings,
  ChevronDown,
  ChevronRight,
  Database,
  Box,
  User,
  Sliders,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { useSidebarStore } from "@/lib/stores/sidebar-store";
import { cn } from "@/lib/utils";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export function AppSidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebarStore();
  const [projectsOpen, setProjectsOpen] = useState(true);

  const mainNav: NavItem[] = [
    { title: "Overview", href: "/overview", icon: LayoutGrid },
    { title: "Repositories", href: "/repositories", icon: FolderGit2, badge: "4" },
    { title: "Agent Runs", href: "/runs", icon: PlayCircle, badge: "3" },
    { title: "Benchmarks", href: "/benchmarks", icon: BarChart3 },
  ];

  const codeSpaceNav: NavItem[] = [
    { title: "Database", href: "/overview#db", icon: Database },
    { title: "Packages", href: "/overview#packages", icon: Box },
    { title: "Models & Usage", href: "/models", icon: Cpu },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  const profileNav: NavItem[] = [
    { title: "Profile", href: "/settings#profile", icon: User },
    { title: "Work Preferences", href: "/settings#preferences", icon: Sliders },
  ];

  const projects = [
    { name: "Vektora/Marketplace", color: "bg-emerald-600", href: "/repositories/repo-1" },
    { name: "Odama/Company-Site", color: "bg-amber-500", href: "/repositories/repo-3" },
    { name: "Maryuandi/Mobile-App", color: "bg-blue-500", href: "/repositories/repo-4" },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col shrink-0 border-r border-[#E5E7EB] bg-white transition-all duration-200 select-none",
        isCollapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {/* Top Logo & Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-[#F0F2F0]">
        {!isCollapsed && (
          <Link href="/overview" className="flex items-center gap-2.5 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6F9F0] text-[#10B981] group-hover:bg-[#10B981] group-hover:text-white transition-colors">
              {/* Asterisk / 8-pointed star icon inspired by repo.png */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
              </svg>
            </div>
            <span className="font-semibold text-[17px] tracking-tight text-[#16A34A]">RepoPilot</span>
          </Link>
        )}

        {isCollapsed && (
          <Link href="/overview" className="mx-auto">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6F9F0] text-[#10B981]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07l14.14-14.14" />
              </svg>
            </div>
          </Link>
        )}

        <button
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="text-[#9CA3AF] hover:text-[#111827] p-1 rounded-md hover:bg-[#F3F4F6] transition-colors"
        >
          {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>
      </div>

      {/* Nav Content */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Section: My Dashboard */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-2 text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
              My Dashboard
            </div>
          )}
          <nav className="space-y-1">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/overview" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-[#E6F9F0] text-[#10B981] font-semibold"
                      : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-[#10B981]" : "text-[#6B7280]"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="flex-1 truncate">{item.title}</span>
                  )}
                  {!isCollapsed && item.badge && (
                    <span
                      className={cn(
                        "ml-auto text-[11px] px-1.5 py-0.5 rounded-full font-medium",
                        isActive
                          ? "bg-[#10B981]/15 text-[#059669]"
                          : "bg-[#F3F4F6] text-[#6B7280]"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Section: Code Space */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-2 text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
              Code Space
            </div>
          )}
          <nav className="space-y-1">
            {/* Collapsible Projects node */}
            {!isCollapsed ? (
              <div>
                <button
                  onClick={() => setProjectsOpen(!projectsOpen)}
                  className="flex w-full items-center justify-between px-2.5 py-2 rounded-lg text-[13px] font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <FolderGit2 className="h-4 w-4 text-[#6B7280]" />
                    <span>Projects</span>
                  </div>
                  {projectsOpen ? (
                    <ChevronDown className="h-3.5 w-3.5 text-[#9CA3AF]" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5 text-[#9CA3AF]" />
                  )}
                </button>

                {projectsOpen && (
                  <div className="mt-1 ml-5 pl-2 border-l border-[#E5E7EB] space-y-1">
                    {projects.map((proj) => (
                      <Link
                        key={proj.name}
                        href={proj.href}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[12px] font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] transition-colors"
                      >
                        <span className={cn("h-2 w-2 rounded-full shrink-0", proj.color)} />
                        <span className="truncate">{proj.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {codeSpaceNav.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-colors",
                    isActive
                      ? "bg-[#E6F9F0] text-[#10B981] font-semibold"
                      : "text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB]",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <Icon className="h-4 w-4 text-[#6B7280] shrink-0" />
                  {!isCollapsed && <span className="flex-1 truncate">{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Section: User Profile */}
        <div>
          {!isCollapsed && (
            <div className="px-2 mb-2 text-[11px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
              User Profile
            </div>
          )}
          <nav className="space-y-1">
            {profileNav.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={isCollapsed ? item.title : undefined}
                  className={cn(
                    "flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#F9FAFB] transition-colors",
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <Icon className="h-4 w-4 text-[#6B7280] shrink-0" />
                  {!isCollapsed && <span className="flex-1 truncate">{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer Branding */}
      {!isCollapsed && (
        <div className="px-4 py-3 border-t border-[#F0F2F0] text-[10px] font-semibold tracking-wider text-[#9CA3AF] uppercase">
          RepoPilot® Workspace
        </div>
      )}
    </aside>
  );
}
