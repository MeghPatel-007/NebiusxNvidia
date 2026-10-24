import { FindingItem } from "@/lib/db/schema/agent-runs";

export type AgentRunStatus = "pending" | "running" | "passed" | "failed" | "unverified";
export type VerificationStatus = "verified" | "unverified" | "failed";

export interface AgentRun {
  id: string;
  repoId: string;
  repoName?: string;
  repoFullName?: string;
  title: string;
  issueDescription: string;
  branch: string;
  status: AgentRunStatus;
  verificationStatus: VerificationStatus;
  durationMs: number;
  patchDiff?: string | null;
  testCommand?: string | null;
  testStdout?: string | null;
  testStderr?: string | null;
  testExitCode?: number | null;
  findings?: FindingItem[] | null;
  commitSha?: string | null;
  modelUsed: string;
  createdAt: Date | string;
  completedAt?: Date | string | null;
}

export interface AgentEvent {
  id: string;
  runId: string;
  type:
    | "indexed"
    | "diagnosis"
    | "patch_generated"
    | "tests_started"
    | "tests_passed"
    | "tests_failed"
    | "comment"
    | "review_request";
  message: string;
  actor: string;
  actorAvatar?: string | null;
  details?: Record<string, unknown> | null;
  createdAt: Date | string;
}
