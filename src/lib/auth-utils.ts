/**
 * Shared non-secret authentication and security utilities.
 */

/**
 * Validates a redirect destination to prevent open-redirect attacks.
 * Allows safe relative paths (e.g. "/overview", "/settings")
 * and explicitly rejects protocol-relative URLs (e.g. "//evil.com")
 * or external origin hijacking.
 */
export function isValidRedirectUrl(url: string | null | undefined, allowedBaseUrl?: string): boolean {
  if (!url || typeof url !== "string") return false;

  const trimmed = url.trim();
  if (!trimmed) return false;

  // Reject protocol-relative URLs like "//evil.com"
  if (trimmed.startsWith("//") || trimmed.startsWith("/\\")) {
    return false;
  }

  // Safe relative paths starting with a single "/"
  if (trimmed.startsWith("/") && !trimmed.startsWith("/api/auth")) {
    // Prevent directory traversal or malformed paths
    try {
      const parsed = new URL(trimmed, "http://localhost");
      return parsed.pathname === trimmed.split("?")[0];
    } catch {
      return false;
    }
  }

  // If an absolute URL is provided, only allow it if it strictly matches allowedBaseUrl
  if (allowedBaseUrl) {
    try {
      const targetUrl = new URL(trimmed);
      const appUrl = new URL(allowedBaseUrl);
      return targetUrl.origin === appUrl.origin;
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * Normalizes email address to lower-case and trims whitespace.
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export interface PasswordRequirements {
  minLength: boolean;
  maxLength: boolean;
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  isStrong: boolean;
}

/**
 * Validates password strength and returns breakdown of requirements.
 */
export function checkPasswordStrength(password: string): PasswordRequirements {
  const minLength = password.length >= 8;
  const maxLength = password.length <= 128;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  // Consider strong if min length is met, and at least 3 of the 4 complexity rules match
  const complexityCount = [hasLowercase, hasUppercase, hasNumber, hasSymbol].filter(Boolean).length;
  const isStrong = minLength && maxLength && complexityCount >= 3;

  return {
    minLength,
    maxLength,
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSymbol,
    isStrong,
  };
}
