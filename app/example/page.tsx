import type { Metadata } from "next"
import { defaultMetadata } from "../config"

export const metadata: Metadata = {
  title: "Example | " + defaultMetadata.title,
  description: "Example page for Supercivilization.",
}

export default function ExamplePage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Example Page</h1>
      <p>This is an example page for demonstration purposes.</p>
    </div>
  )
}

