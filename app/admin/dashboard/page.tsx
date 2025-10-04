import { getServerSupabaseClient } from "@/lib/supabase/server"
import { getAdminStats } from "@/actions/admin-actions"
import { redirect } from "next/navigation"
import AdminDashboardClient from "@/components/admin-dashboard-client"

export default async function AdminDashboardPage() {
  const supabase = getServerSupabaseClient()

  // Check if user is authenticated and an admin
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect("/login")

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("user_id", user.id)
    .single<{ role: string }>()

  if (!profile || error || !["admin", "superadmin"].includes(profile.role)) {
    redirect("/unauthorized")
  }

  // Get admin stats
  const stats = await getAdminStats()

  // Get recent users
  const { data: recentUsers } = await supabase
    .from("profiles")
    .select("id, user_id, name, email, status, role, created_at")
    .order("created_at", { ascending: false })
    .limit(10)

  // Get recent admin logs with admin names
  const { data: adminLogs } = await supabase
    .from("admin_logs")
    .select(`
      id, 
      action, 
      target_table, 
      target_id, 
      created_at,
      admin_id
    `)
    .order("created_at", { ascending: false })
    .limit(10)

  // Get admin names separately
  const adminIds = adminLogs?.map((log: any) => log.admin_id) || []
  const { data: adminProfiles } = await supabase.from("profiles").select("id, name").in("id", adminIds)

  // Create a map of admin IDs to names
  const adminMap = new Map()
  adminProfiles?.forEach((profile: any) => {
    adminMap.set(profile.id, profile.name)
  })

  // Format the logs with admin names
  const formattedLogs =
    adminLogs?.map((log: any) => ({
      id: log.id,
      action: log.action,
      target_table: log.target_table,
      target_id: log.target_id,
      created_at: log.created_at,
      admin_id: log.admin_id,
      admin: {
        name: adminMap.get(log.admin_id) || "Unknown",
      },
    })) || []

  return <AdminDashboardClient stats={stats} recentUsers={recentUsers || []} recentLogs={formattedLogs} />
}

