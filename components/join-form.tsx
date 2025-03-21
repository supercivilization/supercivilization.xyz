"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { createSupabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function JoinForm() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const router = useRouter()
  const inviteCode = searchParams.get("code") || ""
  const supabase = createSupabaseClient()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showConsent, setShowConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isValidatingCode, setIsValidatingCode] = useState(true)
  const [isValidCode, setIsValidCode] = useState(false)

  // Validate invite code on component mount
  useEffect(() => {
    let isMounted = true

    const validateInviteCode = async () => {
      if (!inviteCode) {
        console.log("No invite code provided")
        setIsValidatingCode(false)
        return
      }

      try {
        console.log("Validating code:", inviteCode)
        const response = await fetch(`/api/validate-invite?code=${encodeURIComponent(inviteCode)}`, {
          headers: {
            'Cache-Control': 'no-cache',  // Prevent caching
          }
        })
        const data = await response.json()

        if (!isMounted) return

        console.log("Validation response:", data)

        if (!response.ok) {
          setError(data.error || "Invalid invite code")
          setIsValidCode(false)
          return
        }

        if (!data.valid) {
          setError(data.error || "Invalid invite code")
          setIsValidCode(false)
          return
        }

        setIsValidCode(true)
        setError("")
      } catch (err) {
        console.error("Validation error:", err)
        if (isMounted) {
          setError("Error validating invite code")
          setIsValidCode(false)
        }
      } finally {
        if (isMounted) {
          setIsValidatingCode(false)
        }
      }
    }

    validateInviteCode()

    return () => {
      isMounted = false
    }
  }, [inviteCode])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!email || !name || !password) {
      setError("Please fill out all fields")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      setError("Password must contain uppercase, lowercase, numbers, and special characters")
      return
    }

    // Show consent popup
    setShowConsent(true)
  }

  const handleConsent = async () => {
    setShowConsent(false)
    setIsLoading(true)
    setError("")

    try {
      // First validate the invite code again to ensure it's still valid
      const validationResponse = await fetch(`/api/validate-invite?code=${encodeURIComponent(inviteCode)}`, {
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      const validationData = await validationResponse.json()

      if (!validationResponse.ok || !validationData.valid) {
        throw new Error(validationData.error || "Invalid invite code")
      }

      // Get invite details and lock the invite
      const { data: invite, error: inviteError } = await supabase
        .from("invites")
        .select("inviter_id, expires_at, is_used")
        .eq("code", inviteCode)
        .eq("is_used", false)  // Ensure it's still unused
        .single()

      if (inviteError) {
        console.error("Invite validation error:", inviteError)
        throw new Error("Error validating invite code")
      }

      if (!invite) {
        throw new Error("This invite code has already been used")
      }

      // Double check expiration
      const expiryDate = new Date(invite.expires_at)
      const now = new Date()
      if (expiryDate < now) {
        throw new Error("This invite code has expired")
      }

      // Register user with Supabase
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            invite_code: inviteCode,
            consent_given: true,
            consent_date: new Date().toISOString(),
            invited_by: invite.inviter_id,
          },
        },
      })

      if (error) {
        console.error("Signup error:", error)
        if (error.message.includes("already registered")) {
          throw new Error("This email is already registered")
        }
        throw error
      }

      if (!authData || !authData.user) {
        throw new Error("Failed to create account")
      }

      // Mark invite as used with a final check
      const { error: updateError } = await supabase
        .from("invites")
        .update({
          invitee_id: authData.user.id,
          is_used: true,
          used_at: new Date().toISOString(),
        })
        .eq("code", inviteCode)
        .eq("is_used", false)  // Final check to ensure it's still unused

      if (updateError) {
        console.error("Error updating invite:", updateError)
        // Log the error but don't throw, as the user is already created
      }

      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account. You'll be redirected to the login page.",
      })

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)

      setSubmitted(true)
    } catch (err: any) {
      console.error("Signup error:", err)
      setError(err.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state while validating invite code
  if (isValidatingCode) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p>Validating invite code...</p>
        </div>
      </div>
    )
  }

  // No invite code or invalid code
  if (!inviteCode || !isValidCode) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden
              bg-zinc-50 dark:bg-zinc-900
              transition-colors duration-500"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center z-10 animate-fade-in-up max-w-md w-full">
          <h1 className="text-2xl font-bold mb-3 text-zinc-800 dark:text-zinc-100">Join Supercivilization</h1>
          <p className="text-lg mb-6 text-zinc-600 dark:text-zinc-400">
            {!inviteCode ? "Enter your invite code to get started" : "Please enter a valid invite code"}
          </p>

          {!isValidCode && inviteCode && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>The invite code "{inviteCode}" is invalid or has expired.</AlertDescription>
            </Alert>
          )}

          <form
            className="w-full max-w-md mx-auto mb-6"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const code = formData.get("inviteCode") as string
              if (code) {
                router.push(`/join?code=${encodeURIComponent(code.trim())}`)
              }
            }}
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="inviteCode" className="text-left block">
                  Invite Code
                </Label>
                <Input
                  id="inviteCode"
                  name="inviteCode"
                  placeholder="Enter your invite code"
                  defaultValue={inviteCode}
                  className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                Continue
              </Button>
            </div>
          </form>

          <div className="mt-4">
            <Link
              href="/"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 text-sm"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden
                bg-zinc-50 dark:bg-zinc-900
                transition-colors duration-500"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-full blur-3xl"></div>
      </div>

      {/* Rest of the content */}
      <div className="text-center mb-6 z-10">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Join Supercivilization</h1>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Create your account</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-center">Creating your account...</p>
        </div>
      ) : !submitted ? (
        <div className="w-full max-w-md z-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                disabled={isLoading}
                className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
              />
            </div>

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
                className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700"
              />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Must be at least 8 characters with uppercase, lowercase, numbers, and special characters
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </div>
      ) : (
        <div
          className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md max-w-md text-center z-10
                      backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 
                      border border-zinc-200 dark:border-zinc-700"
        >
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">Account created!</h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">Please check your email to confirm your account.</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            After confirming your email, you can log in to access your account.
          </p>
        </div>
      )}

      {showConsent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Consent Required</h3>
            <p className="mb-4">
              By creating an account, you agree to join the Supercivilization and abide by its rules and guidelines.
            </p>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowConsent(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConsent}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "I Agree"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

