import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  auth: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // Limit each IP to 5 auth requests per hour
  }
}

// In-memory store for rate limiting (consider using Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.delete({ name, ...options })
        },
      },
    }
  )

  // Basic security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  )

  // Rate limiting for auth endpoints
  if (request.nextUrl.pathname.startsWith('/auth')) {
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous'
    const now = Date.now()

    // Clean up expired rate limit entries
    for (const [key, value] of rateLimit.entries()) {
      if (value.resetTime < now) {
        rateLimit.delete(key)
      }
    }

    // Check rate limit
    const rateLimitKey = `auth:${ip}`
    const rateLimitData = rateLimit.get(rateLimitKey)

    if (rateLimitData) {
      if (now > rateLimitData.resetTime) {
        rateLimit.set(rateLimitKey, { count: 1, resetTime: now + RATE_LIMIT.auth.windowMs })
      } else if (rateLimitData.count >= RATE_LIMIT.auth.max) {
        return new NextResponse('Too Many Requests', { status: 429 })
      } else {
        rateLimitData.count++
      }
    } else {
      rateLimit.set(rateLimitKey, { count: 1, resetTime: now + RATE_LIMIT.auth.windowMs })
    }
  }

  // Refresh session if exists
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Handle admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Check if the user is an admin
    const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", session.user.id).single()

    if (!profile || !["admin", "superadmin"].includes(profile.role)) {
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  // Handle authenticated routes
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/invite") ||
    request.nextUrl.pathname.startsWith("/verify")
  ) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}

