import { NextResponse } from "next/server"
import { getActionSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    // Get the code from the URL and ensure it's properly formatted
    const url = new URL(request.url)
    const code = url.searchParams.get("code")?.trim().toUpperCase()

    console.log("[Validation] Starting validation for code:", code)
    console.log("[Validation] Request URL:", request.url)
    console.log("[Validation] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)
    console.log("[Validation] Service Role Key available:", !!process.env.SUPABASE_SERVICE_ROLE_KEY)

    if (!code) {
      console.log("[Validation] No code provided")
      return NextResponse.json(
        { valid: false, error: "Invite code is required" },
        { status: 400 }
      )
    }

    const supabase = getActionSupabaseClient()

    // Check the invite directly without table verification
    console.log("[Validation] Querying invites table for code:", code)
    const { data, error } = await supabase
      .from("invites")
      .select("expires_at, is_used, created_at")
      .eq("code", code)
      .single()

    if (error) {
      console.error("[Validation] Database error:", error)
      return NextResponse.json(
        { 
          valid: false, 
          error: "Error validating invite code", 
          details: error.message,
          code: error.code 
        },
        { status: 500 }
      )
    }

    if (!data) {
      console.log("[Validation] No invite found for code:", code)
      return NextResponse.json(
        { valid: false, error: "Invalid invite code" },
        { status: 400 }
      )
    }

    console.log("[Validation] Found invite:", {
      code,
      created_at: data.created_at,
      expires_at: data.expires_at,
      is_used: data.is_used
    })

    const expiryDate = new Date(data.expires_at)
    const now = new Date()
    const isExpired = expiryDate < now
    const isUsed = data.is_used

    console.log("[Validation] Expiry check:", {
      expiryDate: expiryDate.toISOString(),
      now: now.toISOString(),
      isExpired,
      isUsed
    })

    if (isExpired) {
      console.log("[Validation] Invite expired. Expiry:", expiryDate, "Now:", now)
      return NextResponse.json(
        { valid: false, error: "This invite code has expired" },
        { status: 400 }
      )
    }

    if (isUsed) {
      console.log("[Validation] Invite already used")
      return NextResponse.json(
        { valid: false, error: "This invite code has already been used" },
        { status: 400 }
      )
    }

    console.log("[Validation] Invite is valid")
    return NextResponse.json({
      valid: true,
      expires_at: data.expires_at,
      is_used: data.is_used,
      created_at: data.created_at
    })
  } catch (err: any) {
    console.error("[Validation] Unexpected error:", err)
    return NextResponse.json(
      { 
        valid: false, 
        error: "Error validating invite code", 
        details: err?.message || "Unknown error",
        stack: process.env.NODE_ENV === 'development' ? err?.stack : undefined
      },
      { status: 500 }
    )
  }
} 