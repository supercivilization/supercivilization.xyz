import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase-types'
import type { SupabaseClientOptions } from '@supabase/supabase-js'

let supabaseClient: ReturnType<typeof createClient> | null = null

export function createSupabaseClient() {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables")
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  })

  return supabaseClient
}

// Default client instance
export const supabase = createSupabaseClient()

