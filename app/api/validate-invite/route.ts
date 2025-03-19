import { NextResponse } from "next/server"
import { getActionSupabaseClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
import { Redis } from "@upstash/redis"

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
})

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 // 1 minute in seconds
const MAX_REQUESTS = 10 // 10 requests per minute

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `rate_limit:${ip}`
  const current = await redis.incr(key)
  
  if (current === 1) {
    await redis.expire(key, RATE_LIMIT_WINDOW)
  }
  
  return current > MAX_REQUESTS
}

export async function GET(request: Request) {
  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || "unknown"

    // Rate limiting check
    if (await isRateLimited(ip)) {
      return NextResponse.json(
        { valid: false, error: "Too many requests. Please try again later." },
        { status: 429 }
      )
    }

    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    console.log("Validating invite code:", code)
    console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("Service Role Key available:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    if (!code) {
      console.log("No code provided")
      return NextResponse.json(
        { valid: false, error: "Invite code is required" },
        { status: 400 }
      )
    }

    const supabase = getActionSupabaseClient()

    // First verify the table exists
    const { data: tableExists, error: tableError } = await supabase
      .from("information_schema.tables")
      .select("table_name")
      .eq("table_name", "invites")
      .single()

    if (tableError) {
      console.error("Error checking table:", tableError)
    }

    console.log("Table exists check:", tableExists)

    // Check the invite
    console.log("Attempting to query invites table...")
    const { data, error } = await supabase
      .from("invites")
      .select("expires_at, is_used")
      .eq("code", code)
      .single()

    if (error) {
      console.error("Error validating invite code:", error)
      return NextResponse.json(
        { valid: false, error: "Invalid invite code", details: error.message },
        { status: 400 }
      )
    }

    if (!data) {
      console.log("No invite found for code:", code)
      return NextResponse.json(
        { valid: false, error: "Invalid invite code" },
        { status: 400 }
      )
    }

    console.log("Found invite:", data)

    const expiryDate = new Date(data.expires_at)
    const now = new Date()
    const isExpired = expiryDate < now
    const isUsed = data.is_used

    console.log("Expiry check:", {
      expiryDate: expiryDate.toISOString(),
      now: now.toISOString(),
      isExpired
    })

    if (isExpired) {
      console.log("Invite expired. Expiry:", expiryDate, "Now:", now)
      return NextResponse.json(
        { valid: false, error: "This invite code has expired" },
        { status: 400 }
      )
    }

    if (isUsed) {
      console.log("Invite already used")
      return NextResponse.json(
        { valid: false, error: "This invite code has already been used" },
        { status: 400 }
      )
    }

    console.log("Invite is valid")
    return NextResponse.json({
      valid: true,
      expires_at: data.expires_at,
      is_used: data.is_used
    })
  } catch (err: any) {
    console.error("Unexpected error during invite validation:", err)
    return NextResponse.json(
      { valid: false, error: "Error validating invite code", details: err?.message || "Unknown error" },
      { status: 500 }
    )
  }
} 