import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/supabase-types'
import type { SupabaseClientOptions } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key')
}

// Standard client configuration
const clientConfig: SupabaseClientOptions<'public'> = {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'x-application-name': 'supercivilization'
    }
  }
}

export const createSupabaseClient = (customConfig: Partial<SupabaseClientOptions<'public'>> = {}) => {
  return createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      ...clientConfig,
      ...customConfig
    }
  )
}

// Default client instance
export const supabase = createSupabaseClient()

