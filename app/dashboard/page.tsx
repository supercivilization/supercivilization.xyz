import { getServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import DashboardClient from "@/components/dashboard-client"

export default async function DashboardPage() {
  const supabase = getServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (profileError || !profile) redirect("/login")

  // Get user's invites
  const { data: invites } = await supabase
    .from("invites")
    .select(`
      id,
      code,
      created_at,
      expires_at,
      is_used,
      invitee:profiles!invitee_id(name, status)
    `)
    .eq("inviter_id", user.id)
    .order("created_at", { ascending: false })
    .then(({ data }) => ({
      data: data?.map((invite) => ({
        ...invite,
        invitee: invite.invitee[0] || { name: "", status: "" }
      }))
    }))

  // Get user's verifications
  const { data: verifications } = await supabase
    .from("verifications")
    .select(`
      id,
      confirmed,
      reason,
      created_at,
      invitee:profiles!invitee_id(name, status)
    `)
    .eq("verifier_id", user.id)
    .order("created_at", { ascending: false })
    .then(({ data }) => ({
      data: data?.map((verification) => ({
        ...verification,
        invitee: verification.invitee[0] || { name: "", status: "" }
      }))
    }))

  return <DashboardClient profile={profile} invites={invites || []} verifications={verifications || []} />
}

