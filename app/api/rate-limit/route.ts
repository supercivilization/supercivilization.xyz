import { headers } from "next/headers"
import { NextResponse } from "next/server"

// In-memory store for rate limiting (consider using Redis in production)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
}

async function checkRateLimit(ip: string) {
  const now = Date.now()

  // Clean up expired rate limit entries
  for (const [key, value] of rateLimit.entries()) {
    if (value.resetTime < now) {
      rateLimit.delete(key)
    }
  }

  // Check rate limit
  const rateLimitData = rateLimit.get(ip)

  if (rateLimitData) {
    if (now > rateLimitData.resetTime) {
      rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
    } else if (rateLimitData.count >= RATE_LIMIT.max) {
      return { isLimited: true }
    } else {
      rateLimitData.count++
    }
  } else {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT.windowMs })
  }

  return { isLimited: false }
}

export async function GET() {
  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"
    const { isLimited } = await checkRateLimit(ip)

    if (isLimited) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"
    const { isLimited } = await checkRateLimit(ip)

    if (isLimited) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 