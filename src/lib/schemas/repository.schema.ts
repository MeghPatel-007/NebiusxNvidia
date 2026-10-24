import { z } from "zod";

export const createRepositorySchema = z.object({
  name: z.string().min(1, "Repository name is required"),
  fullName: z.string().min(1, "Full name (owner/name) is required"),
  owner: z.string().min(1, "Owner is required"),
  description: z.string().optional(),
  defaultBranch: z.string().default("main"),
  isPrivate: z.boolean().default(false),
  language: z.string().default("TypeScript"),
});

export const updateRepositorySchema = createRepositorySchema.partial();

export type CreateRepositoryInput = z.infer<typeof createRepositorySchema>;
export type UpdateRepositoryInput = z.infer<typeof updateRepositorySchema>;
