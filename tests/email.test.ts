import { describe, it, expect } from "vitest";
import {
  renderVerificationEmail,
  renderPasswordResetEmail,
  renderPasswordChangedEmail,
} from "@/lib/email/templates";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedNotification,
  memoryEmailAdapter,
} from "@/lib/email";

describe("email service", () => {
  it("renders branded verification email with plain-text fallback", () => {
    const template = renderVerificationEmail({
      name: "Alex",
      url: "https://repopilot.internal/verify-email?token=sec_tok_123",
    });

    expect(template.subject).toContain("Verify your email");
    expect(template.html).toContain("https://repopilot.internal/verify-email?token=sec_tok_123");
    expect(template.html).toContain("Repoverse");
    expect(template.text).toContain("https://repopilot.internal/verify-email?token=sec_tok_123");
  });

  it("renders branded password reset email with security warnings", () => {
    const template = renderPasswordResetEmail({
      name: "Sam",
      url: "https://repopilot.internal/reset-password?token=sec_tok_456",
    });

    expect(template.subject).toContain("Reset your");
    expect(template.html).toContain("https://repopilot.internal/reset-password?token=sec_tok_456");
    expect(template.text).toContain("used once");
  });

  it("renders security notification email on password change", () => {
    const template = renderPasswordChangedEmail({
      name: "Sam",
    });

    expect(template.subject).toContain("password changed");
    expect(template.html).toContain("successfully changed");
  });

  it("sends and stores emails via memory adapter in test mode", async () => {
    memoryEmailAdapter.clear();

    const res1 = await sendVerificationEmail({
      email: "engineer@test.com",
      name: "Engineer",
      url: "https://app.internal/verify?token=tok-abc",
    });

    expect(res1.success).toBe(true);
    expect(memoryEmailAdapter.getSentEmails().length).toBe(1);

    const sent = memoryEmailAdapter.getLastEmail();
    expect(sent?.to).toBe("engineer@test.com");
    expect(sent?.subject).toContain("Verify your email");

    await sendPasswordChangedNotification({
      email: "engineer@test.com",
      name: "Engineer",
    });

    expect(memoryEmailAdapter.getSentEmails().length).toBe(2);
  });
});
