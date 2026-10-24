import React from "react";
import Link from "next/link";
import { FolderGit2, Star, GitFork, Lock, Globe, Plus, ExternalLink } from "lucide-react";
import { getRepositories } from "@/lib/db/queries/repositories";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export const instant = false;

export default async function RepositoriesPage() {
  const repos = await getRepositories();

  return (
    <div className="flex flex-col flex-1">
      <RepoBreadcrumbs
        workspace="RepoPilot Space"
        repositoryName="Repositories Directory"
        isPrivate={false}
        tagsCount={repos.length}
        branchesCount={14}
      />

      <div className="p-6 space-y-6 max-w-7xl">
        {/* Header bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-[#111827]">Connected Repositories</h1>
            <p className="text-sm text-[#6B7280]">
              Manage indexed source code repositories and configure automated agent debugging.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 rounded-lg bg-[#10B981] px-4 py-2 text-sm font-semibold text-white hover:bg-[#059669] transition-colors shadow-xs">
              <Plus className="h-4 w-4" />
              <span>Connect Repository</span>
            </button>
          </div>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 flex flex-col justify-between hover:border-[#D1D5DB] transition-all shadow-2xs group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6F9F0] text-[#10B981]">
                      <FolderGit2 className="h-4 w-4" />
                    </div>
                    <div>
                      <Link
                        href={`/repositories/${repo.id}`}
                        className="font-semibold text-[15px] text-[#111827] group-hover:text-[#10B981] transition-colors flex items-center gap-1.5"
                      >
                        <span>{repo.fullName}</span>
                      </Link>
                      <span className="text-xs text-[#6B7280]">Default: {repo.defaultBranch}</span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-md border border-[#E5E7EB] bg-[#F9FAFB] px-2 py-0.5 text-xs font-medium text-[#6B7280]">
                    {repo.isPrivate ? <Lock className="h-3 w-3" /> : <Globe className="h-3 w-3" />}
                    {repo.isPrivate ? "Private" : "Public"}
                  </span>
                </div>

                <p className="text-sm text-[#4B5563] mt-3 line-clamp-2">{repo.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#F3F4F6] text-xs text-[#6B7280]">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 font-medium text-[#111827]">
                    <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-[#9CA3AF]" />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5 text-[#9CA3AF]" />
                    {repo.forks}
                  </span>
                </div>

                <Link
                  href={`/repositories/${repo.id}`}
                  className="flex items-center gap-1 font-semibold text-[#10B981] hover:underline"
                >
                  <span>View Details</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
