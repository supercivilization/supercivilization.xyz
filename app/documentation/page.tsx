import { DocumentationSidebar } from "@/components/documentation-sidebar"
import Documentation from "@/documentation"
import type { Metadata } from "next"
import { defaultMetadata } from "../config"

export const metadata: Metadata = {
  title: "Documentation | " + defaultMetadata.title,
  description: "Learn about Supercivilization's features and functionality.",
}

export default function DocumentationPage() {
  return (
    <div className="flex min-h-screen">
      <DocumentationSidebar />
      <div className="flex-1 p-6">
        <Documentation />
      </div>
    </div>
  )
}

