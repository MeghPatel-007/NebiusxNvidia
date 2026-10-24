import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { db } from "@/lib/db";
import { users, sessions, accounts, verifications } from "@/lib/db/schema";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedNotification,
} from "@/lib/email";

// Validate production secrets and configuration
const isProduction = process.env.NODE_ENV === "production";
const secret = process.env.BETTER_AUTH_SECRET;

if (isProduction && (!secret || secret.length < 32)) {
  throw new Error(
    "FATAL: BETTER_AUTH_SECRET is required and must be at least 32 characters in production."
  );
}

const authSecret =
  secret || "repopilot-auth-dev-secret-minimum-32-chars-long-local-key";

const baseURL =
  process.env.BETTER_AUTH_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

// Construct trusted origins allowlist
const additionalOrigins = process.env.TRUSTED_ORIGINS
  ? process.env.TRUSTED_ORIGINS.split(",").map((o) => o.trim())
  : [];
const trustedOrigins = Array.from(new Set([baseURL, ...additionalOrigins]));

// Social provider configuration (only enabled if respective credentials exist)
const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};

// GitHub OAuth Login (distinct from GitHub App installation credentials)
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

// Google OAuth Login
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  secret: authSecret,
  baseURL,
  trustedOrigins,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: users,
      session: sessions,
      account: accounts,
      verification: verifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    sendResetPassword: async ({ user, url }) => {
      await sendPasswordResetEmail({
        email: user.email,
        name: user.name,
        url,
      });
    },
    onPasswordReset: async ({ user }) => {
      await sendPasswordChangedNotification({
        email: user.email,
        name: user.name,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendVerificationEmail({
        email: user.email,
        name: user.name,
        url,
      });
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days expiration
    updateAge: 60 * 60 * 24, // 1 day sliding refresh
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cache
    },
  },
  rateLimit: {
    enabled: true,
    window: 60, // 60 seconds
    max: 100, // max 100 requests per window
    customRules: {
      "/sign-in/email": {
        window: 60,
        max: 5, // strict brute-force prevention on sign-in
      },
      "/sign-up/email": {
        window: 60,
        max: 5, // strict abuse prevention on sign-up
      },
      "/forget-password": {
        window: 60,
        max: 3, // strict abuse prevention on password recovery
      },
      "/send-verification-email": {
        window: 60,
        max: 3, // rate limit verification resends
      },
    },
  },
  socialProviders: Object.keys(socialProviders).length > 0 ? socialProviders : undefined,
  plugins: [
    admin({
      defaultRole: "user",
      adminRole: "admin",
    }),
  ],
});

export type Auth = typeof auth;
