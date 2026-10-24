import { describe, it, expect, vi } from "vitest";
import {
  requireSession,
  requireUser,
  requireAdmin,
  assertResourceOwnership,
  UnauthorizedError,
  ForbiddenError,
  EmailVerificationRequiredError,
} from "@/lib/authorization";
import { auth } from "@/lib/auth";

type MockSession = Awaited<ReturnType<typeof auth.api.getSession>>;

describe("authorization helpers", () => {
  it("requireSession throws UnauthorizedError when unauthenticated", async () => {
    vi.spyOn(auth.api, "getSession").mockResolvedValueOnce(null);

    await expect(requireSession(new Headers())).rejects.toThrow(UnauthorizedError);
  });

  it("requireSession throws ForbiddenError when user is banned", async () => {
    vi.spyOn(auth.api, "getSession").mockResolvedValueOnce({
      session: {
        id: "s-1",
        userId: "u-1",
        expiresAt: new Date(Date.now() + 10000),
        token: "t-1",
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
        impersonatedBy: null,
      },
      user: {
        id: "u-1",
        name: "Banned User",
        email: "banned@test.com",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
        banned: true,
        banReason: "Malicious activity",
        banExpires: null,
        image: null,
      },
    } as unknown as MockSession);

    await expect(requireSession(new Headers())).rejects.toThrow(ForbiddenError);
  });

  it("requireUser throws EmailVerificationRequiredError when email is unverified", async () => {
    vi.spyOn(auth.api, "getSession").mockResolvedValueOnce({
      session: {
        id: "s-2",
        userId: "u-2",
        expiresAt: new Date(Date.now() + 10000),
        token: "t-2",
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
        impersonatedBy: null,
      },
      user: {
        id: "u-2",
        name: "Unverified User",
        email: "unverified@test.com",
        emailVerified: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
        banned: false,
        banReason: null,
        banExpires: null,
        image: null,
      },
    } as unknown as MockSession);

    await expect(requireUser(new Headers())).rejects.toThrow(EmailVerificationRequiredError);
  });

  it("requireUser succeeds when email is verified", async () => {
    vi.spyOn(auth.api, "getSession").mockResolvedValueOnce({
      session: {
        id: "s-3",
        userId: "u-3",
        expiresAt: new Date(Date.now() + 10000),
        token: "t-3",
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
        impersonatedBy: null,
      },
      user: {
        id: "u-3",
        name: "Valid User",
        email: "valid@test.com",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
        banned: false,
        banReason: null,
        banExpires: null,
        image: null,
      },
    } as unknown as MockSession);

    const user = await requireUser(new Headers());
    expect(user.id).toBe("u-3");
    expect(user.emailVerified).toBe(true);
  });

  it("requireAdmin denies ordinary 'user' role with ForbiddenError", async () => {
    vi.spyOn(auth.api, "getSession").mockResolvedValueOnce({
      session: {
        id: "s-4",
        userId: "u-4",
        expiresAt: new Date(Date.now() + 10000),
        token: "t-4",
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
        impersonatedBy: null,
      },
      user: {
        id: "u-4",
        name: "Ordinary User",
        email: "ordinary@test.com",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
        banned: false,
        banReason: null,
        banExpires: null,
        image: null,
      },
    } as unknown as MockSession);

    await expect(requireAdmin(new Headers())).rejects.toThrow(ForbiddenError);
  });

  it("requireAdmin permits authorized 'admin' role", async () => {
    vi.spyOn(auth.api, "getSession").mockResolvedValueOnce({
      session: {
        id: "s-5",
        userId: "u-5",
        expiresAt: new Date(Date.now() + 10000),
        token: "t-5",
        createdAt: new Date(),
        updatedAt: new Date(),
        ipAddress: null,
        userAgent: null,
        impersonatedBy: null,
      },
      user: {
        id: "u-5",
        name: "Admin User",
        email: "admin@test.com",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "admin",
        banned: false,
        banReason: null,
        banExpires: null,
        image: null,
      },
    } as unknown as MockSession);

    const admin = await requireAdmin(new Headers());
    expect(admin.role).toBe("admin");
  });

  it("assertResourceOwnership enforces tenant and user isolation", () => {
    expect(() => assertResourceOwnership("owner-123", "owner-123")).not.toThrow();
    expect(() => assertResourceOwnership("owner-123", "attacker-456")).toThrow(ForbiddenError);
    expect(() => assertResourceOwnership(null, "attacker-456")).toThrow(ForbiddenError);
  });
});
