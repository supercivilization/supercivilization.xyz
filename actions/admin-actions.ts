"use server"

import { revalidatePath } from "next/cache"
import { getActionSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import type { UserRole } from "@/types/database"

// Helper to check if the current user is an admin
async function verifyAdmin() {
  const supabase = getActionSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }

  // Check if the user is an admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", user.id).single()

  if (!profile || !["admin", "superadmin"].includes(profile.role)) {
    redirect("/unauthorized")
  }

  return { user, role: profile.role as UserRole }
}

// Log admin actions
async function logAdminAction(
  adminId: string,
  action: string,
  targetTable: string,
  targetId: string,
  details: Record<string, any>,
) {
  const supabase = getActionSupabaseClient()

  await supabase.from("admin_logs").insert({
    admin_id: adminId,
    action,
    target_table: targetTable,
    target_id: targetId,
    details,
    created_at: new Date().toISOString(),
  })
}

// Update user role
export async function updateUserRole(userId: string, newRole: UserRole) {
  const { user, role } = await verifyAdmin()

  // Only superadmins can create other admins
  if (newRole === "admin" && role !== "superadmin") {
    throw new Error("Only superadmins can create admin accounts")
  }

  const supabase = getActionSupabaseClient()

  const { error } = await supabase
    .from("profiles")
    .update({ role: newRole, updated_at: new Date().toISOString() })
    .eq("user_id", userId)

  if (error) throw new Error(error.message)

  // Log the action
  await logAdminAction(user.id, "update_role", "profiles", userId, { previous_role: role, new_role: newRole })

  revalidatePath("/admin/users")
  return { success: true }
}

// Ban a user
export async function banUser(userId: string, reason: string) {
  const { user } = await verifyAdmin()
  const supabase = getActionSupabaseClient()

  const { error } = await supabase
    .from("profiles")
    .update({
      status: "banned",
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId)

  if (error) throw new Error(error.message)

  // Log the action
  await logAdminAction(user.id, "ban_user", "profiles", userId, { reason })

  revalidatePath("/admin/users")
  return { success: true }
}

// Get admin dashboard stats
export async function getAdminStats() {
  await verifyAdmin()
  const supabase = getActionSupabaseClient()

  const [
    { count: totalUsers },
    { count: pendingUsers },
    { count: activeUsers },
    { count: totalInvites },
    { count: usedInvites },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("status", "active"),
    supabase.from("invites").select("*", { count: "exact", head: true }),
    supabase.from("invites").select("*", { count: "exact", head: true }).eq("is_used", true),
  ])

  return {
    totalUsers: totalUsers || 0,
    pendingUsers: pendingUsers || 0,
    activeUsers: activeUsers || 0,
    totalInvites: totalInvites || 0,
    usedInvites: usedInvites || 0,
    conversionRate: totalInvites && usedInvites ? Math.round(((usedInvites || 0) / (totalInvites || 0)) * 100) : 0,
  }
}

