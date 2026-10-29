import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderGit2Icon, SparklesIcon } from "lucide-react"

export function SiteHeader({ title = "Dashboard" }: { title?: string }) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) bg-background/95 backdrop-blur-xs">
      <div className="flex items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 h-4 data-vertical:self-auto"
        />
        <h1 className="text-sm font-semibold tracking-tight text-foreground">{title}</h1>
      </div>
      <div className="flex items-center gap-2 px-4 lg:px-6">
        <Badge variant="outline" className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 text-xs text-lime-600 dark:text-lime-400 border-lime-500/20 bg-lime-500/5">
          <SparklesIcon className="size-3" />
          Autonomous Engine Ready
        </Badge>
        <Button
          variant="outline"
          size="sm"
          render={<Link href="/repositories" className="gap-1.5" />}
          className="h-7 text-xs"
        >
          <FolderGit2Icon className="size-3.5" />
          <span>Manage Repos</span>
        </Button>
      </div>
    </header>
  )
}
