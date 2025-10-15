"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// Note: metadata export doesn't work in client components
// Move this to a layout.tsx if you need metadata
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://supercivilization.xyz/contact#webpage",
      url: "https://supercivilization.xyz/contact",
      name: "Contact Supercivilization",
      description:
        "Get in touch with Supercivilization. We're here to help you vivify further, unify faster, and thrive forever.",
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
        "@id": "https://supercivilization.xyz/contact#breadcrumb",
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
            name: "Contact",
            item: "https://supercivilization.xyz/contact",
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
      url: "https://supercivilization.xyz",
      email: "admin@supercivilization.xyz",
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Miguel de Allende",
        addressRegion: "Guanajuato",
        addressCountry: "MX",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          email: "admin@supercivilization.xyz",
          contactType: "Customer Support",
          availableLanguage: ["English", "Spanish"],
          areaServed: "Worldwide",
        },
        {
          "@type": "ContactPoint",
          email: "admin@supercivilization.xyz",
          contactType: "General Inquiries",
          availableLanguage: ["English", "Spanish"],
          areaServed: "Worldwide",
        },
      ],
      sameAs: [
        "https://www.tiktok.com/@supercivilization",
        "https://www.youtube.com/@supercivilization",
        "https://x.com/supercivilizing",
        "https://www.instagram.com/supercivilizing/",
        "https://luma.com/supercivilization",
        "https://supercivilization.substack.com/",
        "https://github.com/supercivilization",
      ],
    },
  ],
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast.success("Message sent successfully! We'll get back to you soon.")
    setIsSubmitting(false)

    // Reset form
    ;(e.target as HTMLFormElement).reset()
  }

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
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get in touch with the Supercivilization team
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" placeholder="Your name" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="How can we help?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Email */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📧 Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:admin@supercivilization.xyz"
                    className="text-primary hover:underline"
                  >
                    admin@supercivilization.xyz
                  </a>
                  <p className="text-sm text-muted-foreground mt-2">
                    We typically respond within 24-48 hours
                  </p>
                </CardContent>
              </Card>

              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">📍 Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">San Miguel de Allende</p>
                  <p className="text-sm">Guanajuato, Mexico</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Serving superachievers worldwide
                  </p>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🌐 Connect With Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <a
                      href="https://x.com/supercivilizing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      X (Twitter) →
                    </a>
                    <a
                      href="https://www.youtube.com/@supercivilization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      YouTube →
                    </a>
                    <a
                      href="https://www.instagram.com/supercivilizing/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      Instagram →
                    </a>
                    <a
                      href="https://www.tiktok.com/@supercivilization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      TikTok →
                    </a>
                    <a
                      href="https://supercivilization.substack.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      Substack →
                    </a>
                    <a
                      href="https://luma.com/supercivilization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      Luma Events →
                    </a>
                    <a
                      href="https://github.com/supercivilization"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-primary hover:underline"
                    >
                      GitHub →
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Launch Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🚀 Launching Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Join us on <strong>January 1, 2026</strong> as we launch the Supercivilization
                    platform. Connect with us now to be part of our founding community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
