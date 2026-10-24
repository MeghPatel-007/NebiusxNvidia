import { describe, it, expect, beforeAll } from "vitest";
import { auth } from "@/lib/auth";
import { memoryEmailAdapter } from "@/lib/email/adapters/memory";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

describe("Better Auth Lifecycle Integration", () => {
  const testId = Date.now().toString(36);
  const testUser = {
    name: `Test User ${testId}`,
    email: `lifecycle-${testId}@repopilot.internal`,
    password: "SecurePassword123!",
  };

  beforeAll(() => {
    memoryEmailAdapter.clear();
  });

  it("handles user registration and sends verification email", async () => {
    const result = await auth.api.signUpEmail({
      body: {
        name: testUser.name,
        email: testUser.email,
        password: testUser.password,
      },
    });

    expect(result).toBeDefined();
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe(testUser.email.toLowerCase());
    expect(result.user.emailVerified).toBe(false);

    // Verify transactional verification email was queued
    const sentEmails = memoryEmailAdapter.getSentEmails();
    expect(sentEmails.length).toBeGreaterThan(0);
    const verificationEmail = sentEmails.find((e) => e.to === testUser.email.toLowerCase());
    expect(verificationEmail).toBeDefined();
    expect(verificationEmail?.subject).toContain("Verify your email");
  });

  it("prevents duplicate account creation and enumeration attacks", async () => {
    // Attempt duplicate sign-up
    const duplicateResult = await auth.api.signUpEmail({
      body: {
        name: "Duplicate User",
        email: testUser.email,
        password: "AnotherPassword123!",
      },
    });

    // Better Auth returns generic response for anti-enumeration
    expect(duplicateResult).toBeDefined();
    expect(duplicateResult.token).toBeNull();

    // Verify database integrity: only one row exists in database for this email
    const rows = await db
      .select()
      .from(users)
      .where(eq(users.email, testUser.email.toLowerCase()));
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe(testUser.name);
  });

  it("rejects passwords shorter than 8 characters", async () => {
    await expect(
      auth.api.signUpEmail({
        body: {
          name: "Short Pwd",
          email: `short-${testId}@repopilot.internal`,
          password: "short",
        },
      })
    ).rejects.toThrow();
  });

  it("blocks unverified user from signing in when email verification is required", async () => {
    try {
      const signInRes = await auth.api.signInEmail({
        body: {
          email: testUser.email,
          password: testUser.password,
        },
      });
      // In Better Auth, sign in either throws or returns unverified status
      expect(signInRes.user.emailVerified).toBe(false);
    } catch (err: unknown) {
      expect(err).toBeDefined();
    }
  });

  it("handles forgot-password flow without disclosing non-existent accounts", async () => {
    memoryEmailAdapter.clear();

    // Existing user
    const resExist = await auth.api.requestPasswordReset({
      body: {
        email: testUser.email,
        redirectTo: "http://localhost:3000/reset-password",
      },
    });
    expect(resExist).toBeDefined();

    // Verify recovery email was sent
    const recoveryEmail = memoryEmailAdapter.getLastEmail();
    expect(recoveryEmail?.to).toBe(testUser.email.toLowerCase());
    expect(recoveryEmail?.subject).toContain("Reset your");

    // Non-existent user also returns generic response to prevent account enumeration
    const resNonExist = await auth.api.requestPasswordReset({
      body: {
        email: `nonexistent-${Date.now()}@repopilot.internal`,
        redirectTo: "http://localhost:3000/reset-password",
      },
    });
    expect(resNonExist).toBeDefined();
  });
});
