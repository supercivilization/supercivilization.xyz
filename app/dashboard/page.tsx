import { getServerSupabaseClient } from "@/lib/supabase/server"
import DashboardClient from "@/components/dashboard-client"
import { redirect } from "next/navigation"

// Add dynamic route configuration
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function DashboardPage() {
  const supabase = getServerSupabaseClient()

  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    console.error('Auth error:', authError)
    redirect('/login')
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (profileError || !profile) {
    console.error('Profile error:', profileError)
    // If profile doesn't exist, create one
    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert([
        {
          user_id: user.id,
          name: user.email?.split('@')[0] || 'Anonymous',
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (createError) {
      console.error('Profile creation error:', createError)
      throw new Error('Failed to create profile')
    }

    return <DashboardClient profile={newProfile} invites={[]} verifications={[]} />
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
    // Don't throw error for invites, just return empty array
    return <DashboardClient profile={profile} invites={[]} verifications={[]} />
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
    // Don't throw error for verifications, just return empty array
    return <DashboardClient profile={profile} invites={invites?.map(invite => ({
      ...invite,
      invitee: invite.invitee[0] || { name: "", status: "" }
    })) || []} verifications={[]} />
  }

  return (
    <DashboardClient 
      profile={profile} 
      invites={invites?.map(invite => ({
        ...invite,
        invitee: invite.invitee[0] || { name: "", status: "" }
      })) || []} 
      verifications={verifications?.map(verification => ({
        ...verification,
        invitee: verification.invitee[0] || { name: "", status: "" }
      })) || []} 
    />
  )
}

