import { createBrowserClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase-types"

// Create a singleton instance for client components
let clientInstance: ReturnType<typeof createBrowserClient<Database>> | null = null

export function getSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseClient should only be called in client components")
  }

  if (!clientInstance) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      console.error("Supabase environment variables are not set:", {
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseAnonKey
      })
      throw new Error("Supabase configuration is missing")
    }

    clientInstance = createBrowserClient<Database>(
      supabaseUrl,
      supabaseAnonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
        db: {
          schema: 'public'
        }
      }
    )
  }

  return clientInstance
}

