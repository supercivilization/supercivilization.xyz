export type UserRole = "user" | "moderator" | "admin" | "superadmin"

export interface Profile {
  id: string
  user_id: string
  name: string
  email: string
  avatar_url?: string
  role: UserRole
  reputation: number
  status: "pending" | "active" | "suspended" | "banned"
  created_at: string
  updated_at: string
}

export interface Invite {
  id: string
  code: string
  inviter_id: string
  invitee_id?: string
  is_used: boolean
  created_at: string
  expires_at: string
  used_at?: string
}

export interface Verification {
  id: string
  invitee_id: string
  verifier_id: string
  confirmed: boolean
  reason?: string
  created_at: string
}

export interface AdminLog {
  id: string
  admin_id: string
  action: string
  target_table: string
  target_id: string
  details: Record<string, any>
  created_at: string
  admin: {
    name: string
  }
}

