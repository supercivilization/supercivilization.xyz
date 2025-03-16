import { NextResponse } from "next/server"
import { getActionSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.json(
        { valid: false, error: "Invite code is required" },
        { status: 400 }
      )
    }

    const supabase = getActionSupabaseClient()

    const { data, error } = await supabase
      .from("invites")
      .select("expires_at, is_used")
      .eq("code", code)
      .single()

    if (error) {
      console.error("Error validating invite code:", error)
      return NextResponse.json(
        { valid: false, error: "Invalid invite code" },
        { status: 400 }
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
      is_used: data.is_used
    })
  } catch (err) {
    console.error("Unexpected error during invite validation:", err)
    return NextResponse.json(
      { valid: false, error: "Error validating invite code" },
      { status: 500 }
    )
  }
} 