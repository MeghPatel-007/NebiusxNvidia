import { z } from "zod";

export const benchmarkFilterSchema = z.object({
  dataset: z.enum(["swe-bench-lite", "swe-bench-verified", "human-eval", "all"]).default("all"),
  status: z.enum(["completed", "running", "failed", "all"]).default("all"),
  search: z.string().optional(),
});

export const createBenchmarkSchema = z.object({
  name: z.string().min(1, "Benchmark suite name is required"),
  dataset: z.string().min(1, "Dataset is required"),
  model: z.string().default("nvidia/nemotron-4-340b-instruct"),
  concurrency: z.number().int().min(1).max(16).default(4),
  sampleLimit: z.number().int().min(1).max(300).default(50),
});

export type BenchmarkFilterInput = z.infer<typeof benchmarkFilterSchema>;
export type CreateBenchmarkInput = z.infer<typeof createBenchmarkSchema>;
