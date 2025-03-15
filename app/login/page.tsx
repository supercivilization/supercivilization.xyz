import { Suspense } from "react"
import { Loader2 } from "lucide-react"
import LoginClient from "@/components/login-client"
import { defaultMetadata } from "../config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login | " + defaultMetadata.title,
  description: "Log in to your Supercivilization account.",
}

// Next.js 15 requires explicit dynamic setting
export const dynamic = "force-dynamic"

// Next.js 15 requires explicit revalidate setting
export const revalidate = 0

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Loading login page...</p>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  )
}

