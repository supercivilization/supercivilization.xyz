"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Mail, Key, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createSupabaseClient } from "@/lib/supabase/client"

type AuthMethod = "password" | "magic-link"

export function AuthOptions() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authMethod, setAuthMethod] = useState<AuthMethod>("password")
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const [verificationSent, setVerificationSent] = useState(false)
  const { toast } = useToast()

  const supabase = createSupabaseClient()

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError("Email is required for magic link login")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true
        }
      })

      if (error) throw error

      setMagicLinkSent(true)
      toast({
        title: "Magic link sent",
        description: "Please check your email for the login link.",
      })
    } catch (err: any) {
      console.error("Magic link error:", err)
      setError(err.message || "Failed to send magic link")
      toast({
        title: "Error",
        description: "Failed to send magic link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log("Attempting login with email:", email)
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Supabase auth error:", {
          message: error.message,
          status: error.status,
          name: error.name
        })
        
        // Handle specific error cases
        if (error.message.includes("Invalid login credentials")) {
          throw new Error("Invalid email or password. Please check your credentials.")
        } else if (error.message.includes("Email not confirmed")) {
          setVerificationSent(true)
          throw new Error("Please verify your email address before logging in.")
        } else if (error.message.includes("Too many requests")) {
          throw new Error("Too many login attempts. Please try again later.")
        }
        throw error
      }

      if (data?.user) {
        console.log("Login successful for user:", data.user.id)
        toast({
          title: "Login successful",
          description: "Welcome back!",
        })
        // Use router for navigation
        router.push("/dashboard")
      } else {
        console.error("No user data returned from Supabase")
        throw new Error("No user data returned")
      }
    } catch (err: any) {
      console.error("Password login error:", {
        message: err.message,
        stack: err.stack,
        name: err.name
      })
      setError(err.message || "Failed to login")
      toast({
        title: "Login failed",
        description: err.message || "Please check your credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (!email) {
      setError("Email is required to resend verification")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) throw error

      setVerificationSent(true)
      toast({
        title: "Verification email sent",
        description: "Please check your email to verify your account.",
      })
    } catch (err: any) {
      console.error("Resend verification error:", err)
      setError(err.message || "Failed to resend verification email")
      toast({
        title: "Error",
        description: "Failed to resend verification email. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = () => {
    router.push("/reset-password")
  }

  const resetMagicLink = () => {
    setMagicLinkSent(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (authMethod === "magic-link") {
      handleMagicLinkLogin(e)
    } else {
      handlePasswordLogin(e)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button
          variant={authMethod === "password" ? "default" : "outline"}
          onClick={() => setAuthMethod("password")}
          className="flex-1"
        >
          <Key className="w-4 h-4 mr-2" />
          Password
        </Button>
        <Button
          variant={authMethod === "magic-link" ? "default" : "outline"}
          onClick={() => setAuthMethod("magic-link")}
          className="flex-1"
        >
          <Mail className="w-4 h-4 mr-2" />
          Magic Link
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {verificationSent && (
        <div className="space-y-4">
          <Alert className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300">
            <AlertDescription>
              Please check your email to verify your account.
            </AlertDescription>
          </Alert>
          <Button 
            variant="outline" 
            onClick={handleResendVerification} 
            className="w-full"
            disabled={isLoading}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Resend verification email
          </Button>
        </div>
      )}

      {authMethod === "magic-link" && magicLinkSent ? (
        <div className="space-y-4">
          <Alert className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300">
            <AlertDescription>
              Magic link sent! Check your email inbox for the login link.
            </AlertDescription>
          </Alert>
          <Button variant="outline" onClick={resetMagicLink} className="w-full">
            Send another link
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
              disabled={isLoading}
            />
          </div>

          {authMethod === "password" && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button 
                  type="button" 
                  variant="link" 
                  onClick={handleForgotPassword}
                  className="px-0 font-normal text-xs"
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {authMethod === "magic-link" ? "Sending..." : "Signing in..."}
              </>
            ) : (
              authMethod === "magic-link" ? "Send Magic Link" : "Sign in"
            )}
          </Button>
        </form>
      )}

      {authMethod === "magic-link" && !magicLinkSent && (
        <div className="text-sm text-muted-foreground text-center">
          <p>We'll send you a secure link to sign in instantly</p>
        </div>
      )}
    </div>
  )
} 