import { z } from "zod";

export const githubCommitAuthorSchema = z.object({
  name: z.string(),
  email: z.string().optional(),
  avatarUrl: z.string().optional(),
  date: z.string(),
});

export const githubCommitItemSchema = z.object({
  sha: z.string(),
  shortSha: z.string(),
  message: z.string(),
  author: githubCommitAuthorSchema,
  htmlUrl: z.string(),
  verified: z.boolean().default(false),
});

export const githubCommitQuerySchema = z.object({
  branch: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  per_page: z.coerce.number().min(1).max(100).default(15),
});

export type GitHubCommitItemSchema = z.infer<typeof githubCommitItemSchema>;
