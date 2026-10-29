"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordInput } from "@/components/auth/password-input";
import { AuthAlert } from "@/components/auth/auth-alert";
import { Loader2, CheckCircle2, ArrowRight } from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const urlError = searchParams.get("error");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(
    urlError ? "This password reset link is invalid or has expired." : null
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!token) {
      setError("Missing password reset token. Please request a new recovery link.");
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
      if (!authClient.resetPassword) {
        throw new Error("Reset password function not available");
      }
      const response = await authClient.resetPassword({
        newPassword: password,
        token,
      });

      if (response.error) {
        setError(
          response.error.message ||
            "Unable to reset password. The link may have expired or already been used."
        );
        setLoading(false);
        return;
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      setLoading(false);
      const msg = err instanceof Error ? err.message : "Failed to reset password.";
      setError(msg);
    }
  };

  if (!token && !isSuccess) {
    return (
      <AuthCard
        title="Invalid reset link"
        subtitle="The password recovery link is missing or malformed"
        footer={
          <Link href="/forgot-password" className="font-[500] text-(--brand) hover:underline">
            Request a new recovery link
          </Link>
        }
      >
        <div className="space-y-4">
          <AuthAlert
            type="error"
            message="No recovery token was found in the URL. Please use the link sent to your email or request a new one."
          />
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Create new password"
      subtitle="Enter and confirm your new secure account password"
      footer={
        <p>
          Remember your password?{" "}
          <Link href="/sign-in" className="font-[500] text-(--brand) hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      {isSuccess ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-(--success-bg) text-(--brand)">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <h3 className="text-[17px] font-[500] text-foreground">
            Password updated successfully
          </h3>
          <p className="text-[13.5px] leading-relaxed text-muted-foreground">
            Your password has been securely changed and prior sessions have been invalidated. You can now sign in with your new credentials.
          </p>
          <Link
            href="/sign-in"
            className="flex h-[40px] w-full items-center justify-center gap-2 rounded-[8px] bg-(--brand) text-[14.5px] font-[500] text-white hover:bg-[#76B900]/90 transition-colors shadow-[0_1px_2px_rgba(31,191,91,0.2)] mt-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <AuthAlert type="error" message={error} />}

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-[13.5px] font-[500] text-foreground"
            >
              New Password
            </label>
            <PasswordInput
              id="password"
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 8 characters"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="confirmPassword"
              className="block text-[13.5px] font-[500] text-foreground"
            >
              Confirm New Password
            </label>
            <PasswordInput
              id="confirmPassword"
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
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
              "Save New Password"
            )}
          </button>
        </form>
      )}
    </AuthCard>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="h-[400px] w-[400px] animate-pulse rounded-xl bg-card" />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
