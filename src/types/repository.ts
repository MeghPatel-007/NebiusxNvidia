export interface Repository {
  id: string;
  name: string;
  fullName: string;
  owner: string;
  description?: string | null;
  defaultBranch: string;
  isPrivate: boolean;
  language: string;
  stars: number;
  forks: number;
  status: "active" | "indexing" | "archived";
  githubRepoId?: string | null;
  lastSyncedAt?: Date | string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  activeRunsCount?: number;
}
