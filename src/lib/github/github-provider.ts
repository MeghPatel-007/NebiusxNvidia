import { GitHubBranch, GitHubRepoMeta } from "./types";

export class GitHubProvider {
  private token?: string;

  constructor(token?: string) {
    this.token = token || process.env.GITHUB_ACCESS_TOKEN;
  }

  get isConfigured(): boolean {
    return Boolean(this.token);
  }

  async getRepository(owner: string, repo: string): Promise<GitHubRepoMeta | null> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "RepoPilot-Agent",
    };
    if (this.token) {
      headers.Authorization = `token ${this.token}`;
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        headers,
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`GitHub API error: ${response.statusText}`);
      }

      const d = await response.json();
      return {
        id: d.id,
        name: d.name,
        fullName: d.full_name,
        owner: {
          login: d.owner?.login || owner,
          avatarUrl: d.owner?.avatar_url,
        },
        description: d.description,
        private: Boolean(d.private),
        htmlUrl: d.html_url,
        defaultBranch: d.default_branch || "main",
        stargazersCount: d.stargazers_count || 0,
        forksCount: d.forks_count || 0,
        language: d.language || "TypeScript",
        updatedAt: d.updated_at,
      };
    } catch {
      return null;
    }
  }

  async getBranches(owner: string, repo: string): Promise<GitHubBranch[]> {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "RepoPilot-Agent",
    };
    if (this.token) {
      headers.Authorization = `token ${this.token}`;
    }

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/branches`, {
        headers,
      });
      if (!response.ok) return [{ name: "main", commitSha: "HEAD", protected: true }];
      const list = await response.json();
      return list.map((b: { name: string; commit?: { sha?: string }; protected?: boolean }) => ({
        name: b.name,
        commitSha: b.commit?.sha || "",
        protected: Boolean(b.protected),
      }));
    } catch {
      return [{ name: "main", commitSha: "HEAD", protected: true }];
    }
  }
}

export const githubProvider = new GitHubProvider();
