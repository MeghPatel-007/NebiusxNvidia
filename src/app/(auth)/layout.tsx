import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-foreground">
      <main className="flex w-full flex-col items-center justify-center">
        {children}
      </main>
      <footer className="mt-8 text-center text-[12px] text-muted-foreground/70">
        <p>© 2026 RepoPilot. All rights reserved.</p>
      </footer>
    </div>
  );
}
