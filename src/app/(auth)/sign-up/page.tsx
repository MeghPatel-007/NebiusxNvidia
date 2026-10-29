"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signUp } from "@/lib/auth-client";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { OAuthButtons } from "@/components/auth/oauth-buttons";
import { AuthAlert } from "@/components/auth/auth-alert";
import { checkPasswordStrength, isValidRedirectUrl } from "@/lib/auth-utils";
import { Loader2, Check, X } from "lucide-react";

function SignUpForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawRedirect = searchParams.get("redirect") || searchParams.get("callbackURL");
  const callbackURL = isValidRedirectUrl(rawRedirect) ? rawRedirect! : "/overview";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const strength = checkPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please provide your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password.length > 128) {
      setError("Password cannot exceed 128 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL,
      });

      if (response.error) {
        setError(response.error.message || "Could not complete registration.");
        setLoading(false);
        return;
      }

      // Success -> Navigate to verify email
      router.push(`/verify-email?email=${encodeURIComponent(email.trim())}`);
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(msg);
    }
  };

  return (
    <AuthCard
      title="Create an account"
      subtitle="Start debugging and optimizing repositories with AI agents"
      footer={
        <p>
          Already have an account?{" "}
          <Link
            href={`/sign-in${rawRedirect ? `?redirect=${encodeURIComponent(rawRedirect)}` : ""}`}
            className="font-[500] text-(--brand) hover:underline"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <AuthAlert type="error" message={error} />}

        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="block text-[13.5px] font-[500] text-foreground"
          >
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className="flex h-[38px] w-full rounded-[8px] border border-border bg-card px-3 py-1.5 text-[14px] text-foreground placeholder:text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors focus:border-[#76B900] focus:outline-none focus:ring-1 focus:ring-[#76B900]"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="block text-[13.5px] font-[500] text-foreground"
          >
            Work Email
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className="flex h-[38px] w-full rounded-[8px] border border-border bg-card px-3 py-1.5 text-[14px] text-foreground placeholder:text-muted-foreground shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors focus:border-[#76B900] focus:outline-none focus:ring-1 focus:ring-[#76B900]"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="block text-[13.5px] font-[500] text-foreground"
          >
            Password
          </label>
          <PasswordInput
            id="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Minimum 8 characters"
          />

          {password.length > 0 && (
            <div className="mt-2 space-y-1 rounded-[8px] bg-(--neutral-pill-bg) p-2.5 text-[12px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                {strength.minLength ? (
                  <Check className="h-3.5 w-3.5 text-(--brand)" />
                ) : (
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-1.5">
                {strength.hasLowercase && strength.hasUppercase ? (
                  <Check className="h-3.5 w-3.5 text-(--brand)" />
                ) : (
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span>Uppercase and lowercase letters</span>
              </div>
              <div className="flex items-center gap-1.5">
                {strength.hasNumber || strength.hasSymbol ? (
                  <Check className="h-3.5 w-3.5 text-(--brand)" />
                ) : (
                  <X className="h-3.5 w-3.5 text-muted-foreground" />
                )}
                <span>At least one number or special symbol</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="block text-[13.5px] font-[500] text-foreground"
          >
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            error={
              confirmPassword && password !== confirmPassword
                ? "Passwords do not match"
                : undefined
            }
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-(--brand) text-[14.5px] font-[500] text-white hover:bg-[#76B900]/90 transition-colors disabled:opacity-60 shadow-[0_1px_2px_rgba(31,191,91,0.2)]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-white" />
          ) : (
            "Create Account"
          )}
        </button>

        <OAuthButtons callbackURL={callbackURL} onError={(msg) => setError(msg)} />
      </form>
    </AuthCard>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="h-[400px] w-[400px] animate-pulse rounded-xl bg-card" />}>
      <SignUpForm />
    </Suspense>
  );
}
