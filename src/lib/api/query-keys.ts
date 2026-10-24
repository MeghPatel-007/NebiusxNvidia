export const queryKeys = {
  metrics: {
    all: ["metrics"] as const,
    overview: (period?: string) => ["metrics", "overview", period] as const,
    heatmap: (year?: number) => ["metrics", "heatmap", year] as const,
  },
  repositories: {
    all: ["repositories"] as const,
    lists: () => ["repositories", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["repositories", "list", filters] as const,
    details: () => ["repositories", "detail"] as const,
    detail: (id: string) => ["repositories", "detail", id] as const,
  },
  runs: {
    all: ["runs"] as const,
    lists: () => ["runs", "list"] as const,
    list: (filters?: Record<string, unknown>) => ["runs", "list", filters] as const,
    details: () => ["runs", "detail"] as const,
    detail: (id: string) => ["runs", "detail", id] as const,
    events: (runId: string) => ["runs", "events", runId] as const,
  },
  activity: {
    all: ["activity"] as const,
    latest: (limit?: number) => ["activity", "latest", limit] as const,
  },
};
