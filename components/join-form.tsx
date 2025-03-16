"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import MyGeniusSignupForm from "@/components/MyGeniusSignupForm"
import ConsentPopup from "@/components/ConsentPopup"
import { getSupabaseClient } from "@/lib/supabase"
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
  const supabase = getSupabaseClient()

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [showConsent, setShowConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isValidatingCode, setIsValidatingCode] = useState(true)
  const [isValidCode, setIsValidCode] = useState(true)

  // Add debug logging for Supabase configuration
  useEffect(() => {
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("Anon key available:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  }, [])

  // Validate invite code on component mount
  useEffect(() => {
    if (!inviteCode) {
      console.log("No invite code provided")
      setIsValidatingCode(false)
      return
    }

    // Special handling for admin code
    if (inviteCode === "ADMIN2025") {
      console.log("Admin code detected")
      setIsValidCode(true)
      setIsValidatingCode(false)
      return
    }

    const validateInviteCode = async () => {
      console.log("Starting invite code validation for:", inviteCode)
      try {
        console.log("Fetching invite data from Supabase...")
        const { data, error } = await supabase
          .from("invites")
          .select("expires_at, is_used")
          .eq("code", inviteCode)
          .single()

        console.log("Supabase response:", { data, error })

        if (error) {
          console.error("Error validating invite code:", error)
          setError(error.message || "Invalid invite code")
          setIsValidCode(false)
          setIsValidatingCode(false)
          return
        }

        if (!data) {
          console.log("No invite data found")
          setError("Invalid invite code")
          setIsValidCode(false)
          setIsValidatingCode(false)
          return
        }

        // Check if invite is expired or used
        const expiryDate = new Date(data.expires_at)
        const now = new Date()
        const isExpired = expiryDate < now
        const isUsed = data.is_used

        console.log("Invite validation:", {
          expiryDate,
          now,
          isExpired,
          isUsed
        })

        if (isExpired) {
          console.log("Invite code expired")
          setError("This invite code has expired")
          setIsValidCode(false)
        } else if (isUsed) {
          console.log("Invite code already used")
          setError("This invite code has already been used")
          setIsValidCode(false)
        } else {
          console.log("Invite code valid")
          setIsValidCode(true)
          setError("")
        }
      } catch (err) {
        console.error("Unexpected error during validation:", err)
        setError("Error validating invite code")
        setIsValidCode(false)
      } finally {
        console.log("Validation complete, setting isValidatingCode to false")
        setIsValidatingCode(false)
      }
    }

    validateInviteCode()
  }, [inviteCode, supabase])

  // Rest of the component remains the same...
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
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
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
      // Special handling for admin code
      const isAdminCode = inviteCode === "ADMIN2025"

      // For admin code, bypass all checks and directly create the user
      if (isAdminCode) {
        try {
          // Register user with Supabase directly
          const { data: authData, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
                invite_code: inviteCode,
                consent_given: true,
                consent_date: new Date().toISOString(),
                invited_by: "333e8400-e29b-41d4-a716-446655440333", // Hardcoded admin ID
              },
            },
          })

          if (error) throw error

          if (!authData || !authData.user) {
            throw new Error("Failed to create account")
          }

          // Success - no need to update invite for admin code
          toast({
            title: "Account created!",
            description: "Please check your email to confirm your account.",
          })

          setSubmitted(true)
          return
        } catch (adminError: any) {
          console.error("Admin signup error:", adminError)
          throw new Error(adminError.message || "Failed to create account")
        }
      }

      // For regular invite codes, proceed with validation
      let inviterId = null

      // Validate the invite code
      try {
        const { data: invite, error: inviteError } = await supabase
          .from("invites")
          .select("inviter_id, expires_at, is_used")
          .eq("code", inviteCode)
          .single()

        if (inviteError) {
          console.error("Database error checking invite:", inviteError)
          throw new Error("Invalid invite code")
        }

        if (!invite) {
          throw new Error("Invalid invite code")
        }

        if (invite.is_used) {
          throw new Error("Invite code has already been used")
        }

        if (new Date(invite.expires_at) < new Date()) {
          throw new Error("Invite code has expired")
        }

        inviterId = invite.inviter_id
      } catch (err) {
        console.error("Error processing invite code:", err)
        throw new Error("Error validating invite code. Please try again.")
      }

      // Register user with Supabase
      try {
        const { data: authData, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
              invite_code: inviteCode,
              consent_given: true,
              consent_date: new Date().toISOString(),
              invited_by: inviterId,
            },
          },
        })

        if (error) throw error

        if (!authData || !authData.user) {
          throw new Error("Failed to create account")
        }

        // Mark invite as used
        try {
          const { error: updateError } = await supabase
            .from("invites")
            .update({
              invitee_id: authData.user.id,
              is_used: true,
            })
            .eq("code", inviteCode)

          if (updateError) {
            console.error("Error updating invite:", updateError)
            // Continue anyway since the user was created successfully
          }
        } catch (updateErr) {
          console.error("Error updating invite status:", updateErr)
          // Continue anyway since the user was created successfully
        }

        // Show success message
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account.",
        })

        // Update UI state
        setSubmitted(true)
      } catch (authErr: any) {
        console.error("Error during authentication:", authErr)
        throw new Error(authErr.message || "Failed to create account")
      }
    } catch (error: any) {
      const errorMessage = error.message || "Something went wrong. Please try again."
      setError(errorMessage)

      toast({
        title: "Error creating account",
        description: errorMessage,
        variant: "destructive",
      })
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
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Create your MyGenius.ID</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-center">Creating your account...</p>
        </div>
      ) : !submitted ? (
        <div className="w-full max-w-md z-10">
          <MyGeniusSignupForm
            inviteCode={inviteCode}
            onSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            className="backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 
              border border-zinc-200 dark:border-zinc-700 shadow-xl
              transition-all duration-300 hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20"
          />

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      ) : (
        <div
          className="bg-white dark:bg-zinc-800 p-8 rounded-lg shadow-md max-w-md text-center z-10
                      backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 
                      border border-zinc-200 dark:border-zinc-700"
        >
          <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">Account created!</h2>
          <p className="mb-4 text-zinc-700 dark:text-zinc-300">Awaiting verification from two Superachievers.</p>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Please check your email to confirm your account.</p>
        </div>
      )}

      {showConsent && <ConsentPopup onAgree={handleConsent} />}
    </div>
  )
}

