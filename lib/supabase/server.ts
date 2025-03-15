export const runtime = "edge"

import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase-types"
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies"

// For use in Server Components
export function getServerSupabaseClient() {
  const cookieStore = cookies() as unknown as RequestCookies

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.delete({ name, ...options })
        },
      },
    }
  )
}

// For use in Server Actions
export function getActionSupabaseClient() {
  return getServerSupabaseClient()
}

