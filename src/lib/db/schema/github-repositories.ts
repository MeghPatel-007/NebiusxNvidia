import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { githubInstallations } from "./github-installations";

export const githubRepositories = pgTable("github_repositories", {
  id: text("id").primaryKey(),
  installationId: text("installation_id")
    .notNull()
    .references(() => githubInstallations.id, { onDelete: "cascade" }),
  githubRepoId: text("github_repo_id").notNull().unique(),
  owner: text("owner").notNull(),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  defaultBranch: text("default_branch").default("main").notNull(),
  isPrivate: boolean("is_private").default(false).notNull(),
  htmlUrl: text("html_url"),
  description: text("description"),
  language: text("language").default("TypeScript"),
  stars: integer("stars").default(0).notNull(),
  forks: integer("forks").default(0).notNull(),
  lastSyncedAt: timestamp("last_synced_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type GitHubRepositoryRow = typeof githubRepositories.$inferSelect;
export type NewGitHubRepositoryRow = typeof githubRepositories.$inferInsert;
