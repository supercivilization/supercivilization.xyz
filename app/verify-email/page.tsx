"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

function VerifyEmailContent() {
  const router = useRouter()
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying")
  const [error, setError] = useState("")

  return (
    <Suspense fallback={
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        </CardContent>
      </Card>
    }>
      <VerifyEmailWithParams status={status} setStatus={setStatus} error={error} setError={setError} router={router} />
    </Suspense>
  )
}

function VerifyEmailWithParams({ 
  status, 
  setStatus, 
  error, 
  setError, 
  router 
}: { 
  status: "verifying" | "success" | "error"
  setStatus: (status: "verifying" | "success" | "error") => void
  error: string
  setError: (error: string) => void
  router: ReturnType<typeof useRouter>
}) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token")
        
        if (!token) {
          setStatus("error")
          setError("No verification token found")
          return
        }

        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "email",
        })

        if (error) throw error

        setStatus("success")
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          router.push("/dashboard")
        }, 3000)
      } catch (err) {
        setStatus("error")
        setError(err instanceof Error ? err.message : "Failed to verify email")
      }
    }

    verifyEmail()
  }, [router, searchParams, setError, setStatus])

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Email Verification</CardTitle>
        <CardDescription>
          Verifying your email address...
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === "verifying" && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          </div>
        )}

        {status === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Email verified successfully! Redirecting to dashboard...
            </AlertDescription>
          </Alert>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function VerifyEmail() {
  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <VerifyEmailContent />
    </div>
  )
} 