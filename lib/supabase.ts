import { createClient } from "@supabase/supabase-js"
import { createBrowserClient } from "@supabase/ssr"
import { cache } from "react"

// Type definitions for better type safety
export type SupabaseClient = ReturnType<typeof createClient>

// For server components - cached to prevent multiple instances
export const createServerSupabaseClient = cache(() => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  return createClient(supabaseUrl, supabaseAnonKey)
})

// For client components - singleton pattern
let clientInstance: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseClient should only be called in client components")
  }

  if (!clientInstance) {
    clientInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }

  return clientInstance
}

// DO NOT use this export directly - it's kept for backward compatibility
// but should be migrated away from
export const supabase = typeof window !== "undefined" ? getSupabaseClient() : createServerSupabaseClient()

