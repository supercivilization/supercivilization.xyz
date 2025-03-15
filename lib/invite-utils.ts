import type { SupabaseClient } from "@supabase/supabase-js"

export interface InviteValidationResult {
  valid: boolean
  inviterId?: string
  error?: string
}

/**
 * Validates an invite code against the Supabase database
 * @param supabase Supabase client instance
 * @param inviteCode The invite code to validate
 * @returns Validation result with status and error message if applicable
 */
export async function validateInviteCode(
  supabase: SupabaseClient,
  inviteCode: string,
): Promise<InviteValidationResult> {
  if (!inviteCode || inviteCode.trim() === "") {
    return { valid: false, error: "Invite code is required" }
  }

  try {
    const { data: invite, error: inviteError } = await supabase
      .from("invites")
      .select("inviter_id, expires_at, is_used")
      .eq("code", inviteCode.trim())
      .single()

    if (inviteError) {
      console.error("Invite validation error:", inviteError)
      return {
        valid: false,
        error:
          inviteError.code === "PGRST116"
            ? "Invalid invite code"
            : inviteError.message || "Error validating invite code",
      }
    }

    if (!invite) {
      return { valid: false, error: "Invalid invite code" }
    }

    if (invite.is_used) {
      return { valid: false, error: "This invite code has already been used" }
    }

    const expiryDate = new Date(invite.expires_at)
    if (expiryDate < new Date()) {
      return { valid: false, error: "This invite code has expired" }
    }

    // Valid invite code
    return { valid: true, inviterId: invite.inviter_id }
  } catch (err) {
    console.error("Unexpected error during invite validation:", err)
    return { valid: false, error: "An unexpected error occurred validating the invite code" }
  }
}

/**
 * Marks an invite code as used in the database
 * @param supabase Supabase client instance
 * @param inviteCode The invite code to mark as used
 * @returns Success status and error message if applicable
 */
export async function markInviteAsUsed(
  supabase: SupabaseClient,
  inviteCode: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from("invites")
      .update({ is_used: true, used_at: new Date().toISOString() })
      .eq("code", inviteCode.trim())

    if (error) {
      console.error("Error marking invite as used:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error("Unexpected error marking invite as used:", err)
    return { success: false, error: "An unexpected error occurred" }
  }
}

