"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      })

      if (resetError) throw resetError

      setIsSubmitted(true)
      toast({
        title: "Reset link sent",
        description: "Check your email for the password reset link",
      })
    } catch (err: any) {
      console.error("Reset password error:", err)
      setError(err.message || "Failed to send reset link")

      toast({
        title: "Error",
        description: err.message || "Failed to send reset link",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 transition-colors duration-500">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-full blur-3xl"></div>
      </div>

      <Card
        className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 
                border border-zinc-200 dark:border-zinc-700 shadow-xl z-10
                transition-all duration-300 hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20
                animate-fade-in-up"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
            Reset Password
          </CardTitle>
          <CardDescription className="text-center text-zinc-600 dark:text-zinc-400">
            {!isSubmitted ? "Enter your email to receive a password reset link" : "Check your email for the reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isSubmitted ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2 group">
                <Label
                  htmlFor="email"
                  className="inline-block transition-colors group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  disabled={isLoading}
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                  hover:border-zinc-400 dark:hover:border-zinc-600
                  focus:border-zinc-500 dark:focus:border-zinc-500
                  transition-all duration-200 shadow-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600
                text-white font-medium py-2 transition-all duration-300 shadow-md hover:shadow-lg
                hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20
                focus:ring-2 focus:ring-zinc-500/50 dark:focus:ring-zinc-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md">
                Reset link sent! Check your email inbox.
              </div>
              <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">
                Send again
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-zinc-600 dark:text-zinc-400">
            <Link
              href="/login"
              className="inline-flex items-center text-zinc-800 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-100 hover:underline transition-colors"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

