import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { agentRuns } from "./agent-runs";

export const agentEvents = pgTable("agent_events", {
  id: text("id").primaryKey(),
  runId: text("run_id")
    .notNull()
    .references(() => agentRuns.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'indexed' | 'diagnosis' | 'patch_generated' | 'tests_started' | 'tests_passed' | 'tests_failed' | 'comment' | 'review_request'
  message: text("message").notNull(),
  actor: text("actor").default("RepoPilot Agent").notNull(),
  actorAvatar: text("actor_avatar"),
  details: jsonb("details").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
