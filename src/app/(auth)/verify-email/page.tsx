"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthAlert } from "@/components/auth/auth-alert";
import { Mail, CheckCircle2, Loader2, ArrowRight } from "lucide-react";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const emailParam = searchParams.get("email");

  const [verifying, setVerifying] = useState(Boolean(token));
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Resend state
  const [emailInput, setEmailInput] = useState(emailParam || "");
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // Auto-verify if token is present
  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    async function verify() {
      try {
        setVerifying(true);
        setError(null);

        // Better Auth verification call
        const response = await authClient.verifyEmail({
          query: {
            token: token!,
          },
        });

        if (!isMounted) return;

        if (response.error) {
          setError(
            response.error.message ||
              "This verification link is invalid, malformed, or has expired."
          );
          setVerifying(false);
          return;
        }

        setVerified(true);
        setVerifying(false);
      } catch (err: unknown) {
        if (!isMounted) return;
        const msg = err instanceof Error ? err.message : "Verification failed.";
        setError(msg);
        setVerifying(false);
      }
    }

    verify();
    return () => {
      isMounted = false;
    };
  }, [token]);

  // Cooldown timer effect
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim() || cooldown > 0) return;

    setResending(true);
    setError(null);
    setResendSuccess(false);

    try {
      if (!authClient.sendVerificationEmail) {
        throw new Error("Email verification client is not available.");
      }

      const response = await authClient.sendVerificationEmail({
        email: emailInput.trim(),
        callbackURL: "/overview",
      });

      if (response.error) {
        setError(response.error.message || "Unable to resend verification email.");
      } else {
        setResendSuccess(true);
        setCooldown(60); // 60 seconds rate-limit cooldown
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to resend verification email.";
      setError(msg);
    } finally {
      setResending(false);
    }
  };

  // State 1: Verifying token in progress
  if (verifying) {
    return (
      <AuthCard title="Verifying your email" subtitle="Please wait while we confirm your account">
        <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#1FBF5B]" />
          <p className="text-[14px] text-[#8A8A94]">Verifying single-use token...</p>
        </div>
      </AuthCard>
    );
  }

  // State 2: Successfully verified
  if (verified) {
    return (
      <AuthCard
        title="Email Verified"
        subtitle="Your account is activated and ready to use"
        footer={
          <p>
            Welcome to Repoverse!{" "}
            <Link href="/overview" className="font-[500] text-[#1FBF5B] hover:underline">
              Go to Dashboard
            </Link>
          </p>
        }
      >
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#E6F8EA] text-[#22A646]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-[13.5px] leading-relaxed text-[#4B4B52]">
            Your email address has been confirmed. You now have full access to repository inspection, benchmarking, and autonomous agent runs.
          </p>
          <Link
            href="/overview"
            className="flex h-[40px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#1FBF5B] text-[14.5px] font-[500] text-white hover:bg-[#1AA34D] transition-colors shadow-[0_1px_2px_rgba(31,191,91,0.2)] mt-2"
          >
            <span>Continue to Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </AuthCard>
    );
  }

  // State 3: Pending verification or expired link, with resend option
  return (
    <AuthCard
      title={error ? "Verification Issue" : "Verify your email"}
      subtitle={
        error
          ? "The verification token could not be validated"
          : "We sent an activation link to your email"
      }
      footer={
        <p>
          Already verified?{" "}
          <Link href="/sign-in" className="font-[500] text-[#1FBF5B] hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <div className="space-y-4">
        {error ? (
          <AuthAlert type="error" message={error} />
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F4F4F6] text-[#1FBF5B]">
              <Mail className="h-6 w-6" />
            </div>
            {emailParam && (
              <p className="text-[14px] font-[500] text-[#111111]">
                {emailParam}
              </p>
            )}
            <p className="text-[13.5px] text-[#4B4B52] leading-relaxed max-w-[340px]">
              Click the link in the message to activate your account. If you do not see it, check your spam or junk folder.
            </p>
          </div>
        )}

        {resendSuccess && (
          <AuthAlert
            type="success"
            message="A new verification link has been sent to your email address."
          />
        )}

        <form onSubmit={handleResend} className="space-y-3 pt-2 border-t border-[#EBEBEF]">
          <p className="text-[13px] font-[500] text-[#111111]">
            Didn&apos;t receive the email?
          </p>

          {!emailParam && (
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Enter your email"
              className="flex h-[38px] w-full rounded-[8px] border border-[#EBEBEF] bg-white px-3 py-1.5 text-[14px] text-[#111111] placeholder:text-[#8A8A94] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors focus:border-[#1FBF5B] focus:outline-none focus:ring-1 focus:ring-[#1FBF5B]"
            />
          )}

          <button
            type="submit"
            disabled={resending || cooldown > 0}
            className="flex h-[38px] w-full items-center justify-center rounded-[8px] border border-[#EBEBEF] bg-white text-[13.5px] font-[500] text-[#111111] hover:bg-[#FAFAFB] hover:border-[#D8D8DE] transition-colors disabled:opacity-50"
          >
            {resending ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#8A8A94]" />
            ) : cooldown > 0 ? (
              `Resend available in ${cooldown}s`
            ) : (
              "Resend Verification Email"
            )}
          </button>
        </form>
      </div>
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="h-[400px] w-[400px] animate-pulse rounded-xl bg-white" />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
