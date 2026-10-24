import { z } from "zod";

export const githubInstallationSchema = z.object({
  id: z.string(),
  installationId: z.string(),
  accountLogin: z.string(),
  accountType: z.string().default("User"),
  accountAvatarUrl: z.string().nullable().optional(),
  repositorySelection: z.string().default("selected"),
  repositoryCount: z.number().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const githubInstallCallbackSchema = z.object({
  installation_id: z.string().min(1, "Installation ID is required"),
  setup_action: z.string().optional(),
  state: z.string().optional(),
});

export type GitHubInstallationSchema = z.infer<typeof githubInstallationSchema>;
export type GitHubInstallCallbackSchema = z.infer<typeof githubInstallCallbackSchema>;
