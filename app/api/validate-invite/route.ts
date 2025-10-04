import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase-types"

export const runtime = "edge"

export async function GET(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    // Verify environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("[Validation] Missing required environment variables:", {
        hasUrl: !!supabaseUrl,
        hasServiceKey: !!supabaseServiceKey
      })
      return NextResponse.json(
        { valid: false, error: "Server configuration error" },
        { status: 500 }
      )
    }

    // Get the code from the URL and ensure it's properly formatted
    const url = new URL(request.url)
    const code = url.searchParams.get("code")?.trim()

    if (!code) {
      return NextResponse.json(
        { valid: false, error: "Invite code is required" },
        { status: 400 }
      )
    }

    // Create a new Supabase client with the service role key
    const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Check the invite
    const { data, error } = await supabase
      .from("invites")
      .select("expires_at, is_used, created_at")
      .eq("code", code)
      .single<{ expires_at: string; is_used: boolean; created_at: string }>()

    if (error) {
      console.error("[Validation] Database error:", error)
      
      // Handle specific error cases
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { valid: false, error: "Invalid invite code" },
          { status: 400 }
        )
      }
      
      if (error.code === "42501") {
        return NextResponse.json(
          { valid: false, error: "Database permission error" },
          { status: 500 }
        )
      }

      return NextResponse.json(
        { 
          valid: false, 
          error: "Error validating invite code",
          details: error.message
        },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { valid: false, error: "Invalid invite code" },
        { status: 400 }
      )
    }

    const expiryDate = new Date(data.expires_at)
    const now = new Date()
    const isExpired = expiryDate < now
    const isUsed = data.is_used

    if (isExpired) {
      return NextResponse.json(
        { valid: false, error: "This invite code has expired" },
        { status: 400 }
      )
    }

    if (isUsed) {
      return NextResponse.json(
        { valid: false, error: "This invite code has already been used" },
        { status: 400 }
      )
    }

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
        details: err?.message || "Unknown error"
      },
      { status: 500 }
    )
  }
} 