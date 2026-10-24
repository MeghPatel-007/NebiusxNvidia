import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export type AppRole = "user" | "admin";

export class UnauthorizedError extends Error {
  readonly status = 401;
  constructor(message = "Authentication required") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  readonly status = 403;
  constructor(message = "Forbidden: Insufficient privileges") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class EmailVerificationRequiredError extends Error {
  readonly status = 403;
  constructor(message = "Email verification required before accessing this resource") {
    super(message);
    this.name = "EmailVerificationRequiredError";
  }
}

/**
 * Retrieves the current session and user from request headers without throwing.
 */
export async function getServerSession(customHeaders?: Headers) {
  try {
    const requestHeaders = customHeaders || (await headers());
    const session = await auth.api.getSession({
      headers: requestHeaders,
    });
    return session;
  } catch {
    return null;
  }
}

/**
 * Requires an active, non-banned session. Throws UnauthorizedError or ForbiddenError.
 */
export async function requireSession(customHeaders?: Headers) {
  const sessionData = await getServerSession(customHeaders);

  if (!sessionData || !sessionData.session || !sessionData.user) {
    throw new UnauthorizedError("You must be signed in to perform this action.");
  }

  if (sessionData.user.banned) {
    throw new ForbiddenError("This account has been suspended.");
  }

  return sessionData;
}

/**
 * Requires an authenticated user. By default requires verified email.
 */
export async function requireUser(customHeaders?: Headers, requireVerified = true) {
  const { user } = await requireSession(customHeaders);

  if (requireVerified && !user.emailVerified) {
    throw new EmailVerificationRequiredError(
      "Please verify your email address to access this feature."
    );
  }

  return user;
}

/**
 * Requires a specific server-side role (e.g. 'admin').
 */
export async function requireRole(expectedRole: AppRole, customHeaders?: Headers) {
  const user = await requireUser(customHeaders, true);

  if (user.role !== expectedRole) {
    throw new ForbiddenError(
      `Access denied: Required role '${expectedRole}', but current role is '${user.role}'.`
    );
  }

  return user;
}

/**
 * Convenience helper requiring the 'admin' role.
 */
export async function requireAdmin(customHeaders?: Headers) {
  return requireRole("admin", customHeaders);
}

/**
 * Validates resource ownership for tenant boundaries.
 */
export function assertResourceOwnership(
  resourceOwnerId: string | null | undefined,
  currentUserId: string,
  message = "Forbidden: You do not own this resource"
) {
  if (!resourceOwnerId || resourceOwnerId !== currentUserId) {
    throw new ForbiddenError(message);
  }
}
