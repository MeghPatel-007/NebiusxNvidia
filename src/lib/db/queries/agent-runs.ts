import { db } from "../index";
import { agentRuns, agentEvents } from "../schema";
import { desc, eq } from "drizzle-orm";
import { AgentEvent, AgentRun } from "@/types/agent";

export const initialSampleRuns: AgentRun[] = [
  {
    id: "run-701",
    repoId: "repo-1",
    repoName: "prime-marketplace-3.0",
    repoFullName: "Vektora / prime-marketplace-3.0",
    title: "Fix signature deserialization panic on malformed payload",
    issueDescription: "Incoming webhook payload with truncated hex sequence causes unhandled panic in verifySignature().",
    branch: "main",
    status: "passed",
    verificationStatus: "verified",
    durationMs: 42000,
    commitSha: "c8e29a1",
    modelUsed: "nvidia/nemotron-4-340b-instruct",
    testCommand: "pnpm test src/crypto/verify.test.ts",
    testExitCode: 0,
    testStdout: "PASS src/crypto/verify.test.ts\n✓ handles malformed signature gracefully (14ms)\n✓ verifies valid signatures (8ms)\n\nTest Suites: 1 passed, 1 total\nTests: 2 passed, 2 total",
    patchDiff: `--- a/src/crypto/verify.ts
+++ b/src/crypto/verify.ts
@@ -28,7 +28,11 @@ export function verifySignature(payload: string, signature: string): boolean {
+  if (!signature || signature.length !== 128) {
+    return false;
+  }
   try {
     const decoded = Buffer.from(signature, 'hex');
+    if (decoded.length !== 64) return false;
     return secp256k1.verify(payload, decoded);
   } catch {
     return false;
   }`,
    findings: [
      {
        id: "f-1",
        file: "src/crypto/verify.ts",
        line: 30,
        message: "Unchecked Buffer length before calling native verification routine",
        severity: "critical",
      },
    ],
    createdAt: new Date("2026-10-24T09:15:00Z"),
    completedAt: new Date("2026-10-24T09:15:42Z"),
  },
  {
    id: "run-702",
    repoId: "repo-1",
    repoName: "prime-marketplace-3.0",
    repoFullName: "Vektora / prime-marketplace-3.0",
    title: "Resolve race condition in payment state lock",
    issueDescription: "Concurrent debit calls to order settlement can lead to double release when lock expiration occurs mid-flight.",
    branch: "feat/settlement-v3",
    status: "running",
    verificationStatus: "unverified",
    durationMs: 91000,
    modelUsed: "nvidia/nemotron-4-340b-instruct",
    commitSha: "9b32fa4",
    testCommand: "pnpm test src/orders/settlement.test.ts",
    findings: [
      {
        id: "f-2",
        file: "src/orders/settlement.ts",
        line: 142,
        message: "Atomic compare-and-swap missing on Redis lock renewal",
        severity: "warning",
      },
    ],
    createdAt: new Date("2026-10-24T09:40:00Z"),
  },
  {
    id: "run-703",
    repoId: "repo-2",
    repoName: "wesign-organization",
    repoFullName: "Vektora / wesign-organization",
    title: "Multi-sig quorum threshold off-by-one check",
    issueDescription: "Quorum validator allowed N-1 approvals when strictly M-of-N threshold required equal or greater approvals.",
    branch: "main",
    status: "passed",
    verificationStatus: "verified",
    durationMs: 54000,
    commitSha: "721aef0",
    modelUsed: "nvidia/nemotron-4-340b-instruct",
    testCommand: "cargo test quorum_tests",
    testExitCode: 0,
    testStdout: "test quorum_validator::test_strictly_m_of_n ... ok\ntest quorum_validator::test_insufficient_keys ... ok\n\ntest result: ok. 2 passed; 0 failed",
    patchDiff: `--- a/src/quorum.rs
+++ b/src/quorum.rs
@@ -19,7 +19,7 @@ pub fn validate_quorum(approvals: usize, threshold: usize) -> bool {
-    approvals > threshold - 1
+    approvals >= threshold
 }`,
    findings: [
      {
        id: "f-3",
        file: "src/quorum.rs",
        line: 20,
        message: "Incorrect relational boundary allowed approval undercount",
        severity: "critical",
      },
    ],
    createdAt: new Date("2026-10-23T18:30:00Z"),
    completedAt: new Date("2026-10-23T18:30:54Z"),
  },
  {
    id: "run-704",
    repoId: "repo-3",
    repoName: "auth-middleware-service",
    repoFullName: "Odama / Company-Site",
    title: "Sanitize user redirect URL after OAuth callback",
    issueDescription: "Open redirect vulnerability when return_to query parameter contains absolute external domain scheme.",
    branch: "security/fix-redirect",
    status: "passed",
    verificationStatus: "verified",
    durationMs: 38000,
    commitSha: "14a09e3",
    modelUsed: "nvidia/nemotron-4-340b-instruct",
    testCommand: "go test ./auth -run TestRedirectValidation",
    testExitCode: 0,
    testStdout: "=== RUN   TestRedirectValidation\n--- PASS: TestRedirectValidation (0.04s)\nPASS\nok  auth-middleware/auth  0.082s",
    createdAt: new Date("2026-10-23T14:10:00Z"),
    completedAt: new Date("2026-10-23T14:10:38Z"),
  },
  {
    id: "run-705",
    repoId: "repo-4",
    repoName: "mobile-wallet-app",
    repoFullName: "Maryuandi / Mobile-App",
    title: "Fix memory leak in background notification poller",
    issueDescription: "Polling subscription retained reference to unmounted transaction listener.",
    branch: "bugfix/poller-leak",
    status: "failed",
    verificationStatus: "failed",
    durationMs: 65000,
    commitSha: "4fa81bc",
    modelUsed: "nvidia/nemotron-4-340b-instruct",
    testCommand: "yarn test __tests__/poller.test.ts",
    testExitCode: 1,
    testStderr: "FAIL __tests__/poller.test.ts\n✕ cleans up unmounted subscriber (24ms)\n\nExpected listener count: 0\nReceived: 1",
    createdAt: new Date("2026-10-22T11:20:00Z"),
    completedAt: new Date("2026-10-22T11:21:05Z"),
  },
];

