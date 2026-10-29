import React from "react";
import Link from "next/link";
import { Book, Star, GitFork, Lock, Globe, ExternalLink } from "lucide-react";
import { getRepositories } from "@/lib/db/queries/repositories";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";
import { GitHubConnectionCard } from "@/components/repositories/github-connection-card";
import { ConnectGitHubButton } from "@/components/repositories/connect-github-button";

export const instant = false;

export default async function RepositoriesPage() {
  const repos = await getRepositories();

  return (
    <div className="flex flex-col flex-1 bg-card">
      <RepoBreadcrumbs
        workspace="Vektora Space"
        repositoryName="Repositories"
        isPrivate={false}
        tagsCount={repos.length}
        branchesCount={14}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-foreground">
              Connected Repositories
            </h1>
            <p className="text-[14.5px] font-[400] text-muted-foreground">
              Manage indexed source code repositories and automated agent debugging.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <ConnectGitHubButton label="Connect GitHub App" />
          </div>
        </div>

        {/* GitHub App Connection Card */}
        <GitHubConnectionCard />

        {/* Repositories section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-[500] text-foreground">
              Active Workspace Repositories ({repos.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map((repo) => (
              <div
                key={repo.id}
                className="rounded-[10px] border border-border bg-card p-5 flex flex-col justify-between hover:border-foreground/30 transition-all shadow-[0_1px_2px_rgba(16,16,24,0.04)] group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-(--success-bg) text-(--brand)">
                        <Book className="h-4 w-4" strokeWidth={1.5} />
                      </div>
                      <div>
                        <Link
                          href={`/repositories/${repo.id}`}
                          className="font-[500] text-[16px] text-foreground group-hover:text-(--brand) transition-colors"
                        >
                          {repo.fullName}
                        </Link>
                        <div className="text-[13px] text-muted-foreground">Branch: {repo.defaultBranch}</div>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 h-[20px] px-2 rounded-[6px] border border-border bg-card text-[12px] font-[400] text-foreground">
                      {repo.isPrivate ? (
                        <Lock className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                      ) : (
                        <Globe className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                      )}
                      {repo.isPrivate ? "Private" : "Public"}
                    </span>
                  </div>

                  <p className="text-[14px] text-foreground mt-3 line-clamp-2">{repo.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border text-[13px] text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 font-[500] text-foreground">
                      <span className="h-2 w-2 rounded-full bg-(--brand)" />
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                      {repo.forks}
                    </span>
                  </div>

                  <Link
                    href={`/repositories/${repo.id}`}
                    className="flex items-center gap-1 font-[500] text-(--brand) hover:underline"
                  >
                    <span>Inspect Commits & Runs</span>
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
