"use client"

import { Suspense, useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, XCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get the token from the URL
        const token = searchParams.get("token")
        const type = searchParams.get("type")

        if (!token || type !== "email") {
          throw new Error("Invalid verification link")
        }

        // Verify the email
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: "email",
        })

        if (error) throw error

        setIsSuccess(true)
        toast({
          title: "Email verified",
          description: "Your email has been successfully verified.",
        })
      } catch (err: any) {
        console.error("Verification error:", err)
        setError(err.message || "Failed to verify email")
        toast({
          title: "Verification failed",
          description: err.message || "Please try again later",
          variant: "destructive",
        })
      } finally {
        setIsVerifying(false)
      }
    }

    verifyEmail()
  }, [searchParams, toast])

  return (
    <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-xl z-10 transition-all duration-300 hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
          Email Verification
        </CardTitle>
        <CardDescription className="text-center text-zinc-600 dark:text-zinc-400">
          {isVerifying
            ? "Verifying your email address..."
            : isSuccess
            ? "Your email has been verified"
            : "Email verification failed"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isVerifying ? (
          <div className="flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-600 dark:text-zinc-400" />
          </div>
        ) : isSuccess ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertDescription>Email verification successful!</AlertDescription>
            </Alert>
            <Button
              onClick={() => router.push("/login")}
              className="w-full bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600
              text-white font-medium py-2 transition-all duration-300 shadow-md hover:shadow-lg
              hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20"
            >
              Continue to Login
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
            <Button
              onClick={() => router.push("/login")}
              variant="outline"
              className="w-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Return to Login
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function VerifyEmail() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 transition-colors duration-500">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-full blur-3xl"></div>
      </div>

      <Suspense fallback={
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-xl z-10">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
              Email Verification
            </CardTitle>
            <CardDescription className="text-center text-zinc-600 dark:text-zinc-400">
              Loading...
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-600 dark:text-zinc-400" />
          </CardContent>
        </Card>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  )
} 