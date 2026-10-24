import { pgTable, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { users } from "./users";

export const repositories = pgTable("repositories", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  fullName: text("full_name").notNull(),
  owner: text("owner").notNull(),
  description: text("description"),
  defaultBranch: text("default_branch").default("main").notNull(),
  isPrivate: boolean("is_private").default(false).notNull(),
  language: text("language").default("TypeScript").notNull(),
  stars: integer("stars").default(0).notNull(),
  forks: integer("forks").default(0).notNull(),
  status: text("status").default("active").notNull(), // 'active' | 'indexing' | 'archived'
  githubRepoId: text("github_repo_id"),
  lastSyncedAt: timestamp("last_synced_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
