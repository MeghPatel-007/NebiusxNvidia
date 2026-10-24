import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [adminClient()],
});

export const {
  signIn,
  signOut,
  signUp,
  useSession,
} = authClient;

type AuthClientExtended = typeof authClient & {
  forgetPassword?: (options: { email: string; redirectTo?: string }) => Promise<{ error?: { message?: string } | null }>;
  resetPassword?: (options: { newPassword: string; token: string }) => Promise<{ error?: { message?: string } | null }>;
  sendVerificationEmail?: (options: { email: string; callbackURL?: string }) => Promise<{ error?: { message?: string } | null }>;
};

const extendedClient = authClient as unknown as AuthClientExtended;

export const forgetPassword = extendedClient.forgetPassword;
export const resetPassword = extendedClient.resetPassword;
export const sendVerificationEmail = extendedClient.sendVerificationEmail;


