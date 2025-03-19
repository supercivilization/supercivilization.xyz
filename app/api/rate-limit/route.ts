import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { Redis } from "@upstash/redis"

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 // 1 minute in seconds
const MAX_ATTEMPTS = 5 // 5 attempts per minute
const LOCKOUT_DURATION = 300 // 5 minutes in seconds

async function checkRateLimit(ip: string): Promise<{ isLocked: boolean; remainingTime?: number }> {
  const key = `login_attempts:${ip}`
  const lockoutKey = `login_lockout:${ip}`

  // Check if IP is locked out
  const lockoutTime = await redis.get(lockoutKey)
  if (lockoutTime) {
    const remainingTime = Number(lockoutTime) - Math.floor(Date.now() / 1000)
    if (remainingTime > 0) {
      return { isLocked: true, remainingTime }
    }
    // Lockout expired, remove it
    await redis.del(lockoutKey)
  }

  // Get current attempts
  const attempts = await redis.incr(key)
  if (attempts === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW)
  }

  // Check if attempts exceeded limit
  if (attempts > MAX_ATTEMPTS) {
    // Set lockout
    const lockoutExpiry = Math.floor(Date.now() / 1000) + LOCKOUT_DURATION
    await redis.set(lockoutKey, lockoutExpiry, { ex: LOCKOUT_DURATION })
    return { isLocked: true, remainingTime: LOCKOUT_DURATION }
  }

  return { isLocked: false }
}

export async function POST(request: Request) {
  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"

    const { isLocked, remainingTime } = await checkRateLimit(ip)

    if (isLocked) {
      return NextResponse.json(
        { 
          locked: true, 
          message: `Too many attempts. Please try again in ${remainingTime} seconds.`,
          remainingTime 
        },
        { status: 429 }
      )
    }

    return NextResponse.json({ locked: false })
  } catch (err: any) {
    console.error("Rate limit error:", err)
    return NextResponse.json(
      { locked: false, error: "Error checking rate limit" },
      { status: 500 }
    )
  }
} 