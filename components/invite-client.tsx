"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { generateInviteCode } from "@/actions/user-actions"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Copy, Check, Clock, Loader2, RefreshCw } from "lucide-react"
import { useEffect } from "react"
import { createSupabaseClient } from "@/lib/supabase/client"

interface Invite {
  id: string
  code: string
  created_at: string
  expires_at: string
  is_used: boolean
  invitee_id?: string
}

interface InviteWithProfile extends Invite {
  invitee?: {
    name: string
  }
}

export default function InviteClient() {
  const { toast } = useToast()
  const [invites, setInvites] = useState<InviteWithProfile[]>([])
  const [expiryTime, setExpiryTime] = useState<string>("24")
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchInvites()
  }, [])

  const fetchInvites = async () => {
    const isRefresh = !isLoading
    if (isRefresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }
    setError(null)

    try {
      const supabase = createSupabaseClient()

      // Fetch invites
      const { data, error: invitesError } = await supabase
        .from("invites")
        .select(`
          id,
          code,
          created_at,
          expires_at,
          is_used,
          invitee_id
        `)
        .order("created_at", { ascending: false })

      if (invitesError) throw invitesError

      // Type assertion for the data
      const typedData = (data || []) as InviteWithProfile[]

      setInvites(typedData)

      if (isRefresh) {
        toast({
          title: "Refreshed",
          description: "Your invites have been updated",
        })
      }
    } catch (err: any) {
      console.error("Error fetching invites:", err)
      setError(err.message || "Failed to load invites")

      toast({
        title: "Error loading invites",
        description: err.message || "Please try refreshing the page",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleGenerateCode = async () => {
    setIsGenerating(true)
    setError(null)

    try {
      const hours = Number.parseInt(expiryTime)
      const invite = await generateInviteCode(hours)

      if (invite) {
        setInvites([invite, ...invites])

        toast({
          title: "Invite code generated",
          description: "Your invite code is ready to share",
        })
      }
    } catch (err: any) {
      console.error("Error generating invite code:", err)
      setError(err.message || "Failed to generate invite code")

      toast({
        title: "Error generating code",
        description: err.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyLink = async (code: string) => {
    try {
      const link = `${window.location.origin}/join?code=${code}`
      await navigator.clipboard.writeText(link)
      setCopied(true)

      toast({
        title: "Link copied!",
        description: "Invite link copied to clipboard",
      })

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Invite a Friend</h1>
        <p className="text-muted-foreground mt-2">Grow our community with trusted friends</p>
      </div>

      <div className="w-full max-w-2xl space-y-6">
        {/* Back and Refresh Buttons */}
        <div className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <Button variant="outline" size="sm" onClick={fetchInvites} disabled={isRefreshing}>
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

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Generate Invite Code</CardTitle>
            <CardDescription>Create a unique invite code to share with someone you trust</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <div className="bg-red-50 text-red-800 p-3 rounded-md text-sm">{error}</div>}

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-time">Invite Expiration</Label>
                <Select value={expiryTime} onValueChange={setExpiryTime} disabled={isGenerating}>
                  <SelectTrigger id="expiry-time">
                    <SelectValue placeholder="Select expiration time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hour</SelectItem>
                    <SelectItem value="6">6 hours</SelectItem>
                    <SelectItem value="12">12 hours</SelectItem>
                    <SelectItem value="24">24 hours</SelectItem>
                    <SelectItem value="48">48 hours</SelectItem>
                    <SelectItem value="168">7 days</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Invite codes automatically expire after the selected time period
                </p>
              </div>

              <Button onClick={handleGenerateCode} className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Invite Code"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* My Invites Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">My Invites</h2>
          {invites.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">You haven't generated any invite codes yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {invites.map((invite) => (
                <Card key={invite.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-mono text-sm bg-muted px-2 py-1 rounded">{invite.code}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Created: {new Date(invite.created_at).toLocaleDateString()}
                          </div>
                        </div>
                        <Badge
                          variant={
                            invite.is_used ? "secondary" : isExpired(invite.expires_at) ? "destructive" : "default"
                          }
                        >
                          {invite.is_used ? "Used" : isExpired(invite.expires_at) ? "Expired" : "Active"}
                        </Badge>
                      </div>

                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatExpiryTime(invite.expires_at)}
                        </div>
                        {invite.invitee_id && (
                          <div>
                            Used by: <span className="font-medium">{(invite as any).invitee?.name || "Unknown"}</span>
                          </div>
                        )}
                      </div>

                      {!invite.is_used && !isExpired(invite.expires_at) && (
                        <div className="flex mt-1">
                          <Input
                            value={`${window.location.origin}/join?code=${invite.code}`}
                            readOnly
                            className="text-xs font-mono flex-1"
                          />
                          <Button onClick={() => copyLink(invite.code)} variant="outline" size="icon" className="ml-2">
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

