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
  title: "Supercivilization | Vivify Further, Unify Faster, Thrive Forever",
  description: "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
  generator: 'Next.js 15',
  authors: [{ name: 'Joshua Seymour', url: 'https://www.joshuaseymour.com' }],
  creator: 'Joshua Seymour',
  publisher: 'Supercivilization',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.supercivilization.xyz',
    siteName: 'Supercivilization',
    title: 'Supercivilization | Vivify Further, Unify Faster, Thrive Forever',
    description: 'We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@supercivilizing',
    creator: '@joshuaseymour',
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.supercivilization.xyz/#organization",
      "name": "Supercivilization",
      "legalName": "Supercivilization",
      "url": "https://www.supercivilization.xyz/",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.supercivilization.xyz/#logo",
        "url": "https://www.supercivilization.xyz/logo.png",
        "contentUrl": "https://www.supercivilization.xyz/logo.svg",
        "caption": "Supercivilization Logo",
        "width": "512",
        "height": "512"
      },
      "image": {
        "@type": "ImageObject",
        "@id": "https://www.supercivilization.xyz/#logo"
      },
      "description": "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
      "slogan": "Vivify Further, Unify Faster, Thrive Forever",
      "foundingDate": "2026-01-01",
      "foundingLocation": {
        "@type": "Place",
        "name": "San Miguel de Allende, Guanajuato, Mexico"
      },
      "email": "admin@supercivilization.xyz",
      "founder": {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person",
        "name": "Joshua Seymour",
        "url": "https://www.joshuaseymour.com/",
        "image": "https://joshuaseymour.com/profile.png"
      },
      "sameAs": [
        "https://www.tiktok.com/@supercivilization",
        "https://www.youtube.com/@supercivilization",
        "https://x.com/supercivilizing",
        "https://www.instagram.com/supercivilizing/",
        "https://luma.com/supercivilization",
        "https://supercivilization.substack.com/",
        "https://github.com/supercivilization"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "admin@supercivilization.xyz",
        "contactType": "Customer Support",
        "availableLanguage": "English"
      },
      "owns": [
        {
          "@type": "WebSite",
          "@id": "https://avolve.io/#website",
          "name": "Avolve.io",
          "url": "https://avolve.io"
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://avolve.io/#application",
          "name": "Avolve.io Platform",
          "url": "https://avolve.io"
        }
      ],
      "publishingPrinciples": "https://www.supercivilization.xyz/principles",
      "knowsAbout": [
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
        "Social Innovation"
      ],
      "areaServed": {
        "@type": "Place",
        "name": "Worldwide"
      },
      "makesOffer": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Individual Superachiever Development",
            "description": "Superhuman Enhancements via Academies, Universities, and Institutes supporting personal success in Health, Wealth, and Peace",
            "category": "Education & Personal Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Collective of Superachievers Development",
            "description": "Supersociety Advancements via Companies, Communities, and Countries supporting business success",
            "category": "Business & Social Innovation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Supercivilization Ecosystem Development",
            "description": "Supergenius Breakthroughs via Ventures, Enterprises, and Industries developing growth engines",
            "category": "Innovation & Investment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "SoftwareApplication",
            "@id": "https://avolve.io/#application",
            "name": "Avolve.io Platform",
            "url": "https://avolve.io"
          },
          "price": "0",
          "priceCurrency": "USD"
        }
      ],
      "department": [
        {
          "@type": "Organization",
          "name": "Superhuman Academy",
          "description": "Support child development ages 0 to 12"
        },
        {
          "@type": "Organization",
          "name": "Superhuman University",
          "description": "Support youth development ages 12 to 25"
        },
        {
          "@type": "Organization",
          "name": "Superhuman Institute",
          "description": "Support adult development ages 25+"
        }
      ],
      "parentOrganization": {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://www.supercivilization.xyz/#webpage"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.supercivilization.xyz/#website",
      "url": "https://www.supercivilization.xyz/",
      "name": "Supercivilization",
      "description": "Humanly vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
      "inLanguage": "en-US",
      "publisher": {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization"
      },
      "copyrightHolder": {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization"
      },
      "copyrightYear": "2026",
      "creator": {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person"
      },
      "mainEntity": {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization"
      },
      "about": [
        {
          "@type": "Thing",
          "name": "Superhuman Enhancements",
          "description": "Individual superachiever development through learning, applying, and teaching"
        },
        {
          "@type": "Thing",
          "name": "Supersociety Advancements",
          "description": "Collective of superachievers development through personalizing, globalizing, and localizing"
        },
        {
          "@type": "Thing",
          "name": "Supergenius Breakthroughs",
          "description": "Supercivilization ecosystem development through creating, evolving, and managing"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.supercivilization.xyz/#webpage",
      "url": "https://www.supercivilization.xyz/",
      "name": "Supercivilization | Vivify Further, Unify Faster, Thrive Forever",
      "description": "Humanly vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem.",
      "isPartOf": {
        "@type": "WebSite",
        "@id": "https://www.supercivilization.xyz/#website"
      },
      "about": {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization"
      },
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "@id": "https://www.supercivilization.xyz/#logo"
      },
      "datePublished": "2026-01-01",
      "dateModified": "2025-10-04",
      "inLanguage": "en-US"
    },
    {
      "@type": "Person",
      "@id": "https://www.joshuaseymour.com/#person",
      "name": "Joshua Seymour",
      "url": "https://www.joshuaseymour.com/",
      "image": "https://joshuaseymour.com/profile.png",
      "jobTitle": "Founder",
      "worksFor": {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization"
      },
      "founder": {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization"
      }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://avolve.io/#application",
      "name": "Avolve.io Platform",
      "url": "https://avolve.io",
      "creator": {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization"
      },
      "author": {
        "@type": "Person",
        "@id": "https://www.joshuaseymour.com/#person"
      },
      "sourceOrganization": {
        "@type": "Organization",
        "@id": "https://www.supercivilization.xyz/#organization"
      }
    }
  ]
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