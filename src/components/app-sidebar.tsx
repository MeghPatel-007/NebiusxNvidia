"use client"

import * as React from "react"
import Link from "next/link"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  ListIcon,
  ChartBarIcon,
  FolderGit2Icon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  DatabaseIcon,
  CpuIcon,
  ActivityIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Developer",
    email: "dev@repopilot.internal",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon className="size-4" />,
    },
    {
      title: "Overview",
      url: "/overview",
      icon: <ActivityIcon className="size-4" />,
    },
    {
      title: "Repositories",
      url: "/repositories",
      icon: <FolderGit2Icon className="size-4" />,
    },
    {
      title: "Agent Runs",
      url: "/runs",
      icon: <ListIcon className="size-4" />,
    },
    {
      title: "Benchmarks",
      url: "/benchmarks",
      icon: <ChartBarIcon className="size-4" />,
    },
  ],
  documents: [
    {
      name: "Connected Repos",
      url: "/repositories",
      icon: <DatabaseIcon className="size-4" />,
    },
    {
      name: "SWE-bench Engine",
      url: "/benchmarks",
      icon: <CpuIcon className="size-4" />,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings2Icon className="size-4" />,
    },
    {
      title: "Find Repos",
      url: "/repositories",
      icon: <SearchIcon className="size-4" />,
    },
    {
      title: "Documentation",
      url: "https://github.com",
      icon: <CircleHelpIcon className="size-4" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/dashboard" />}
            >
              <div className="flex aspect-square size-6 items-center justify-center rounded-md bg-[#111111] text-white dark:bg-white dark:text-[#111111]">
                <CpuIcon className="size-3.5" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="text-sm font-semibold tracking-tight text-[#111111] dark:text-white">RepoPilot</span>
                <span className="text-[10px] text-muted-foreground">Autonomous Engine</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
