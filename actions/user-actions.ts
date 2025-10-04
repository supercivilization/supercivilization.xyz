"use server"

import { revalidatePath } from "next/cache"
import { getActionSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

// Generate an invite code
export async function generateInviteCode(expiryHours = 24) {
  const supabase = getActionSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  // Check if the user is active
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("status")
    .eq("user_id", user.id)
    .single<{ status: string }>()

  if (!profile || profileError || profile.status !== "active") {
    throw new Error("Only active users can generate invite codes")
  }

  // Generate a random code
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  let code = ""
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length))
  }

  // Calculate expiry date
  const expiryDate = new Date()
  expiryDate.setHours(expiryDate.getHours() + expiryHours)

  // Insert the invite
  const { data, error } = await (supabase
    .from("invites") as any)
    .insert({
      code,
      inviter_id: user.id,
      is_used: false,
      created_at: new Date().toISOString(),
      expires_at: expiryDate.toISOString(),
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  revalidatePath("/invite")
  return data
}

// Verify a user
export async function verifyUser(inviteeId: string, confirmed: boolean, reason?: string) {
  const supabase = getActionSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  // Check if the user is active
  const { data: profile, error: profileError2 } = await supabase
    .from("profiles")
    .select("status")
    .eq("user_id", user.id)
    .single<{ status: string }>()

  if (!profile || profileError2 || profile.status !== "active") {
    throw new Error("Only active users can verify others")
  }

  // Create verification record
  const { error: verificationError } = await (supabase.from("verifications") as any).insert({
    invitee_id: inviteeId,
    verifier_id: user.id,
    confirmed,
    reason: reason || null,
    created_at: new Date().toISOString(),
  })

  if (verificationError) throw new Error(verificationError.message)

  // If rejected, update user status
  if (!confirmed) {
    const { error: updateError } = await (supabase
      .from("profiles") as any)
      .update({ status: "rejected", updated_at: new Date().toISOString() })
      .eq("user_id", inviteeId)

    if (updateError) throw new Error(updateError.message)
  } else {
    // Check if this is the second verification
    const { count } = await supabase
      .from("verifications")
      .select("*", { count: "exact", head: true })
      .eq("invitee_id", inviteeId)
      .eq("confirmed", true)

    // If two or more verifications, activate the user
    if (count && count >= 2) {
      const { error: updateError } = await (supabase
        .from("profiles") as any)
        .update({ status: "active", updated_at: new Date().toISOString() })
        .eq("user_id", inviteeId)

      if (updateError) throw new Error(updateError.message)
    }
  }

  revalidatePath("/verify")
  return { success: true }
}

