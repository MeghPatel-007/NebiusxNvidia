import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protected application routes
const protectedPrefixes = [
  "/overview",
  "/repositories",
  "/runs",
  "/settings",
  "/models",
  "/benchmarks",
];

// Auth routes where authenticated users should be redirected to dashboard
const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forgot-password",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for Better Auth session cookie (standard or HTTPS secure prefix)
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("__Secure-better-auth.session_token");

  const isAuthenticated = Boolean(sessionCookie?.value);

  // If accessing a protected route without a session cookie, redirect to sign-in
  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !isAuthenticated) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackURL", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // If accessing auth routes while already holding an active session cookie, redirect to overview
  const isAuthRoute = authRoutes.includes(pathname);
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/overview/:path*",
    "/repositories/:path*",
    "/runs/:path*",
    "/settings/:path*",
    "/models/:path*",
    "/benchmarks/:path*",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
    "/reset-password",
  ],
};
