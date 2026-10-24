import { z } from "zod";

export const createAgentRunSchema = z.object({
  repoId: z.string().min(1, "Repository is required"),
  title: z.string().min(1, "Session title is required"),
  issueDescription: z.string().min(1, "Bug / issue description is required"),
  branch: z.string().default("main"),
  modelUsed: z.string().default("nvidia/nemotron-4-340b-instruct"),
});

export const updateAgentRunSchema = z.object({
  status: z.enum(["pending", "running", "passed", "failed", "unverified"]).optional(),
  verificationStatus: z.enum(["verified", "unverified", "failed"]).optional(),
  durationMs: z.number().int().nonnegative().optional(),
  patchDiff: z.string().optional(),
  testCommand: z.string().optional(),
  testStdout: z.string().optional(),
  testStderr: z.string().optional(),
  testExitCode: z.number().int().optional(),
  findings: z
    .array(
      z.object({
        id: z.string(),
        file: z.string(),
        line: z.number(),
        message: z.string(),
        severity: z.enum(["critical", "warning", "info"]),
        ruleId: z.string().optional(),
      })
    )
    .optional(),
});

export type CreateAgentRunInput = z.infer<typeof createAgentRunSchema>;
export type UpdateAgentRunInput = z.infer<typeof updateAgentRunSchema>;
