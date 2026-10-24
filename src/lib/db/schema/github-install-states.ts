import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const githubInstallStates = pgTable("github_install_states", {
  id: text("id").primaryKey(),
  stateHash: text("state_hash").notNull().unique(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  consumedAt: timestamp("consumed_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type GitHubInstallState = typeof githubInstallStates.$inferSelect;
export type NewGitHubInstallState = typeof githubInstallStates.$inferInsert;
