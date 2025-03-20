import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get("code")

    if (!code) {
      console.error("Auth callback: No code parameter provided")
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
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.delete({ name, ...options })
          },
        },
      }
    )

    const { error, data } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error("Auth callback error:", error.message)
      return NextResponse.redirect(`${requestUrl.origin}/auth/auth-code-error?error=${encodeURIComponent(error.message)}`)
    }

    // Successfully authenticated
    console.log("Auth callback successful, redirecting to dashboard")
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
  } catch (err) {
    console.error("Unexpected error in auth callback:", err)
    return NextResponse.redirect(new URL("/auth/auth-code-error?error=unexpected", request.url))
  }
} 