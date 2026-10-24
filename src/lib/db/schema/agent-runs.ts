import { pgTable, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { repositories } from "./repositories";

export interface FindingItem {
  id: string;
  file: string;
  line: number;
  message: string;
  severity: "critical" | "warning" | "info";
  ruleId?: string;
}

export const agentRuns = pgTable("agent_runs", {
  id: text("id").primaryKey(),
  repoId: text("repo_id")
    .notNull()
    .references(() => repositories.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  issueDescription: text("issue_description").notNull(),
  branch: text("branch").default("main").notNull(),
  status: text("status").default("pending").notNull(), // 'pending' | 'running' | 'passed' | 'failed' | 'unverified'
  verificationStatus: text("verification_status").default("unverified").notNull(), // 'verified' | 'unverified' | 'failed'
  durationMs: integer("duration_ms").default(0).notNull(),
  patchDiff: text("patch_diff"),
  testCommand: text("test_command"),
  testStdout: text("test_stdout"),
  testStderr: text("test_stderr"),
  testExitCode: integer("test_exit_code"),
  findings: jsonb("findings").$type<FindingItem[]>().default([]),
  commitSha: text("commit_sha"),
  modelUsed: text("model_used").default("nvidia/nemotron-4-340b-instruct"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});
