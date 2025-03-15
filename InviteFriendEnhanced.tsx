"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Loader2, Clock, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Invite {
  id: string
  code: string
  created_at: string
  expires_at: string
  is_used: boolean
  invitee_name?: string | null
}

// Define the shape of the invitee data from Supabase
interface InviteeData {
  name: string
}

export default function InviteFriendEnhanced() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [invites, setInvites] = useState<Invite[]>([])
  const [expiryTime, setExpiryTime] = useState<string>("24")
  const [isLoading, setIsLoading] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const fetchUserAndInvites = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error: authError } = await supabase.auth.getUser()

        if (authError) throw new Error("Authentication error")

        if (!data.user) {
          router.push("/login")
          return
        }

        setUser(data.user)

        // Fetch existing invites
        const { data: invitesData, error: invitesError } = await supabase
          .from("invites")
          .select("id, code, created_at, expires_at, is_used, invitee:invitee_id(name)")
          .eq("inviter_id", data.user.id)
          .order("created_at", { ascending: false })

        if (invitesError) throw invitesError

        // Format the invites data
        const formattedInvites = invitesData
          ? invitesData.map((invite) => {
              // Handle the case where invitee could be null, an object, or an array
              let inviteeName = null

              if (invite.invitee) {
                // If it's an array, take the first item's name
                if (Array.isArray(invite.invitee) && invite.invitee.length > 0) {
                  inviteeName = invite.invitee[0]?.name || null
                }
                // If it's an object with a name property
                else if (typeof invite.invitee === "object" && "name" in invite.invitee) {
                  inviteeName = (invite.invitee as InviteeData).name
                }
              }

              return {
                id: invite.id,
                code: invite.code,
                created_at: invite.created_at,
                expires_at: invite.expires_at,
                is_used: invite.is_used,
                invitee_name: inviteeName,
              }
            })
          : []

        setInvites(formattedInvites)
      } catch (err: any) {
        console.error("Error fetching data:", err)
        setError(err.message || "Failed to load data. Please try again.")

        toast({
          title: "Error loading data",
          description: err.message || "Please try refreshing the page",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserAndInvites()
  }, [router, toast])

  const generateCode = async () => {
    if (!user) return

    setIsGenerating(true)
    setError(null)

    try {
      // Generate a random code (8 characters, alphanumeric)
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
      let code = ""
      for (let i = 0; i < 8; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length))
      }

      // Calculate expiry time based on selection
      const hoursToAdd = Number.parseInt(expiryTime)
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + hoursToAdd)

      // Save to Supabase
      const { data, error: insertError } = await supabase
        .from("invites")
        .insert({
          code,
          inviter_id: user.id,
          is_used: false,
          created_at: new Date().toISOString(),
          expires_at: expiryDate.toISOString(),
        })
        .select()

      if (insertError) throw insertError

      // Add the new invite to the state
      if (data && data.length > 0) {
        const newInvite: Invite = {
          id: data[0].id,
          code: data[0].code,
          created_at: data[0].created_at,
          expires_at: data[0].expires_at,
          is_used: data[0].is_used,
        }

        setInvites([newInvite, ...invites])
      }

      toast({
        title: "Invite code generated",
        description: "Your invite code is ready to share",
      })
    } catch (err: any) {
      console.error("Error generating invite code:", err)
      setError(err.message || "Failed to generate invite code. Please try again.")

      toast({
        title: "Error generating code",
        description: err.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const copyLink = async (link: string) => {
    try {
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

  const getInviteStatus = (
    invite: Invite,
  ): { label: string; variant: "default" | "secondary" | "outline" | "destructive" } => {
    if (invite.is_used) {
      return { label: "Used", variant: "default" }
    }
    if (isExpired(invite.expires_at)) {
      return { label: "Expired", variant: "destructive" }
    }
    return { label: "Active", variant: "secondary" }
  }

  const formatExpiryTime = (expiryDate: string): string => {
    const expiry = new Date(expiryDate)
    const now = new Date()

    // If expired
    if (expiry < now) {
      return "Expired"
    }

    // Calculate difference in hours
    const diffMs = expiry.getTime() - now.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) {
      // Less than an hour, show minutes
      const diffMinutes = Math.floor(diffMs / (1000 * 60))
      return `Expires in ${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""}`
    } else if (diffHours < 24) {
      // Less than a day, show hours
      return `Expires in ${diffHours} hour${diffHours !== 1 ? "s" : ""}`
    } else {
      // More than a day, show days
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
    <div className="min-h-screen flex flex-col items-center justify-start p-4 pt-12">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Invite a Superachiever</h1>
        <p className="text-muted-foreground mt-2">Grow our community with trusted friends</p>
      </div>

      <Card className="w-full max-w-md bg-white dark:bg-zinc-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Generate Invite Code</CardTitle>
          <CardDescription>Create a unique invite code to share with someone you trust</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

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

            <Button onClick={generateCode} className="w-full" disabled={isGenerating}>
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

          {invites.length > 0 && (
            <div className="pt-4">
              <h3 className="font-medium mb-3">Your Invite Codes</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {invites.map((invite) => {
                  const status = getInviteStatus(invite)
                  return (
                    <Card key={invite.id} className="p-3 border">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div className="font-mono text-sm">{invite.code}</div>
                          <Badge variant={status.variant}>{status.label}</Badge>
                        </div>

                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatExpiryTime(invite.expires_at)}
                          </div>
                          <div>{new Date(invite.created_at).toLocaleDateString()}</div>
                        </div>

                        {invite.invitee_name && (
                          <div className="text-sm">
                            Used by: <span className="font-medium">{invite.invitee_name}</span>
                          </div>
                        )}

                        {!invite.is_used && !isExpired(invite.expires_at) && (
                          <div className="flex mt-1">
                            <Input
                              value={`${window.location.origin}/join?code=${invite.code}`}
                              readOnly
                              className="text-xs font-mono flex-1"
                            />
                            <Button
                              onClick={() => copyLink(`${window.location.origin}/join?code=${invite.code}`)}
                              variant="outline"
                              size="icon"
                              className="ml-2"
                            >
                              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

