import crypto from "crypto";
import { db } from "../db";
import { githubInstallStates } from "../db/schema";
import { eq } from "drizzle-orm";

export function hashState(state: string): string {
  return crypto.createHash("sha256").update(state).digest("hex");
}

export async function createInstallState(userId: string): Promise<string> {
  const rawState = crypto.randomBytes(32).toString("hex");
  const stateHash = hashState(rawState);
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes TTL

  await db.insert(githubInstallStates).values({
    id: `state-${crypto.randomUUID()}`,
    stateHash,
    userId,
    expiresAt,
    consumedAt: null,
  });

  return rawState;
}

export async function verifyAndConsumeInstallState(
  rawState: string,
  userId: string
): Promise<{ valid: boolean; error?: string }> {
  if (!rawState) {
    return { valid: false, error: "Missing state parameter" };
  }

  const stateHash = hashState(rawState);
  const [record] = await db
    .select()
    .from(githubInstallStates)
    .where(eq(githubInstallStates.stateHash, stateHash));

  if (!record) {
    return { valid: false, error: "Invalid state token" };
  }

  if (record.userId !== userId) {
    return { valid: false, error: "State token user mismatch" };
  }

  if (record.consumedAt) {
    return { valid: false, error: "State token already consumed" };
  }

  if (new Date() > new Date(record.expiresAt)) {
    return { valid: false, error: "State token has expired" };
  }

  // Mark consumed
  await db
    .update(githubInstallStates)
    .set({ consumedAt: new Date() })
    .where(eq(githubInstallStates.id, record.id));

  return { valid: true };
}
