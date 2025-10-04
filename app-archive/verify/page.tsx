import { getServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import VerifyClient from "@/components/verify-client"

export const dynamic = 'force-dynamic'

export default async function VerifyPage() {
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

  // Get all pending users
  const { data: pendingUsers } = await (supabase
    .from("profiles") as any)
    .select(`
      id,
      user_id,
      name,
      email,
      created_at,
      invited_by,
      inviter:profiles!invited_by(name)
    `)
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .then(({ data }: any) => ({
      data: data?.map((user: any) => ({
        ...user,
        inviter: user.inviter[0] || { name: "" }
      }))
    }))

  // Get already verified users
  const { data: verifications } = await (supabase
    .from("verifications") as any)
    .select("invitee_id")
    .eq("verifier_id", user.id)

  const verifiedIds = verifications?.map((v: any) => v.invitee_id) || []
  const usersToVerify = pendingUsers?.filter((u: any) => !verifiedIds.includes(u.user_id)) || []

  return <VerifyClient pendingUsers={usersToVerify} />
}

