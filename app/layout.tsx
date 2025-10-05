import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata = {
  title: "Supercivilization",
  description: "Join a parallel society built on genius.",
  generator: 'v0.dev',
  authors: [{ name: 'Joshua Seymour', url: 'https://www.joshuaseymour.com' }],
  creator: 'Joshua Seymour',
  publisher: 'Supercivilization',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.supercivilization.xyz',
    siteName: 'Supercivilization',
    title: 'Supercivilization',
    description: 'Join a parallel society built on genius.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@supercivilizing',
    creator: '@joshuaseymour',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Supercivilization',
  url: 'https://www.supercivilization.xyz',
  logo: 'https://www.supercivilization.xyz/logo.svg',
  sameAs: [
    'https://github.com/supercivilization',
    'https://x.com/supercivilizing',
    'https://www.tiktok.com/@supercivilization',
    'https://www.youtube.com/@supercivilization',
  ],
  founder: {
    '@type': 'Person',
    name: 'Joshua Seymour',
    url: 'https://www.joshuaseymour.com',
    sameAs: [
      'https://x.com/joshuaseymour',
    ],
  },
  description: 'Join a parallel society built on genius.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}