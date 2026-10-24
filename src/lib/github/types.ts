export interface GitHubRepoMeta {
  id: number;
  name: string;
  fullName: string;
  owner: {
    login: string;
    avatarUrl?: string;
  };
  description?: string | null;
  private: boolean;
  htmlUrl: string;
  defaultBranch: string;
  stargazersCount: number;
  forksCount: number;
  language: string | null;
  updatedAt: string;
}

export interface GitHubBranch {
  name: string;
  commitSha: string;
  protected: boolean;
}
