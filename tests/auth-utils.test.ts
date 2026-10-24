import { describe, it, expect } from "vitest";
import {
  isValidRedirectUrl,
  checkPasswordStrength,
  normalizeEmail,
} from "@/lib/auth-utils";

describe("auth-utils", () => {
  describe("isValidRedirectUrl", () => {
    it("accepts valid relative application paths", () => {
      expect(isValidRedirectUrl("/overview")).toBe(true);
      expect(isValidRedirectUrl("/repositories/repo-1")).toBe(true);
      expect(isValidRedirectUrl("/settings")).toBe(true);
      expect(isValidRedirectUrl("/runs/new?repo=demo")).toBe(true);
    });

    it("rejects open-redirect attack vectors and protocol-relative paths", () => {
      expect(isValidRedirectUrl("//attacker.com")).toBe(false);
      expect(isValidRedirectUrl("/\\attacker.com")).toBe(false);
      expect(isValidRedirectUrl("https://evil.com/phishing")).toBe(false);
      expect(isValidRedirectUrl("javascript:alert(1)")).toBe(false);
      expect(isValidRedirectUrl("data:text/html,bad")).toBe(false);
    });

    it("rejects internal auth handler loop paths", () => {
      expect(isValidRedirectUrl("/api/auth/callback")).toBe(false);
    });

    it("handles allowed canonical baseUrl matching", () => {
      expect(
        isValidRedirectUrl("https://app.repopilot.internal/overview", "https://app.repopilot.internal")
      ).toBe(true);
      expect(
        isValidRedirectUrl("https://evil.repopilot.internal/overview", "https://app.repopilot.internal")
      ).toBe(false);
    });

    it("rejects empty, null, and non-string inputs", () => {
      expect(isValidRedirectUrl("")).toBe(false);
      expect(isValidRedirectUrl("   ")).toBe(false);
      expect(isValidRedirectUrl(null)).toBe(false);
      expect(isValidRedirectUrl(undefined)).toBe(false);
    });
  });

  describe("checkPasswordStrength", () => {
    it("flags passwords under 8 characters as weak", () => {
      const res = checkPasswordStrength("Ab1!");
      expect(res.minLength).toBe(false);
      expect(res.isStrong).toBe(false);
    });

    it("flags passwords exceeding 128 characters as invalid", () => {
      const res = checkPasswordStrength("A".repeat(129));
      expect(res.maxLength).toBe(false);
      expect(res.isStrong).toBe(false);
    });

    it("validates strong passwords meeting complexity thresholds", () => {
      const res = checkPasswordStrength("SafePassw0rd!");
      expect(res.minLength).toBe(true);
      expect(res.maxLength).toBe(true);
      expect(res.hasLowercase).toBe(true);
      expect(res.hasUppercase).toBe(true);
      expect(res.hasNumber).toBe(true);
      expect(res.hasSymbol).toBe(true);
      expect(res.isStrong).toBe(true);
    });
  });

  describe("normalizeEmail", () => {
    it("trims whitespace and converts to lower case", () => {
      expect(normalizeEmail("  User.Test@Domain.COM  ")).toBe("user.test@domain.com");
    });
  });
});
