import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Copy, Mail, Share } from "lucide-react"
import { createClient } from "@supabase/supabase-js"

export function InviteFriend() {
  const [emails, setEmails] = useState<string[]>([])
  const [currentEmail, setCurrentEmail] = useState("")
  const [message, setMessage] = useState("")
  const [inviteLink, setInviteLink] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState("")

  const generateInviteLink = async () => {
    try {
      setStatus("loading")
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      const { data, error } = await supabase
        .from("invite_codes")
        .insert([{ created_by: supabase.auth.getUser() }])
        .select()
        .single()

      if (error) throw error

      const link = `${window.location.origin}/join?code=${data.code}`
      setInviteLink(link)
      setStatus("success")
    } catch (err) {
      setStatus("error")
      setError("Failed to generate invite link")
    }
  }

  const sendInvites = async () => {
    try {
      setStatus("loading")
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      // Call your serverless function to send emails
      const { error } = await supabase.functions.invoke("send-invites", {
        body: { emails, message, inviteLink },
      })

      if (error) throw error

      setStatus("success")
      setEmails([])
      setMessage("")
    } catch (err) {
      setStatus("error")
      setError("Failed to send invites")
    }
  }

  const addEmail = (email: string) => {
    if (email && !emails.includes(email)) {
      setEmails([...emails, email])
      setCurrentEmail("")
    }
  }

  const removeEmail = (email: string) => {
    setEmails(emails.filter((e) => e !== email))
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink)
  }

  const shareInviteLink = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: "Join Supercivilization",
        text: message || "Join me on Supercivilization!",
        url: inviteLink,
      })
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Invite Friends</CardTitle>
        <CardDescription>
          Invite your friends to join Supercivilization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Generate Invite Link */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={generateInviteLink}
              disabled={status === "loading"}
            >
              Generate Invite Link
            </Button>
            {inviteLink && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyInviteLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                {typeof navigator !== 'undefined' && navigator.share && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={shareInviteLink}
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                )}
              </>
            )}
          </div>
          {inviteLink && (
            <Input
              value={inviteLink}
              readOnly
              className="font-mono text-sm"
            />
          )}
        </div>

        {/* Email Invites */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email Addresses</Label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="friend@example.com"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addEmail(currentEmail)
                  }
                }}
              />
              <Button
                onClick={() => addEmail(currentEmail)}
                disabled={!currentEmail}
              >
                Add
              </Button>
            </div>
          </div>

          {emails.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {emails.map((email) => (
                <Badge
                  key={email}
                  variant="secondary"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-3 w-3" />
                  {email}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => removeEmail(email)}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <Label>Personal Message (Optional)</Label>
            <Textarea
              placeholder="Add a personal message to your invitation..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        {/* Status Messages */}
        {status === "error" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {status === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              {emails.length > 0
                ? "Invitations sent successfully!"
                : "Invite link generated successfully!"}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={sendInvites}
          disabled={emails.length === 0 || status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Invites"}
        </Button>
      </CardFooter>
    </Card>
  )
} 