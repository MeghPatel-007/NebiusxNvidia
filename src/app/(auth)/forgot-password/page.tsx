"use client";

import React, { useState } from "react";
import Link from "next/link";
import { forgetPassword } from "@/lib/auth-client";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthAlert } from "@/components/auth/auth-alert";
import { Loader2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await forgetPassword({
        email: email.trim(),
        redirectTo: "/reset-password",
      });

      if (response.error) {
        // Generic response on error to prevent email enumeration attacks
        console.error("Password reset request error:", response.error);
      }

      setSubmitted(true);
    } catch (err: unknown) {
      console.error("Password reset unexpected failure:", err);
      // Still show submitted to prevent enumeration
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we'll send a secure password recovery link"
      footer={
        <Link
          href="/sign-in"
          className="inline-flex items-center gap-1.5 font-[500] text-[#111111] hover:text-[#1FBF5B] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to sign in</span>
        </Link>
      }
    >
      {submitted ? (
        <div className="space-y-4">
          <AuthAlert
            type="success"
            message="If an account exists with that email address, a password recovery link has been sent. Please check your inbox and spam folders."
          />
          <p className="text-[13.5px] leading-relaxed text-[#4B4B52]">
            The reset link will expire shortly for security. If you don&apos;t receive it within a few minutes, verify your email was entered correctly or check your spam folder.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="w-full text-center text-[13.5px] text-[#1FBF5B] hover:underline pt-2"
          >
            Try another email address
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <AuthAlert type="error" message={error} />}

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-[13.5px] font-[500] text-[#111111]"
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
              className="flex h-[38px] w-full rounded-[8px] border border-[#EBEBEF] bg-white px-3 py-1.5 text-[14px] text-[#111111] placeholder:text-[#8A8A94] shadow-[0_1px_2px_rgba(0,0,0,0.02)] transition-colors focus:border-[#1FBF5B] focus:outline-none focus:ring-1 focus:ring-[#1FBF5B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-[40px] w-full items-center justify-center rounded-[8px] bg-[#1FBF5B] text-[14.5px] font-[500] text-white hover:bg-[#1AA34D] transition-colors disabled:opacity-60 shadow-[0_1px_2px_rgba(31,191,91,0.2)]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin text-white" />
            ) : (
              "Send Recovery Link"
            )}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
