"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { UserPlus, ShieldCheck, LogOut, RefreshCw } from "lucide-react"

interface Profile {
  id: string
  user_id: string
  name: string
  email: string
  status: string
  role: string
  reputation: number
  created_at: string
}

interface Invite {
  id: string
  code: string
  created_at: string
  expires_at: string
  is_used: boolean
  invitee?: {
    name: string
    status: string
  }
}

interface Verification {
  id: string
  confirmed: boolean
  reason: string | null
  created_at: string
  invitee: {
    name: string
    status: string
  }
}

interface DashboardClientProps {
  profile: Profile
  invites: Invite[]
  verifications: Verification[]
}

export default function DashboardClient({ profile, invites, verifications }: DashboardClientProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.location.reload()
  }

  const handleSignOut = async () => {
    try {
      const { createSupabaseClient } = await import("@/lib/supabase/client")
      const supabase = createSupabaseClient()
      await supabase.auth.signOut()
      router.push("/login")

      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      })
    } catch (error) {
      toast({
        title: "Error signing out",
        description: error instanceof Error ? error.message : "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  const isExpired = (expiryDate: string): boolean => {
    return new Date(expiryDate) < new Date()
  }

  const formatExpiryTime = (expiryDate: string): string => {
    const expiry = new Date(expiryDate)
    const now = new Date()

    if (expiry < now) {
      return "Expired"
    }

    const diffMs = expiry.getTime() - now.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return `Expires in ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`
    } else if (diffHours < 24) {
      return `Expires in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`
    } else {
      const diffDays = Math.floor(diffHours / 24)
      return `Expires in ${diffDays} day${diffDays !== 1 ? "s" : ""}`
    }
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
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
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
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <p>
                <span className="font-medium">Email:</span> {profile.email}
              </p>
              <p>
                <span className="font-medium">Name:</span> {profile.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <p>
                <span className="font-medium">Status:</span>{" "}
                <Badge variant={profile.status === "active" ? "default" : "outline"}>{profile.status}</Badge>
              </p>
              <p>
                <span className="font-medium">Reputation:</span> <Badge variant="secondary">{profile.reputation}</Badge>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Invites and Verifications */}
        <Tabs defaultValue="invites" className="space-y-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="invites" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span>My Invites</span>
            </TabsTrigger>
            <TabsTrigger value="verifications" className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Verifications</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="invites" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                  {invites.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No invites sent yet</p>
                  ) : (
                    invites.map((invite) => (
                      <Card key={invite.id} className="p-3 border">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <div>
                            <p>
                              <span className="font-medium">Code:</span>{" "}
                              <span className="font-mono">{invite.code}</span>
                            </p>
                            <p>
                              <span className="font-medium">Invitee:</span>{" "}
                              {invite.invitee ? invite.invitee.name : "Pending"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Created: {new Date(invite.created_at).toLocaleDateString()}
                            </p>
                            <p className="text-xs text-muted-foreground">{formatExpiryTime(invite.expires_at)}</p>
                          </div>
                          <Badge
                            variant={
                              invite.is_used ? "secondary" : isExpired(invite.expires_at) ? "outline" : "default"
                            }
                          >
                            {invite.is_used ? "Used" : isExpired(invite.expires_at) ? "Expired" : "Active"}
                          </Badge>
                        </div>

                        {!invite.is_used && !isExpired(invite.expires_at) && (
                          <div className="mt-2">
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={`${window.location.origin}/join?code=${invite.code}`}
                                readOnly
                                className="flex-1 px-3 py-2 text-xs font-mono bg-muted rounded-md"
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(`${window.location.origin}/join?code=${invite.code}`)
                                  toast({
                                    title: "Copied!",
                                    description: "Invite link copied to clipboard",
                                  })
                                }}
                              >
                                Copy
                              </Button>
                            </div>
                          </div>
                        )}
                      </Card>
                    ))
                  )}
                </div>

                <div className="mt-4 flex justify-center">
                  <Button asChild>
                    <Link href="/invite">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Generate New Invite
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="verifications" className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
                  {verifications.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No verifications yet</p>
                  ) : (
                    verifications.map((v) => (
                      <Card key={v.id} className="p-3 border">
                        <div className="space-y-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <p>
                              <span className="font-medium">Member:</span> {v.invitee.name}
                            </p>
                            <Badge variant={v.confirmed ? "default" : "destructive"}>
                              {v.confirmed ? "Confirmed" : "Rejected"}
                            </Badge>
                          </div>
                          {!v.confirmed && v.reason && (
                            <p>
                              <span className="font-medium">Reason:</span> {v.reason}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground">{new Date(v.created_at).toLocaleDateString()}</p>
                        </div>
                      </Card>
                    ))
                  )}
                </div>

                <div className="mt-4 flex justify-center">
                  <Button asChild>
                    <Link href="/verify">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Verify Members
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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

