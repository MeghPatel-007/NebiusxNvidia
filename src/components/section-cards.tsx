"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUpIcon, TrendingDownIcon, ActivityIcon, CheckCircle2Icon, ClockIcon, GitForkIcon } from "lucide-react"
import { MetricSummary } from "@/types/api"

export function SectionCards({ metrics }: { metrics?: MetricSummary }) {
  if (metrics) {
    return (
      <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
        {/* Card 1: Verified Fixes */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <CheckCircle2Icon className="size-3.5 text-lime-500" />
              Verified Fixes
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {metrics.verifiedFixes}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="border-lime-500/20 text-lime-600 dark:text-lime-400">
                <TrendingUpIcon className="size-3 text-lime-500" />
                +{metrics.verifiedFixesChange}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Passing benchmark runs <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              Regression tests verified
            </div>
          </CardFooter>
        </Card>

        {/* Card 2: Test Pass Rate */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <ActivityIcon className="size-3.5 text-blue-500" />
              Test Pass Rate
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {metrics.testPassRate}%
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="border-blue-500/20 text-blue-600 dark:text-blue-400">
                <TrendingUpIcon className="size-3 text-blue-500" />
                Target &gt;85%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              High patch accuracy <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              SWE-bench verified passes
            </div>
          </CardFooter>
        </Card>

        {/* Card 3: Avg Repair Time */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <ClockIcon className="size-3.5 text-amber-500" />
              Avg Repair Time
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {metrics.avgRepairTimeMinutes}m
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="border-amber-500/20 text-amber-600 dark:text-amber-400">
                <TrendingDownIcon className="size-3 text-lime-500" />
                -{metrics.avgRepairTimeChange}%
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Faster turnaround cycle <TrendingDownIcon className="size-4 text-lime-500" />
            </div>
            <div className="text-muted-foreground">
              Ingestion to pull request
            </div>
          </CardFooter>
        </Card>

        {/* Card 4: Connected Repositories */}
        <Card className="@container/card">
          <CardHeader>
            <CardDescription className="flex items-center gap-1.5">
              <GitForkIcon className="size-3.5 text-purple-500" />
              Connected Repos
            </CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {metrics.connectedRepos}
            </CardTitle>
            <CardAction>
              <Badge variant="outline" className="border-purple-500/20 text-purple-600 dark:text-purple-400">
                Active Sync
              </Badge>
            </CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Continuous monitoring <ActivityIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">GitHub App webhooks active</div>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon
              />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>New Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            1,234
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingDownIcon
              />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period{" "}
            <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Accounts</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            45,678
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon
              />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Growth Rate</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            4.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <TrendingUpIcon
              />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance increase{" "}
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  )
}
