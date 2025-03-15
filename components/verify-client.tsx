"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { verifyUser } from "@/actions/user-actions"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react"

interface PendingUser {
  id: string
  user_id: string
  name: string
  email: string
  created_at: string
  inviter?: {
    name: string
  }
}

interface VerifyClientProps {
  pendingUsers: PendingUser[]
}

export default function VerifyClient({ pendingUsers }: VerifyClientProps) {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null)
  const [showRejectionForm, setShowRejectionForm] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.location.reload()
  }

  const handleVerify = async (user: PendingUser) => {
    setIsSubmitting(true)

    try {
      await verifyUser(user.user_id, true)

      toast({
        title: "User verified",
        description: `You have verified ${user.name}`,
      })

      // Remove the user from the list
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to verify user",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = (user: PendingUser) => {
    setSelectedUser(user)
    setShowRejectionForm(true)
    setRejectionReason("")
  }

  const submitRejection = async () => {
    if (!selectedUser) return

    setIsSubmitting(true)

    try {
      await verifyUser(selectedUser.user_id, false, rejectionReason)

      toast({
        title: "User rejected",
        description: `You have rejected ${selectedUser.name}`,
      })

      setShowRejectionForm(false)
      setSelectedUser(null)

      // Remove the user from the list
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to reject user",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const cancelRejection = () => {
    setShowRejectionForm(false)
    setSelectedUser(null)
    setRejectionReason("")
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Verify Members</h1>
        <p className="text-muted-foreground mt-2">Review and verify pending members</p>
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
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
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

        {showRejectionForm && selectedUser ? (
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">Reject Member</h3>
              <p>Please provide a reason for rejecting {selectedUser.name}</p>

              <Textarea
                placeholder="Reason for rejection"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
                disabled={isSubmitting}
              />

              <div className="flex justify-end space-x-2 pt-2">
                <Button variant="outline" onClick={cancelRejection} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={submitRejection} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Confirm Rejection"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : pendingUsers.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="flex flex-col items-center justify-center space-y-3">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <h3 className="text-xl font-medium">No Pending Members</h3>
                <p className="text-muted-foreground">There are no members waiting for verification at this time.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Pending Members ({pendingUsers.length})</h2>
            {pendingUsers.map((user) => (
              <Card key={user.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <div>
                        <h3 className="text-lg font-medium">{user.name}</h3>
                        <p className="text-muted-foreground">{user.email}</p>
                      </div>
                      <Badge variant="outline">Pending Verification</Badge>
                    </div>

                    <div className="text-sm">
                      <p>
                        <span className="font-medium">Invited by:</span> {user.inviter?.name || "Unknown"}
                      </p>
                      <p>
                        <span className="font-medium">Joined:</span> {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>

                    <Separator />

                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => handleVerify(user)}
                        disabled={isSubmitting}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Verify
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1 text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-900 dark:hover:bg-red-950/20"
                        onClick={() => handleReject(user)}
                        disabled={isSubmitting}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

