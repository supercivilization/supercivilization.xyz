export interface User {
  id: string
  email?: string
  created_at?: string
  updated_at?: string
  full_name?: string
  avatar_url?: string
}

export interface Profile {
  user_id: string
  name: string
  email: string
  status: string
  role: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Invite {
  id: string
  code: string
  created_at: string
  expires_at: string
  is_used: boolean
  invitee: {
    name: string
    status: string
  }
}

export interface ProductItem {
  id: string
  title: string
  description?: string
  status: "backlog" | "in-progress" | "completed" | "archived"
  priority: "low" | "medium" | "high"
  created_at: string
  updated_at: string
  created_by: string
  assigned_to?: string
  votes: number
}

export interface ApiError {
  message: string
  status?: number
  code?: string
}

