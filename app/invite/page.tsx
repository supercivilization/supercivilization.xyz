import { getServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import InviteClient from "@/components/invite-client"

export default async function InvitePage() {
  const supabase = getServerSupabaseClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  // Check if user is active
  const { data: profile } = await supabase.from("profiles").select("status").eq("user_id", user.id).single<{ status: string }>()

  if (!profile || profile.status !== "active") {
    redirect("/dashboard")
  }

  return <InviteClient />
}

