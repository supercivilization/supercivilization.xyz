"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

const JoinSupercivilization = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const [inviteCode, setInviteCode] = useState("")
  const [showConsent, setShowConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showRequestForm, setShowRequestForm] = useState(false)
  const [requestEmail, setRequestEmail] = useState("")
  const [requestMessage, setRequestMessage] = useState("")

  const handleInviteCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowConsent(true)
  }

  const handleConsent = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data: invite, error: inviteError } = await supabase
        .from("invites")
        .select("inviter_id, expires_at, is_used")
        .eq("code", inviteCode)
        .single()

      if (inviteError || !invite) {
        setError("Invalid invite code")
        setShowConsent(false)
        setIsLoading(false)
        return
      }

      if (invite.is_used) {
        setError("Invite code already used")
        setShowConsent(false)
        setIsLoading(false)
        return
      }

      if (new Date(invite.expires_at) < new Date()) {
        setError("Invite code has expired")
        setShowConsent(false)
        setIsLoading(false)
        return
      }

      router.push(`/join?code=${inviteCode}`)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestInvite = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from("invite_requests")
        .insert([
          {
            email: requestEmail,
            message: requestMessage,
            status: "pending",
          },
        ])

      if (error) throw error

      toast({
        title: "Request submitted",
        description: "We'll review your request and get back to you soon.",
      })
      setShowRequestForm(false)
      setRequestEmail("")
      setRequestMessage("")
    } catch (err: any) {
      console.error("Request error:", err)
      setError(err.message || "Failed to submit request")
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Join Supercivilization</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your invite code to get started
          </p>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleInviteCodeSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="inviteCode">Invite Code</Label>
              <Input
                id="inviteCode"
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="Enter your invite code"
                className="w-full"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Don't have an invite code?{' '}
                <button
                  type="button"
                  onClick={() => setShowRequestForm(true)}
                  className="text-primary hover:underline"
                >
                  Request one
                </button>
              </p>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Validating..." : "Continue"}
            </Button>
          </form>

          {showRequestForm && (
            <div className="mt-8 p-4 border rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Request an Invite</h2>
              <form onSubmit={handleRequestInvite} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    value={requestMessage}
                    onChange={(e) => setRequestMessage(e.target.value)}
                    placeholder="Tell us why you'd like to join"
                    className="min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Submit Request
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowRequestForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default JoinSupercivilization

