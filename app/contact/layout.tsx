import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Supercivilization. We're here to help you vivify further, unify faster, and thrive forever.",
  openGraph: {
    title: "Contact Supercivilization",
    description:
      "Get in touch with the Supercivilization team. We're building the future of human advancement.",
    url: "https://supercivilization.xyz/contact",
  },
  alternates: {
    canonical: "https://supercivilization.xyz/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
