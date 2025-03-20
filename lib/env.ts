const requiredEnvVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
] as const

type RequiredEnvVar = typeof requiredEnvVars[number]

function validateEnvVar(name: RequiredEnvVar): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export const env = {
  supabase: {
    url: validateEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
    anonKey: validateEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
    serviceRoleKey: validateEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  },
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const 