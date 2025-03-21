"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseClient } from "@/lib/supabase/client"
import type { Profile, UserRole } from "@/types/database"

export function useAuth() {
  const router = useRouter()
  const supabase = createSupabaseClient()
  const [user, setUser] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadUser() {
      try {
        setIsLoading(true)

        // Get the authenticated user
        const {
          data: { user: authUser },
          error: authError,
        } = await supabase.auth.getUser()

        if (authError || !authUser) {
          throw new Error(authError?.message || "Not authenticated")
        }

        // Get the user profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", authUser.id)
          .single()

        if (profileError || !profile) {
          throw new Error(profileError?.message || "Profile not found")
        }

        // Ensure the profile data matches our Profile type with proper type assertions
        const typedProfile: Profile = {
          id: String(profile.id),
          user_id: String(profile.user_id),
          name: String(profile.name),
          email: String(profile.email),
          avatar_url: profile.avatar_url ? String(profile.avatar_url) : undefined,
          role: profile.role as UserRole,
          reputation: Number(profile.reputation),
          status: profile.status as "pending" | "active" | "suspended" | "banned",
          created_at: String(profile.created_at),
          updated_at: String(profile.updated_at)
        }

        setUser(typedProfile)
      } catch (err) {
        console.error("Auth error:", err)
        setError(err instanceof Error ? err : new Error("Authentication failed"))
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        loadUser()
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const isAdmin = user?.role === "admin" || user?.role === "superadmin"
  const isModerator = user?.role === "moderator" || isAdmin

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return {
    user,
    isLoading,
    error,
    isAdmin,
    isModerator,
    signOut,
    supabase,
  }
}

