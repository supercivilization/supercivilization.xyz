"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Loader2, UserPlus, ShieldCheck, LogOut, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createSupabaseClient } from "@/lib/supabase/client"

interface UserProfile {
  email: string
  name: string
  status: string
  reputation: number
}

interface Invite {
  id: string
  code: string
  inviteeName: string | null
  status: string
  created_at: string
  expires_at: string
  isExpired: boolean
  is_used: boolean
}

// Define types for raw data from Supabase
interface RawInvite {
  id: string
  code: string
  created_at: string
  expires_at: string
  is_used: boolean
  invitee_id: string | null
}

interface RawInvitee {
  name: string
  status: string
}

interface RawVerificationData {
  id: string
  confirmed: boolean
  reason: string | null
  created_at: string
  invitee_id: string
}

interface Verification {
  id: string
  memberName: string
  confirmed: boolean
  reason: string | null
  created_at: string
}

interface UserData {
  id: string
  name: string
}

export default function DashboardContent() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createSupabaseClient()

  const [user, setUser] = useState<UserProfile | null>(null)
  const [invites, setInvites] = useState<Invite[]>([])
  const [verifications, setVerifications] = useState<Verification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [, setError] = useState<string | null>(null)

  const fetchData = async () => {
    const isRefresh = !isLoading
    if (isRefresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }
    setError(null)

    try {
      // Check authentication
      const { data: authData, error: authError } = await supabase.auth.getUser()

      if (authError) throw new Error("Authentication error")

      if (!authData.user) {
        router.push("/login")
        return
      }

      const userId = authData.user.id

      // Fetch user details
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("email, name, status, reputation")
        .eq("id", userId)
        .single()

      if (userError) throw userError

      setUser(userData as UserProfile)

      // Fetch invites with a more efficient join query
      const { data: inviteData, error: inviteError } = await supabase
        .from("invites")
        .select(`
          id,
          code,
          created_at,
          expires_at,
          is_used,
          invitee_id
        `)
        .eq("inviter_id", userId)
        .order("created_at", { ascending: false })

      if (inviteError) throw inviteError

      // Process the invite data with additional information
      const formattedInvites = await Promise.all(
        (inviteData as RawInvite[]).map(async (invite) => {
          // If there's an invitee_id, fetch their details
          let inviteeName = null
          let inviteeStatus = null

          if (invite.invitee_id) {
            const { data: invitee } = await supabase
              .from("users")
              .select("name, status")
              .eq("id", invite.invitee_id)
              .single()

            if (invitee) {
              inviteeName = (invitee as RawInvitee).name
              inviteeStatus = (invitee as RawInvitee).status
            }
          }

          // Check if invite is expired
          const isExpired = new Date(invite.expires_at as string) < new Date()

          return {
            id: invite.id,
            code: invite.code,
            inviteeName: inviteeName || "Pending",
            status: inviteeStatus || (invite.is_used ? "Used" : isExpired ? "Expired" : "Active"),
            created_at: invite.created_at,
            expires_at: invite.expires_at,
            isExpired: isExpired,
            is_used: invite.is_used,
          }
        }),
      )

      setInvites(formattedInvites)

      // Fetch verification history
      const { data: verificationData, error: verificationError } = await supabase
        .from("verifications")
        .select(`
          id,
          confirmed,
          reason,
          created_at,
          invitee_id
        `)
        .eq("verifier_id", userId)
        .order("created_at", { ascending: false })

      if (verificationError) throw verificationError

      // Fetch user names for the verifications
      const formattedVerifications: Verification[] = []

      if (verificationData && verificationData.length > 0) {
        // Get all unique invitee IDs
        const inviteeIds = [...new Set(verificationData.map((v: RawVerificationData) => v.invitee_id).filter(Boolean))]

        // Fetch all users in one query
        const { data: usersData } = await supabase.from("users").select("id, name").in("id", inviteeIds)

        // Create a map of user IDs to names
        const userMap = new Map()
        if (usersData) {
          usersData.forEach((user: UserData) => {
            userMap.set(user.id, user.name)
          })
        }

        // Map verification data with user names
        for (const v of verificationData) {
          formattedVerifications.push({
            id: v.id,
            memberName: v.invitee_id && userMap.has(v.invitee_id) ? userMap.get(v.invitee_id) : "Unknown",
            confirmed: v.confirmed,
            reason: v.reason || "N/A",
            created_at: v.created_at,
          })
        }
      }

      setVerifications(formattedVerifications)

      if (isRefresh) {
        toast({
          title: "Dashboard refreshed",
          description: "Your dashboard data has been updated",
        })
      }
    } catch (err: any) {
      console.error("Error fetching dashboard data:", err)
      setError(err.message || "Failed to load dashboard data")

      toast({
        title: "Error loading dashboard",
        description: err.message || "Please try refreshing the page",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    // Only run fetchData on the client side
    if (typeof window !== "undefined") {
      fetchData()
    }
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login")

      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      })
    } catch (err: any) {
      toast({
        title: "Error signing out",
        description: err.message || "Please try again",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">MyGenius.ID Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your Supercivilization profile</p>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Refresh Button */}
        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={fetchData} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </>
            )}
          </Button>
        </div>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {user && (
              <>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <p>
                    <span className="font-medium">Email:</span> {user.email}
                  </p>
                  <p>
                    <span className="font-medium">Name:</span> {user.name}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <Badge variant={user.status === "active" ? "default" : "outline"}>{user.status}</Badge>
                  </p>
                  <p>
                    <span className="font-medium">Reputation:</span>{" "}
                    <Badge variant="secondary">{user.reputation}</Badge>
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* My Invites Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">My Invites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {invites.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No invites sent yet</p>
              ) : (
                invites.map((invite) => (
                  <Card key={invite.id} className="p-3 border">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <p>
                          <span className="font-medium">Code:</span> {invite.code}
                        </p>
                        <p>
                          <span className="font-medium">Invitee:</span> {invite.inviteeName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(invite.created_at).toLocaleDateString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Expires: {new Date(invite.expires_at).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          invite.status === "active"
                            ? "default"
                            : invite.status === "rejected"
                              ? "destructive"
                              : invite.isExpired
                                ? "outline"
                                : invite.is_used
                                  ? "secondary"
                                  : "default"
                        }
                      >
                        {invite.isExpired ? "Expired" : invite.status}
                      </Badge>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Verification History Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Verification History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
              {verifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No verifications yet</p>
              ) : (
                verifications.map((v) => (
                  <Card key={v.id} className="p-3 border">
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                        <p>
                          <span className="font-medium">Member:</span> {v.memberName}
                        </p>
                        <Badge variant={v.confirmed ? "default" : "destructive"}>
                          {v.confirmed ? "Confirmed" : "Rejected"}
                        </Badge>
                      </div>
                      <p>
                        <span className="font-medium">Reason:</span> {v.reason}
                      </p>
                      <p className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleDateString()}</p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild className="flex-1">
            <Link href="/invite">
              <UserPlus className="mr-2 h-4 w-4" />
              Invite a Friend
            </Link>
          </Button>
          <Button asChild variant="outline" className="flex-1">
            <Link href="/verify">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Verify Members
            </Link>
          </Button>
        </div>

        <Separator />

        {/* Sign Out Button */}
        <Button variant="ghost" className="w-full text-destructive hover:text-destructive" onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

