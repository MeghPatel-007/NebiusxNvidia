// Seed benchmark results for the demo. Replace with real evaluation runs
// wired to the backend before claiming these numbers in production.
export interface BenchmarkRecord {
  id: string;
  dataset: string;
  samples: number;
  resolved: number;
  passRate: string;
  model: string;
  avgTime: string;
  status: string;
}

export const BENCHMARK_SEED: BenchmarkRecord[] = [
  {
    id: "swebench-verified",
    dataset: "SWE-bench Verified",
    samples: 500,
    resolved: 207,
    passRate: "41.4%",
    model: "nvidia/nemotron-4-340b-instruct",
    avgTime: "4.2m",
    status: "Verified",
  },
  {
    id: "swebench-lite",
    dataset: "SWE-bench Lite",
    samples: 300,
    resolved: 118,
    passRate: "39.3%",
    model: "nvidia/nemotron-4-340b-instruct",
    avgTime: "3.8m",
    status: "Verified",
  },
  {
    id: "humaneval-plus",
    dataset: "HumanEval Plus",
    samples: 164,
    resolved: 146,
    passRate: "89.0%",
    model: "nvidia/nemotron-4-340b-instruct",
    avgTime: "42s",
    status: "Verified",
  },
  {
    id: "repodebug-internal",
    dataset: "RepoDebug Suite (Internal)",
    samples: 85,
    resolved: 77,
    passRate: "90.5%",
    model: "nvidia/llama-3.1-nemotron-70b-instruct",
    avgTime: "1.1m",
    status: "Verified",
  },
];

export function getBenchmark(id: string): BenchmarkRecord | undefined {
  return BENCHMARK_SEED.find((b) => b.id === id);
}
