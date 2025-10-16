import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { QueryProvider } from "@/lib/query/query-provider"
import { SUPERCIVILIZATION_SCHEMA_GRAPH } from "@/lib/schema/supercivilization-schema"

// Initialize the Inter font
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://supercivilization.xyz"),
  title: {
    default: "Supercivilization | Vivify Further, Unify Faster, Thrive Forever",
    template: "%s | Supercivilization",
  },
  description:
    "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
  applicationName: "Supercivilization",
  authors: [
    {
      name: "Joshua Seymour",
      url: "https://joshuaseymour.com",
    },
  ],
  creator: "Joshua Seymour",
  publisher: "Supercivilization",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "Next.js 15",
  keywords: [
    "supercivilization",
    "superachiever",
    "superhuman enhancement",
    "supersociety",
    "supergenius",
    "personal development",
    "collective advancement",
    "ecosystem development",
    "avolve.io",
    "network state",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://supercivilization.xyz",
    siteName: "Supercivilization",
    title: "Supercivilization | Vivify Further, Unify Faster, Thrive Forever",
    description:
      "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
    images: [
      {
        url: "https://supercivilization.xyz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Supercivilization - Vivify Further, Unify Faster, Thrive Forever",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@supercivilizing",
    creator: "@joshuaseymour",
    title: "Supercivilization | Vivify Further, Unify Faster, Thrive Forever",
    description:
      "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
    images: {
      url: "https://supercivilization.xyz/og-image.png",
      alt: "Supercivilization - Vivify Further, Unify Faster, Thrive Forever",
    },
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://supercivilization.xyz",
    languages: {
      "en-US": "https://supercivilization.xyz",
    },
  },
  category: "Technology",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SUPERCIVILIZATION_SCHEMA_GRAPH) }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
