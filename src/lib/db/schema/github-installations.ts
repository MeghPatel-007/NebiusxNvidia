import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const githubInstallations = pgTable("github_installations", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  installationId: text("installation_id").notNull().unique(),
  accountLogin: text("account_login").notNull(),
  accountType: text("account_type").default("User").notNull(),
  accountAvatarUrl: text("account_avatar_url"),
  repositorySelection: text("repository_selection").default("selected").notNull(),
  permissions: text("permissions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type GitHubInstallation = typeof githubInstallations.$inferSelect;
export type NewGitHubInstallation = typeof githubInstallations.$inferInsert;
