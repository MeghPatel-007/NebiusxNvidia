import { z } from "zod";

export const githubRepositorySchema = z.object({
  id: z.string(),
  installationId: z.string(),
  githubRepoId: z.string(),
  owner: z.string(),
  name: z.string(),
  fullName: z.string(),
  defaultBranch: z.string().default("main"),
  isPrivate: z.boolean().default(false),
  htmlUrl: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  stars: z.number().default(0),
  forks: z.number().default(0),
  lastSyncedAt: z.coerce.date(),
});

export const githubRepositoryQuerySchema = z.object({
  q: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  per_page: z.coerce.number().min(1).max(100).default(30),
});

export type GitHubRepositorySchema = z.infer<typeof githubRepositorySchema>;
