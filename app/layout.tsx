import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import ThemeToggle from "@/components/theme-toggle"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

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
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ThemeToggle />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}