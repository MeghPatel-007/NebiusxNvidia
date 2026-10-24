import { z } from "zod";

export const workspaceSettingsSchema = z.object({
  workspaceName: z.string().min(2, "Workspace name must be at least 2 characters"),
  timezone: z.string().default("UTC"),
  defaultBranch: z.string().default("main"),
  autoIndexNewRepos: z.boolean().default(true),
  defaultModel: z.string().default("nvidia/nemotron-4-340b-instruct"),
  maxTokensPerRun: z.number().int().min(1000).max(128000).default(32000),
  temperature: z.number().min(0).max(1).default(0.2),
  testTimeoutSeconds: z.number().int().min(10).max(600).default(120),
  requireApprovalBeforePatch: z.boolean().default(true),
  nebiusEndpoint: z.string().url().default("https://api.studio.nebius.ai/v1"),
});

export type WorkspaceSettingsInput = z.infer<typeof workspaceSettingsSchema>;
