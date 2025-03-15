import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import UpdatePasswordClient from "@/components/update-password-client"
import { defaultMetadata } from "../config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Update Password | " + defaultMetadata.title,
  description: "Update your Supercivilization account password.",
}

// Next.js 15 requires explicit dynamic setting
export const dynamic = "force-dynamic"

// Next.js 15 requires explicit revalidate setting
export const revalidate = 0

export default function UpdatePasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Loading update password page...</p>
        </div>
      }
    >
      <UpdatePasswordClient />
    </Suspense>
  )
}

