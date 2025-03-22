import { getServerSupabaseClient } from "@/lib/supabase/server"
import DashboardClient from "@/components/dashboard-client"

// Add dynamic route configuration
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  const supabase = getServerSupabaseClient()

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .single()

  if (profileError || !profile) {
    console.error('Profile error:', profileError)
    throw new Error('Failed to load profile')
  }

  // Get user's invites
  const { data: invites, error: invitesError } = await supabase
    .from("invites")
    .select(`
      id,
      code,
      created_at,
      expires_at,
      is_used,
      invitee:profiles!invitee_id(name, status)
    `)
    .eq("inviter_id", profile.user_id)
    .order("created_at", { ascending: false })

  if (invitesError) {
    console.error('Invites error:', invitesError)
    throw new Error('Failed to load invites')
  }

  // Get user's verifications
  const { data: verifications, error: verificationsError } = await supabase
    .from("verifications")
    .select(`
      id,
      confirmed,
      reason,
      created_at,
      invitee:profiles!invitee_id(name, status)
    `)
    .eq("verifier_id", profile.user_id)
    .order("created_at", { ascending: false })

  if (verificationsError) {
    console.error('Verifications error:', verificationsError)
    throw new Error('Failed to load verifications')
  }

  return (
    <DashboardClient 
      profile={profile} 
      invites={invites?.map((invite) => ({
        ...invite,
        invitee: invite.invitee[0] || { name: "", status: "" }
      })) || []} 
      verifications={verifications?.map((verification) => ({
        ...verification,
        invitee: verification.invitee[0] || { name: "", status: "" }
      })) || []} 
    />
  )
}

