export const runtime = "edge"

import { createServerClient } from "@supabase/ssr"
import type { Database } from "@/types/supabase-types"

// For use in Server Components
export function getServerSupabaseClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(_name: string) {
          return ""
        },
        set(_name: string, _value: string, _options: any) {
          // No-op in edge functions
        },
        remove(_name: string, _options: any) {
          // No-op in edge functions
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// For use in Server Actions and API routes
export function getActionSupabaseClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        get(_name: string) {
          return ""
        },
        set(_name: string, _value: string, _options: any) {
          // No-op in edge functions
        },
        remove(_name: string, _options: any) {
          // No-op in edge functions
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