export const initialSampleEvents: AgentEvent[] = [
  {
    id: "evt-1",
    runId: "run-701",
    type: "tests_passed",
    message: "Ihya Commited merchant_store_main_con patch with 100% test pass rate",
    actor: "Ihya",
    actorAvatar: "/avatars/user-1.jpg",
    createdAt: new Date("2026-10-24T09:15:42Z"),
  },
  {
    id: "evt-2",
    runId: "run-702",
    type: "review_request",
    message: "Devrizal is requesting review on merchant_store_out_auth lock renewal",
    actor: "Devrizal",
    actorAvatar: "/avatars/user-2.jpg",
    createdAt: new Date("2026-10-24T09:40:12Z"),
  },
  {
    id: "evt-3",
    runId: "run-703",
    type: "patch_generated",
    message: "Bagas Commited new_user_validation_control threshold patch",
    actor: "Bagas",
    actorAvatar: "/avatars/user-3.jpg",
    createdAt: new Date("2026-10-23T18:30:54Z"),
  },
  {
    id: "evt-4",
    runId: "run-704",
    type: "comment",
    message: "Jordan Left 5 Comments on old_error_currency sanitizer logic",
    actor: "Jordan",
    actorAvatar: "/avatars/user-4.jpg",
    createdAt: new Date("2026-10-23T14:15:00Z"),
  },
  {
    id: "evt-5",
    runId: "run-701",
    type: "indexed",
    message: "Faris is Enabled continuous indexing on prime-marketplace-3.0",
    actor: "Faris",
    actorAvatar: "/avatars/user-5.jpg",
    createdAt: new Date("2026-10-23T11:00:00Z"),
  },
];

export async function getAgentRuns(): Promise<AgentRun[]> {
  if (process.env.NEXT_PHASE === "phase-production-build" || !process.env.DATABASE_URL) {
    return initialSampleRuns;
  }
  try {
    const rows = await db.select().from(agentRuns).orderBy(desc(agentRuns.createdAt));
    if (rows && rows.length > 0) {
      return rows.map((r) => ({
        ...r,
        modelUsed: r.modelUsed || "nvidia/nemotron-4-340b-instruct",
        status: r.status as AgentRun["status"],
        verificationStatus: r.verificationStatus as AgentRun["verificationStatus"],
      }));
    }
  } catch (err) {
    console.warn("DB fetch agent runs fallback:", err);
  }
  return initialSampleRuns;
}

export async function getAgentRunById(id: string): Promise<AgentRun | null> {
  if (process.env.NEXT_PHASE === "phase-production-build" || !process.env.DATABASE_URL) {
    return initialSampleRuns.find((r) => r.id === id) || null;
  }
  try {
    const [row] = await db.select().from(agentRuns).where(eq(agentRuns.id, id));
    if (row) {
      return {
        ...row,
        modelUsed: row.modelUsed || "nvidia/nemotron-4-340b-instruct",
        status: row.status as AgentRun["status"],
        verificationStatus: row.verificationStatus as AgentRun["verificationStatus"],
      };
    }
  } catch (err) {
    console.warn("DB fetch agent run by id fallback:", err);
  }
  return initialSampleRuns.find((r) => r.id === id) || null;
}

export async function getLatestEvents(limit = 10): Promise<AgentEvent[]> {
  if (process.env.NEXT_PHASE === "phase-production-build" || !process.env.DATABASE_URL) {
    return initialSampleEvents.slice(0, limit);
  }
  try {
    const rows = await db.select().from(agentEvents).orderBy(desc(agentEvents.createdAt)).limit(limit);
    if (rows && rows.length > 0) {
      return rows.map((e) => ({
        ...e,
        type: e.type as AgentEvent["type"],
      }));
    }
  } catch (err) {
    console.warn("DB fetch agent events fallback:", err);
  }
  return initialSampleEvents.slice(0, limit);
}
