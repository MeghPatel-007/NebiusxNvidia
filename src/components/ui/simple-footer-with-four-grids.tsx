import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterLink {
  title: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SimpleFooterWithFourGridsProps {
  brandName?: string;
  brandHref?: string;
  logoSrc?: string;
  copyrightText?: string;
  columns?: FooterColumn[];
  watermarkText?: string;
  className?: string;
}

export const defaultFooterColumns: FooterColumn[] = [
  {
    title: "Pages",
    links: [
      { title: "About", href: "/#about" },
      { title: "Features", href: "/#features" },
      { title: "FAQ", href: "/#faq" },
      { title: "Contact", href: "/#contact" },
      { title: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Socials",
    links: [
      { title: "Facebook", href: "#" },
      { title: "Instagram", href: "#" },
      { title: "Twitter", href: "#" },
      { title: "LinkedIn", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy Policy", href: "#" },
      { title: "Terms of Service", href: "#" },
      { title: "Cookie Policy", href: "#" },
    ],
  },
  {
    title: "Register",
    links: [
      { title: "Sign Up", href: "#" },
      { title: "Login", href: "#" },
      { title: "Forgot Password", href: "#" },
    ],
  },
];

export function SimpleFooterWithFourGrids({
  brandName = "RepoPilot",
  brandHref = "/",
  logoSrc = "/favicon.ico",
  copyrightText = "© copyright RepoPilot 2026. All rights reserved.",
  columns = defaultFooterColumns,
  watermarkText = "RepoPilot",
  className,
}: SimpleFooterWithFourGridsProps) {
  return (
    <footer
      className={cn(
        "relative w-full overflow-hidden border-t border-neutral-100 bg-white px-8 py-20 dark:border-white/[0.1] dark:bg-neutral-950",
        className
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row md:px-8">
        <div>
          <div className="mr-0 mb-4 md:mr-4 md:flex">
            <Link
              href={brandHref}
              className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
            >
              {logoSrc && (
                <img
                  src={logoSrc}
                  alt={`${brandName} logo`}
                  width={30}
                  height={30}
                  className="size-[30px] object-contain"
                />
              )}
              <span className="font-medium text-black dark:text-white">
                {brandName}
              </span>
            </Link>
          </div>
          <div className="mt-2 ml-2 text-neutral-500 dark:text-neutral-400">
            {copyrightText}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 items-start gap-10 sm:mt-0 md:mt-0 lg:grid-cols-4">
          {columns.map((column) => (
            <div
              key={column.title}
              className="flex w-full flex-col justify-center space-y-4"
            >
              <p className="font-bold text-neutral-600 transition-colors hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white">
                {column.title}
              </p>
              <ul className="list-none space-y-4 text-neutral-600 transition-colors dark:text-neutral-300">
                {column.links.map((link) => (
                  <li key={link.title} className="list-none">
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-neutral-800 dark:hover:text-white"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {watermarkText && (
        <p className="inset-x-0 mt-20 select-none bg-gradient-to-b from-neutral-50 to-neutral-200 bg-clip-text text-center text-5xl font-bold text-transparent md:text-9xl lg:text-[12rem] xl:text-[13rem] dark:from-neutral-950 dark:to-neutral-800">
          {watermarkText}
        </p>
      )}
    </footer>
  );
}

export default SimpleFooterWithFourGrids;
