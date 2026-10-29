import type { Metadata } from 'next'
import {
  Inter,
  Geist_Mono,
} from 'next/font/google'
import './globals.css'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppProviders } from '@/components/providers'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  icons: { icon: '/favicon.ico' },
  title: 'RepoPilot — AI Repository Debugging Agent',
  description:
    'Autonomous engineering agent powered by NVIDIA Nemotron via Nebius Token Factory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProviders>
            <TooltipProvider>{children}</TooltipProvider>
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  )
}
