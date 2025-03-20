import type { Metadata } from "next"
import { defaultMetadata } from "@/lib/metadata"

export const metadata: Metadata = {
  title: "Update Password | " + defaultMetadata.title,
  description: "Update your Supercivilization account password.",
}

export default function UpdatePasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 