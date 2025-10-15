import type React from "react"
import type { Metadata } from "next"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/toaster"
import { QueryProvider } from "@/lib/query/query-provider"

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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://supercivilization.xyz/#organization",
      name: "Supercivilization",
      legalName: "Supercivilization",
      url: "https://supercivilization.xyz",
      logo: {
        "@type": "ImageObject",
        "@id": "https://supercivilization.xyz/#logo",
        url: "https://supercivilization.xyz/logo.png",
        encodingFormat: "image/png",
        caption: "Supercivilization Logo",
        width: 512,
        height: 512,
      },
      image: {
        "@type": "ImageObject",
        "@id": "https://supercivilization.xyz/#logo",
      },
      description:
        "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem. Launching January 1, 2026.",
      slogan: "Vivify Further, Unify Faster, Thrive Forever",
      foundingDate: "2026-01-01",
      foundingLocation: {
        "@type": "Place",
        name: "San Miguel de Allende, Guanajuato, Mexico",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Miguel de Allende",
        addressRegion: "Guanajuato",
        addressCountry: "MX",
      },
      email: "admin@supercivilization.xyz",
      founder: {
        "@type": "Person",
        "@id": "https://joshuaseymour.com/#person",
        name: "Joshua Seymour",
        url: "https://joshuaseymour.com",
        image: "https://joshuaseymour.com/profile.png",
      },
      sameAs: [
        "https://www.tiktok.com/@supercivilization",
        "https://www.youtube.com/@supercivilization",
        "https://x.com/supercivilizing",
        "https://www.instagram.com/supercivilizing/",
        "https://luma.com/supercivilization",
        "https://supercivilization.substack.com/",
        "https://github.com/supercivilization",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "admin@supercivilization.xyz",
        contactType: "Customer Support",
        availableLanguage: "English",
      },
      owns: {
        "@type": "SoftwareApplication",
        "@id": "https://avolve.io/#softwareapplication",
      },
      publishingPrinciples: "https://supercivilization.xyz/principles",
      knowsAbout: [
        "Individual Achievement",
        "Collective Advancement",
        "Ecosystem Development",
        "Superhuman Enhancement",
        "Supersociety Advancement",
        "Supergenius Breakthroughs",
        "Personal Success",
        "Business Success",
        "Supermind Superpowers",
        "Entrepreneurship",
        "Technology",
        "Social Innovation",
      ],
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      makesOffer: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Individual Superachiever Development",
            description:
              "Superhuman Enhancements via Academies, Universities, and Institutes supporting personal success in Health, Wealth, and Peace",
            category: "Education & Personal Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Collective of Superachievers Development",
            description:
              "Supersociety Advancements via Companies, Communities, and Countries supporting business success",
            category: "Business & Social Innovation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Supercivilization Ecosystem Development",
            description:
              "Supergenius Breakthroughs via Ventures, Enterprises, and Industries developing growth engines",
            category: "Innovation & Investment",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            "@id": "https://avolve.io/#softwareapplication",
            name: "Avolve.io Platform",
            url: "https://avolve.io",
          },
          price: "0",
          priceCurrency: "USD",
        },
      ],
      department: [
        {
          "@type": "Organization",
          name: "Superhuman Academy",
          description: "Support child development ages 0 to 12",
        },
        {
          "@type": "Organization",
          name: "Superhuman University",
          description: "Support youth development ages 12 to 25",
        },
        {
          "@type": "Organization",
          name: "Superhuman Institute",
          description: "Support adult development ages 25+",
        },
      ],
      parentOrganization: {
        "@type": "Person",
        "@id": "https://joshuaseymour.com/#person",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://supercivilization.xyz/#webpage",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://supercivilization.xyz/#website",
      url: "https://supercivilization.xyz",
      name: "Supercivilization",
      description:
        "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
      inLanguage: "en-US",
      publisher: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
      copyrightHolder: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
      copyrightYear: "2026",
      creator: {
        "@type": "Person",
        "@id": "https://joshuaseymour.com/#person",
      },
      mainEntity: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://supercivilization.xyz/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
      about: [
        {
          "@type": "Thing",
          name: "Superhuman Enhancements",
          description:
            "Individual superachiever development through learning, applying, and teaching",
        },
        {
          "@type": "Thing",
          name: "Supersociety Advancements",
          description:
            "Collective of superachievers development through personalizing, globalizing, and localizing",
        },
        {
          "@type": "Thing",
          name: "Supergenius Breakthroughs",
          description:
            "Supercivilization ecosystem development through creating, evolving, and managing",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://supercivilization.xyz/#webpage",
      url: "https://supercivilization.xyz",
      name: "Supercivilization | Vivify Further, Unify Faster, Thrive Forever",
      description:
        "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://supercivilization.xyz/#website",
      },
      about: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id": "https://supercivilization.xyz/#logo",
      },
      datePublished: "2026-01-01",
      dateModified: "2025-10-05",
      inLanguage: "en-US",
      breadcrumb: {
        "@type": "BreadcrumbList",
        "@id": "https://supercivilization.xyz/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://supercivilization.xyz",
          },
        ],
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://avolve.io/#application",
      name: "Avolve.io Platform",
      url: "https://avolve.io",
      description:
        "A knowledge graph for the modern web stack. Get verified compatibility patterns for Next.js 15, React 19, Vercel AI, Supabase auth, shadcn/ui, and more.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      creator: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
      author: {
        "@type": "Person",
        "@id": "https://joshuaseymour.com/#person",
      },
      sourceOrganization: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
    },
  ],
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
