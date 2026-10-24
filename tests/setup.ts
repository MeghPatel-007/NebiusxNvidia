import "dotenv/config";
import { beforeEach } from "vitest";
import { memoryEmailAdapter } from "@/lib/email/adapters/memory";

(process.env as unknown as Record<string, string>).NODE_ENV = "test";
process.env.BETTER_AUTH_SECRET =
  process.env.BETTER_AUTH_SECRET || "test-better-auth-secret-needs-32-chars-long";
process.env.BETTER_AUTH_URL =
  process.env.BETTER_AUTH_URL || "http://localhost:3000";

beforeEach(() => {
  memoryEmailAdapter.clear();
});
