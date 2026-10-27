"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { cn } from "cn"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { LiquidGlass } from "@/components/ui/liquid-glass"
import { ModeToggle } from "@/components/mode-toggle"

interface NavbarDarkShadowProps {
  className?: string
  brandName?: string
  logoIcon?: React.ReactNode
}

const navItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
]

export function NavbarDarkShadow({
  className,
  brandName = "RepoPilot",
  logoIcon,
}: NavbarDarkShadowProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [visible, setVisible] = React.useState(true)
  const lastScrollYRef = React.useRef(0)
  const { scrollY } = useScroll()

  // Hide navbar when scrolling down, stick & reveal when scrolling up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollYRef.current
    const diff = latest - previous

    if (mobileMenuOpen) {
      setVisible(true)
      return
    }

    if (latest <= 30) {
      // Near top of the page: stick at initial position
      setVisible(true)
    } else if (diff > 6) {
      // Scrolling down: navbar slides up out of view
      setVisible(false)
    } else if (diff < -6) {
      // Scrolling up: navbar slides in and sticks
      setVisible(true)
    }

    lastScrollYRef.current = latest
  })

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: visible ? 0 : -90,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        duration: 0.25,
        ease: "easeInOut",
      }}
      className={cn(
        "fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none",
        className
      )}
    >
      <div className="pointer-events-auto relative w-full max-w-5xl">
        <LiquidGlass
          radius={20}
          bevelDepth={12}
          scale={36}
          frost={0.5}
          tint={0.12}
          className="border border-black/10 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_1px_1px_rgba(255,255,255,0.6)_inset] dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_1px_1px_rgba(255,255,255,0.08)_inset]"
          style={{ backgroundColor: "var(--nav-glass)" }}
          contentClassName="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5 w-full"
        >
          {/* Brand / Logo */}
          <div className="flex items-center gap-2.5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex size-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700/60 text-white shadow-inner transition-transform group-hover:scale-105">
                {logoIcon ?? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/favicon.ico" alt="RepoPilot logo" className="size-5 object-contain" />
                )}
              </div>
              <span className="font-semibold text-zinc-950 tracking-tight text-sm sm:text-base dark:text-zinc-50">
                {brandName}
              </span>
            </Link>
          </div>

          {/* Center Desktop Navigation Menu */}
          <div className="hidden md:flex items-center justify-center">
            <NavigationMenu
              align="center"
              popupClassName="bg-white/95 border border-zinc-200 text-zinc-900 shadow-[0_16px_36px_rgba(0,0,0,0.15)] rounded-2xl backdrop-blur-xl p-3 dark:bg-neutral-900/95 dark:border-white/10 dark:text-zinc-100"
            >
              <NavigationMenuList className="flex items-center gap-0.5">
                {navItems.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      render={
                        <Link
                          href={item.href}
                          className="text-zinc-600 hover:text-zinc-950 bg-transparent hover:bg-black/5 text-sm font-medium px-3 py-1.5 h-8 rounded-lg transition-colors inline-flex items-center dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
                        >
                          {item.label}
                        </Link>
                      }
                    />
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <ModeToggle />
            <Link
              href="/sign-in"
              className="text-zinc-600 hover:text-zinc-950 text-sm font-medium px-3 py-1.5 transition-colors dark:text-zinc-400 dark:hover:text-white"
            >
              Sign in
            </Link>
            <Button
              render={<Link href="/sign-up" />}
              className="h-8 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-3.5 text-xs font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.18)] transition-all active:scale-[0.98] dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
            >
              Connect GitHub
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-1.5">
            <ModeToggle />
            <Button
              render={<Link href="/sign-up" />}
              size="xs"
              className="h-7 rounded-lg bg-primary text-primary-foreground font-medium px-2.5 text-xs hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
            >
              Connect GitHub
            </Button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex size-8 items-center justify-center rounded-lg text-zinc-600 hover:text-zinc-950 hover:bg-black/5 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/10"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </LiquidGlass>

        {/* Mobile Menu Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-black/10 bg-white/95 p-4 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-neutral-900/95">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-black/5 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-zinc-200 flex items-center justify-between dark:border-white/10">
                <Link
                  href="/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                >
                  Sign in
                </Link>
                <Button
                  render={<Link href="/sign-up" />}
                  size="sm"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
                >
                  Connect GitHub
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </motion.header>
  )
}
