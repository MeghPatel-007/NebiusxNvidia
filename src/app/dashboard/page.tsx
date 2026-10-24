import React, { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/authorization";
import { getOverviewMetrics } from "@/lib/db/queries/overview";
import { getRepositories } from "@/lib/db/queries/repositories";
import { getAgentRuns } from "@/lib/db/queries/agent-runs";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SectionCards } from "@/components/section-cards";
import { DataTable } from "@/components/data-table";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { MemberStatusTable } from "@/components/dashboard/member-status-table";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  SparklesIcon,
  FolderGit2Icon,
  PlayIcon,
  FileSpreadsheetIcon,
  LineChartIcon,
  GitBranchIcon,
  CheckCircle2Icon,
  AlertCircleIcon,
  ExternalLinkIcon,
  ArrowRightIcon,
} from "lucide-react";

import rawTableData from "./data.json";

export const instant = false;

export default async function DashboardPage() {
  const sessionData = await getServerSession();

  if (!sessionData || !sessionData.session || !sessionData.user) {
    redirect("/sign-in");
  }

  if (!sessionData.user.emailVerified) {
    redirect(`/verify-email?email=${encodeURIComponent(sessionData.user.email)}`);
  }

  // Fetch real database records in parallel
  const [metrics, repositories, runs] = await Promise.all([
    getOverviewMetrics(),
    getRepositories(),
    getAgentRuns(),
  ]);

  const userName = sessionData.user.name || "Engineer";

  return (
    <SidebarProvider>
      <Suspense fallback={<aside className="w-(--sidebar-width) shrink-0 bg-sidebar border-r" />}>
        <AppSidebar />
      </Suspense>

      <SidebarInset>
        <SiteHeader title="Engineering Control Center" />

        <div className="flex flex-1 flex-col gap-6 p-4 lg:p-6 bg-background">
          {/* Welcome & Command Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border bg-card p-5 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Welcome back, {userName}
                </h2>
                <Badge variant="outline" className="border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 text-xs">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse mr-1" />
                  Live Sync
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Autonomous bug resolution engine is active across {repositories.length} connected repositories.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <Button
                variant="outline"
                size="sm"
                render={<Link href="/repositories" className="gap-1.5 text-xs" />}
              >
                <FolderGit2Icon className="size-3.5" />
                <span>Connect GitHub</span>
              </Button>
              <Button
                size="sm"
                render={<Link href="/runs" className="gap-1.5 text-xs" />}
              >
                <PlayIcon className="size-3.5 fill-current" />
                <span>Launch Agent Run</span>
              </Button>
            </div>
          </div>

          {/* Real Metrics KPI Cards */}
          <SectionCards metrics={metrics} />

          {/* Main Interactive Tabs */}
          <Tabs defaultValue="matrix" className="w-full space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
              <TabsList className="bg-muted/70 p-1">
                <TabsTrigger value="matrix" className="gap-2 text-xs">
                  <FileSpreadsheetIcon className="size-3.5" />
                  <span>Work Matrix</span>
                  <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                    {rawTableData.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="telemetry" className="gap-2 text-xs">
                  <LineChartIcon className="size-3.5" />
                  <span>Telemetry & Activity</span>
                </TabsTrigger>
                <TabsTrigger value="repositories" className="gap-2 text-xs">
                  <FolderGit2Icon className="size-3.5" />
                  <span>Connected Repositories</span>
                  <Badge variant="secondary" className="px-1.5 py-0 text-[10px]">
                    {repositories.length}
                  </Badge>
                </TabsTrigger>
              </TabsList>

              <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                <SparklesIcon className="size-3 text-amber-500" />
                <span>Next.js 16 + Neon PostgreSQL</span>
              </div>
            </div>

            {/* Tab 1: Full Interactive Data Table */}
            <TabsContent value="matrix" className="space-y-4 m-0">
              <div className="rounded-xl border bg-card py-4 shadow-xs">
                <DataTable data={rawTableData} />
              </div>
            </TabsContent>

            {/* Tab 2: Telemetry, Interactive Area Chart, Heatmap, Member Status */}
            <TabsContent value="telemetry" className="space-y-6 m-0">
              <div className="rounded-xl border bg-card p-4 shadow-xs">
                <div className="mb-4 px-2">
                  <h3 className="text-base font-semibold text-foreground">Interactive Run Telemetry</h3>
                  <p className="text-xs text-muted-foreground">
                    Historical repair runs, execution duration, and token usage trends.
                  </p>
                </div>
                <ChartAreaInteractive />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="rounded-xl border bg-card overflow-hidden shadow-xs">
                  <ActivityHeatmap />
                </div>
                <div className="rounded-xl border bg-card overflow-hidden shadow-xs">
                  <MemberStatusTable runs={runs} />
                </div>
              </div>
            </TabsContent>

            {/* Tab 3: Connected Repositories & Agent Run Dispatch */}
            <TabsContent value="repositories" className="space-y-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repositories.map((repo) => (
                  <Card key={repo.id} className="flex flex-col justify-between hover:border-foreground/30 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-base font-semibold truncate">
                          <Link href={`/repositories/${repo.id}`} className="hover:underline flex items-center gap-1.5">
                            <FolderGit2Icon className="size-4 text-muted-foreground shrink-0" />
                            <span className="truncate">{repo.name}</span>
                          </Link>
                        </CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            repo.status === "active"
                              ? "border-emerald-500/20 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 text-[11px]"
                              : "border-muted text-muted-foreground text-[11px]"
                          }
                        >
                          {repo.status}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2 text-xs pt-1">
                        {repo.description || "No description provided for this repository."}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                        <div className="flex items-center gap-1">
                          <GitBranchIcon className="size-3.5" />
                          <span>{repo.defaultBranch || "main"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertCircleIcon className="size-3.5 text-blue-500" />
                          <span>{repo.activeRunsCount ?? 0} active runs</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {repo.language || "TypeScript"}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          render={<Link href={`/repositories/${repo.id}`} />}
                          className="h-7 text-xs gap-1"
                        >
                          <span>View Details</span>
                          <ArrowRightIcon className="size-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {repositories.length === 0 && (
                <div className="rounded-xl border border-dashed p-12 text-center space-y-3">
                  <FolderGit2Icon className="size-10 text-muted-foreground mx-auto" />
                  <h3 className="font-semibold text-lg">No Connected Repositories</h3>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                    Connect your GitHub organization or test repositories using our official GitHub App.
                  </p>
                  <Button
                    render={<Link href="/repositories" />}
                  >
                    Connect GitHub Repositories
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
