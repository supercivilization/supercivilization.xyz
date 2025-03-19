import { AuthOptions } from "@/components/auth-options"
import { defaultMetadata } from "../config"
import type { Metadata } from "next"
import Link from "next/link"

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
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose your preferred sign-in method
          </p>
        </div>

        <AuthOptions />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Forgot your password?{" "}
            <Link href="/reset-password" className="text-primary hover:underline">
              Reset it here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

