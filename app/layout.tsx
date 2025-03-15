import "./globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import { UIRegistry } from "@/components/ui/registry"

export const metadata = {
  title: "Supercivilization",
  description: "Avolve from Degen into Regen as a Superachiever with Superacheivers",
  icons: {
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon%20supercivilization-fnBk5MHqSUdgZKz1BGz9ou1lBkTsHA.svg",
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        GeistSans.variable,
        GeistMono.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UIRegistry>
            <div className="relative flex min-h-screen flex-col">
              <main className="flex-1">
                {children}
              </main>
              <ThemeToggle />
              <Toaster />
            </div>
            <Analytics />
          </UIRegistry>
        </ThemeProvider>
      </body>
    </html>
  )
}