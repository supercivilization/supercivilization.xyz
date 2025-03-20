"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Mail, Key } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@supabase/ssr"

type AuthMethod = "password" | "magic-link"

export function AuthOptions() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authMethod, setAuthMethod] = useState<AuthMethod>("password")
  const [magicLinkSent, setMagicLinkSent] = useState(false)
  const { toast } = useToast()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
    } catch (err: any) {
      console.error("Password login error:", err)
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

  const handleForgotPassword = () => {
    window.location.href = "/reset-password"
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