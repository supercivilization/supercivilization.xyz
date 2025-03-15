import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import JoinForm from "@/components/join-form"
import { defaultMetadata } from "../config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Join | " + defaultMetadata.title,
  description: "Join Supercivilization and be part of building a better future.",
}

// Next.js 15 requires explicit dynamic setting
export const dynamic = "force-dynamic"

// Next.js 15 requires explicit revalidate setting
export const revalidate = 0

export default function JoinPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Loading join page...</p>
        </div>
      }
    >
      <JoinForm />
    </Suspense>
  )
}

