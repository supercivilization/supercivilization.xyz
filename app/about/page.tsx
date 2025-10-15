import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Supercivilization, our mission to help you vivify further, unify faster, and thrive forever in the supercivilization ecosystem.",
  openGraph: {
    title: "About Supercivilization",
    description:
      "Learn about our mission to help you vivify further, unify faster, and thrive forever.",
    url: "https://supercivilization.xyz/about",
  },
  alternates: {
    canonical: "https://supercivilization.xyz/about",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://supercivilization.xyz/about#webpage",
      url: "https://supercivilization.xyz/about",
      name: "About Supercivilization",
      description:
        "Learn about Supercivilization, our mission to help you vivify further, unify faster, and thrive forever in the supercivilization ecosystem.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://supercivilization.xyz/#website",
      },
      about: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
      mainEntity: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        "@id": "https://supercivilization.xyz/about#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://supercivilization.xyz",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: "https://supercivilization.xyz/about",
          },
        ],
      },
      inLanguage: "en-US",
      datePublished: "2025-10-11",
      dateModified: "2025-10-11",
    },
    {
      "@type": "Organization",
      "@id": "https://supercivilization.xyz/#organization",
      name: "Supercivilization",
      description:
        "We help you vivify further as an individual superachiever, unify faster as a collective of superachievers, and thrive forever in the supercivilization ecosystem. Launching January 1, 2026.",
      founder: {
        "@type": "Person",
        "@id": "https://joshuaseymour.com/#person",
      },
      foundingDate: "2026-01-01",
      mission:
        "To empower individuals to reach their superhuman potential, unite superachievers into thriving collectives, and build an ecosystem where innovation and human advancement flourish forever.",
      slogan: "Vivify Further, Unify Faster, Thrive Forever",
      knowsAbout: [
        "Individual Achievement",
        "Collective Advancement",
        "Ecosystem Development",
        "Superhuman Enhancement",
        "Supersociety Advancement",
        "Supergenius Breakthroughs",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://joshuaseymour.com/#person",
      name: "Joshua Seymour",
      url: "https://joshuaseymour.com",
      image: "https://joshuaseymour.com/profile.png",
      jobTitle: "Founder",
      worksFor: {
        "@type": "Organization",
        "@id": "https://supercivilization.xyz/#organization",
      },
    },
  ],
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About Supercivilization
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vivify Further, Unify Faster, Thrive Forever
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>Empowering human potential at every scale</CardDescription>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                We help you <strong>vivify further</strong> as an individual superachiever,{" "}
                <strong>unify faster</strong> as a collective of superachievers, and{" "}
                <strong>thrive forever</strong> in the supercivilization ecosystem.
              </p>
              <p>
                Our mission is to empower individuals to reach their superhuman potential, unite
                superachievers into thriving collectives, and build an ecosystem where innovation
                and human advancement flourish forever.
              </p>
            </CardContent>
          </Card>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🚀 Individual Superachievers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Superhuman Enhancements via Academies, Universities, and Institutes supporting
                  personal success in Health, Wealth, and Peace.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🤝 Collective of Superachievers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supersociety Advancements via Companies, Communities, and Countries supporting
                  business success.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">🌟 Supercivilization Ecosystem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Supergenius Breakthroughs via Ventures, Enterprises, and Industries developing
                  growth engines.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Founder Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Founded by Joshua Seymour</CardTitle>
              <CardDescription>Visionary entrepreneur and technologist</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://joshuaseymour.com/profile.png" alt="Joshua Seymour" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    Joshua Seymour is the founder of Supercivilization, dedicated to building
                    platforms and ecosystems that unlock human potential at scale.
                  </p>
                  <a
                    href="https://joshuaseymour.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Visit joshuaseymour.com →
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Our Departments */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Our Departments</CardTitle>
              <CardDescription>
                Supporting development across all stages of life
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold mb-1">Superhuman Academy</h3>
                  <p className="text-sm text-muted-foreground">
                    Support child development ages 0 to 12
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold mb-1">Superhuman University</h3>
                  <p className="text-sm text-muted-foreground">
                    Support youth development ages 12 to 25
                  </p>
                </div>
                <div className="border-l-4 border-pink-500 pl-4">
                  <h3 className="font-semibold mb-1">Superhuman Institute</h3>
                  <p className="text-sm text-muted-foreground">
                    Support adult development ages 25+
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Launch Information */}
          <Card>
            <CardHeader>
              <CardTitle>Launching January 1, 2026</CardTitle>
              <CardDescription>Join us at the beginning of a new era</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                We're building the future of human advancement. Our platform will launch on January
                1, 2026, bringing together superachievers from around the world.
              </p>
              <p className="text-sm text-muted-foreground">
                Located in San Miguel de Allende, Guanajuato, Mexico, we're creating a global
                ecosystem with local roots.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  )
}
