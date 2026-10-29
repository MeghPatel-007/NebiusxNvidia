"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { AuthAlert } from "@/components/auth/auth-alert";
import { isValidRedirectUrl } from "@/lib/auth-utils";
import { Loader2 } from "lucide-react";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("callbackURL") || searchParams.get("redirect");
  const callbackURL = isValidRedirectUrl(rawRedirect) ? rawRedirect! : "/overview";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in both your email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await signIn.email({
        email: email.trim(),
        password,
        rememberMe,
      });

      if (response.error) {
        if (response.error.status === 403 && response.error.message?.toLowerCase().includes("verify")) {
          router.push(`/verify-email?email=${encodeURIComponent(email)}`);
          return;
        }
        setError(response.error.message || "Invalid email or password.");
        setLoading(false);
        return;
      }

      router.push(callbackURL);
      router.refresh();
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to your RepoPilot engineering dashboard"
      footer={
        <p>
          Don&apos;t have an account?{" "}
          <Link
            href={`/sign-up${rawRedirect ? `?redirect=${encodeURIComponent(rawRedirect)}` : ""}`}
            className="font-[500] text-(--brand) hover:underline"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <AuthAlert type="error" message={error} />}

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-[13.5px] font-[500] text-foreground"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            className="flex h-[38px] w-full rounded-[8px] border border-border bg-card px-3 py-1.5 text-[14px] text-foreground placeholder:text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors focus:border-[#76B900] focus:outline-none focus:ring-1 focus:ring-[#76B900]"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-[13.5px] font-[500] text-foreground"
            >
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-[12.5px] font-[400] text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-[13.5px] text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-border text-(--brand) focus:ring-[#76B900]"
            />
            <span>Remember this device</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-(--brand) text-[14.5px] font-[500] text-white hover:bg-[#76B900]/90 transition-colors disabled:opacity-60 shadow-[0_1px_2px_rgba(31,191,91,0.2)]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-white" />
          ) : (
            "Sign In"
          )}
        </button>

        <OAuthButtons callbackURL={callbackURL} onError={(msg) => setError(msg)} />
      </form>
    </AuthCard>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="h-[400px] w-[400px] animate-pulse rounded-xl bg-card" />}>
      <SignInForm />
    </Suspense>
  );
}
