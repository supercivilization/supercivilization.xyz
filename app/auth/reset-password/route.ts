import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { CookieOptions } from "@supabase/ssr"

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (!code) {
      console.error("Reset password: No code parameter provided")
      return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=missing_code`)
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: "", ...options })
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error("Reset password exchange error:", error.message)
      return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=${encodeURIComponent(error.message)}`)
    }

    // Successfully authenticated, redirect to update password page
    console.log("Reset password code exchange successful, redirecting to update password")
    return NextResponse.redirect(new URL("/update-password", requestUrl.origin))
  } catch (err) {
    console.error("Unexpected error in reset password flow:", err)
    return NextResponse.redirect(new URL("/auth/auth-code-error?error=unexpected", request.url))
  }
} 