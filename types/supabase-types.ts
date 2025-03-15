export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      admin_logs: {
        Row: {
          action: string
          admin_id: string
          created_at: string
          details: Json | null
          id: string
          target_id: string
          target_table: string
        }
        Insert: {
          action: string
          admin_id: string
          created_at?: string
          details?: Json | null
          id?: string
          target_id: string
          target_table: string
        }
        Update: {
          action?: string
          admin_id?: string
          created_at?: string
          details?: Json | null
          id?: string
          target_id?: string
          target_table?: string
        }
        Relationships: [
          {
            foreignKeyName: "admin_logs_admin_id_fkey"
            columns: ["admin_id"]
            referencedTable: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      invites: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          invitee_id: string | null
          inviter_id: string
          is_used: boolean
          used_at: string | null
        }
        Insert: {
          code: string
          created_at?: string
          expires_at: string
          id?: string
          invitee_id?: string | null
          inviter_id: string
          is_used?: boolean
          used_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          invitee_id?: string | null
          inviter_id?: string
          is_used?: boolean
          used_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invites_invitee_id_fkey"
            columns: ["invitee_id"]
            referencedTable: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "invites_inviter_id_fkey"
            columns: ["inviter_id"]
            referencedTable: "auth.users"
            referencedColumns: ["id"]
          },
        ]
      }
      product_items: {
        Row: {
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          effort: string | null
          id: string
          impact: string | null
          status: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          effort?: string | null
          id?: string
          impact?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          effort?: string | null
          id?: string
          impact?: string | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          invited_by: string | null
          name: string
          reputation: number
          role: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id?: string
          invited_by?: string | null
          name: string
          reputation?: number
          role?: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          invited_by?: string | null
          name?: string
          reputation?: number
          role?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            referencedTable: "auth.users"
            referencedColumns: ["id"]
          },
        ]
      }
      verifications: {
        Row: {
          confirmed: boolean
          created_at: string
          id: string
          invitee_id: string
          reason: string | null
          verifier_id: string
        }
        Insert: {
          confirmed: boolean
          created_at?: string
          id?: string
          invitee_id: string
          reason?: string | null
          verifier_id: string
        }
        Update: {
          confirmed?: boolean
          created_at?: string
          id?: string
          invitee_id?: string
          reason?: string | null
          verifier_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "verifications_invitee_id_fkey"
            columns: ["invitee_id"]
            referencedTable: "auth.users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "verifications_verifier_id_fkey"
            columns: ["verifier_id"]
            referencedTable: "auth.users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_stats: {
        Args: Record<PropertyKey, never>
        Returns: Json
      }
      get_user_stats: {
        Args: {
          user_id: string
        }
        Returns: Json
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

