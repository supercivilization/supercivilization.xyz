import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

// Rate limiting configuration
const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  auth: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Increase limit to 20 auth requests per hour
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

  // Handle auth callback first to prevent rate limiting
  if (request.nextUrl.pathname.startsWith('/auth/callback')) {
    return response
  }

  // Add security headers
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    connect-src 'self' https://*.supabase.co https://*.vercel-insights.com;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim()

  // Set security headers
  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

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
    error: sessionError
  } = await supabase.auth.getSession()

  if (sessionError) {
    console.error('Session error:', sessionError)
    // Clear any invalid session cookies
    response.cookies.delete('sb-access-token')
    response.cookies.delete('sb-refresh-token')
  }

  // Handle auth routes
  if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/join')) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return response
  }

  // Handle authenticated routes
  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/invite") ||
    request.nextUrl.pathname.startsWith("/verify")
  ) {
    if (!session) {
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
    return response
  }

  // Handle admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      const redirectUrl = new URL("/login", request.url)
      redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    try {
      // Check if the user is an admin
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", session.user.id)
        .single()

      if (profileError) {
        console.error('Profile fetch error:', profileError)
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }

      if (!profile || !["admin", "superadmin"].includes(profile.role)) {
        return NextResponse.redirect(new URL("/unauthorized", request.url))
      }
    } catch (error) {
      console.error('Admin check error:', error)
      return NextResponse.redirect(new URL("/unauthorized", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
}

