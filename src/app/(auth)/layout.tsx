import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAFAFA] p-4 text-[#111111]">
      <main className="flex w-full flex-col items-center justify-center">
        {children}
      </main>
      <footer className="mt-8 text-center text-[12px] text-[#9A9AA3]">
        <p>© 2026 Repoverse. All rights reserved.</p>
      </footer>
    </div>
  );
}
