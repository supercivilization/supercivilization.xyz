"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"

const JoinSupercivilization = () => {
  const [inviteCode, setInviteCode] = useState("")
  const [showConsent, setShowConsent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Removed inviterId state variable completely
  const router = useRouter()
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleInviteCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setShowConsent(true)
  }

  const handleConsent = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Replace the validateInviteCode utility function call with the direct validation code
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

      // Use invite.inviter_id directly in the URL without creating a separate variable
      router.push(`/signup?inviteCode=${inviteCode}&inviterId=${invite.inviter_id}`)
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred")
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">Join Supercivilization</h1>
      {!showConsent ? (
        <form onSubmit={handleInviteCodeSubmit} className="space-y-4">
          <div>
            <label htmlFor="inviteCode" className="block text-gray-700 text-sm font-bold mb-2">
              Invite Code:
            </label>
            <input
              type="text"
              id="inviteCode"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={inviteCode}
              onChange={(e) => setInviteCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Invite Code
          </button>
        </form>
      ) : (
        <div className="space-y-4">
          <p>By proceeding, you agree to join the Supercivilization. Do you consent to continue?</p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setShowConsent(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              onClick={handleConsent}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "I Consent"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default JoinSupercivilization

