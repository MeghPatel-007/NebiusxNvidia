import React from "react";
import Link from "next/link";
import { Book, Star, GitFork, Lock, Globe, Plus, ExternalLink } from "lucide-react";
import { getRepositories } from "@/lib/db/queries/repositories";
import { RepoBreadcrumbs } from "@/components/layout/breadcrumbs";

export const instant = false;

export default async function RepositoriesPage() {
  const repos = await getRepositories();

  return (
    <div className="flex flex-col flex-1 bg-white">
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
            <h1 className="text-[22px] font-[500] tracking-[-0.01em] text-[#111111]">
              Connected Repositories
            </h1>
            <p className="text-[14.5px] font-[400] text-[#8A8A94]">
              Manage indexed source code repositories and automated agent debugging.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-1.5 h-[34px] px-3.5 rounded-[10px] bg-[#22A646] text-[14.5px] font-[500] text-white hover:bg-[#1f963f] transition-colors shadow-[0_1px_2px_rgba(16,16,24,0.04)]">
              <Plus className="h-4 w-4" strokeWidth={1.5} />
              <span>Connect Repository</span>
            </button>
          </div>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-[10px] border border-[#EBEBEF] bg-white p-5 flex flex-col justify-between hover:border-[#D8D8DE] transition-all shadow-[0_1px_2px_rgba(16,16,24,0.04)] group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#E6F8EA] text-[#22A646]">
                      <Book className="h-4 w-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <Link
                        href={`/repositories/${repo.id}`}
                        className="font-[500] text-[16px] text-[#111111] group-hover:text-[#22A646] transition-colors"
                      >
                        {repo.fullName}
                      </Link>
                      <div className="text-[13px] text-[#8A8A94]">Branch: {repo.defaultBranch}</div>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 h-[20px] px-2 rounded-[6px] border border-[#EBEBEF] bg-white text-[12px] font-[400] text-[#111111]">
                    {repo.isPrivate ? <Lock className="h-3 w-3 text-[#8A8A94]" strokeWidth={1.5} /> : <Globe className="h-3 w-3 text-[#8A8A94]" strokeWidth={1.5} />}
                    {repo.isPrivate ? "Private" : "Public"}
                  </span>
                </div>

                <p className="text-[14px] text-[#3A3A42] mt-3 line-clamp-2">{repo.description}</p>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#EBEBEF] text-[13px] text-[#8A8A94]">
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 font-[500] text-[#111111]">
                    <span className="h-2 w-2 rounded-full bg-[#22A646]" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-[#8A8A94]" strokeWidth={1.5} />
                    {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3.5 w-3.5 text-[#8A8A94]" strokeWidth={1.5} />
                    {repo.forks}
                  </span>
                </div>

                <Link
                  href={`/repositories/${repo.id}`}
                  className="flex items-center gap-1 font-[500] text-[#22A646] hover:underline"
                >
                  <span>Details</span>
                  <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
