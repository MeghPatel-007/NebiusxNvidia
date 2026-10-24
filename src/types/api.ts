export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface MetricSummary {
  verifiedFixes: number;
  verifiedFixesChange: number; // e.g. +21.8
  testPassRate: number; // e.g. 88.5
  testPassRateChange: number; // e.g. 0.0
  avgRepairTimeMinutes: number; // e.g. 18.4
  avgRepairTimeChange: number; // e.g. +12.0
  connectedRepos: number;
  connectedReposChange: number; // e.g. -9.0
}

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}
