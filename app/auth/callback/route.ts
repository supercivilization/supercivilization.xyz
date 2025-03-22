import { createServerClient } from '@supabase/ssr'
import { type EmailOtpType } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import type { Database } from '@/types/supabase-types'
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'

// List of allowed redirect URLs
const ALLOWED_REDIRECT_URLS = [
  '/dashboard',
  '/admin',
  '/invite',
  '/verify',
  '/'
]

function isValidRedirectUrl(url: string): boolean {
  try {
    const redirectUrl = new URL(url, process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000')
    return ALLOWED_REDIRECT_URLS.some(allowed => redirectUrl.pathname.startsWith(allowed))
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = searchParams.get('next') ?? '/'
    
    if (!token_hash || !type) {
      console.error('Missing token_hash or type in auth callback')
      return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
    }

    // Validate redirect URL
    if (!isValidRedirectUrl(next)) {
      console.error('Invalid redirect URL:', next)
      return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
    }

    const cookieStore = cookies() as unknown as RequestCookies
    const supabase = createServerClient<Database>(
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
    
    const { error, data } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    
    if (error) {
      console.error('Auth verification error:', error)
      return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
    }

    if (!data?.user) {
      console.error('No user data returned from verification')
      return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
    }

    // Successfully verified
    return NextResponse.redirect(new URL(next, request.url))
  } catch (error) {
    console.error('Unexpected error in auth callback:', error)
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
  }
} 