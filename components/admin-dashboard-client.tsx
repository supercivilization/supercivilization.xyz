"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { updateUserRole, banUser } from "@/actions/admin-actions"
import { useToast } from "@/hooks/use-toast"
import { Users, UserCheck, UserX, Clock, Activity, RefreshCw, Shield } from "lucide-react"

interface AdminStats {
  totalUsers: number
  pendingUsers: number
  activeUsers: number
  totalInvites: number
  usedInvites: number
  conversionRate: number
}

interface User {
  id: string
  user_id: string
  name: string
  email: string
  status: string
  role: string
  created_at: string
}

interface AdminLog {
  id: string
  action: string
  target_table: string
  target_id: string
  created_at: string
  admin: {
    name: string
  }
}

interface AdminDashboardClientProps {
  stats: AdminStats
  recentUsers: User[]
  recentLogs: AdminLog[]
}

export default function AdminDashboardClient({ stats, recentUsers, recentLogs }: AdminDashboardClientProps) {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    window.location.reload()
  }

  const handleRoleUpdate = async (userId: string, newRole: "user" | "moderator" | "admin" | "superadmin") => {
    try {
      await updateUserRole(userId, newRole)
      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update role",
        variant: "destructive",
      })
    }
  }

  const handleBanUser = async (userId: string) => {
    const reason = prompt("Please enter a reason for banning this user:")
    if (!reason) return

    try {
      await banUser(userId, reason)
      toast({
        title: "User banned",
        description: "User has been banned successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to ban user",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button onClick={handleRefresh} disabled={isRefreshing}>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} active ({Math.round((stats.activeUsers / stats.totalUsers) * 100)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingUsers}</div>
            <p className="text-xs text-muted-foreground">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Invite Conversion</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.usedInvites} used out of {stats.totalInvites} invites
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Recent Users</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Admin Logs</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="rounded-md border">
            <div className="bg-muted/50 p-2">
              <div className="grid grid-cols-6 font-medium">
                <div className="col-span-2">User</div>
                <div>Status</div>
                <div>Role</div>
                <div>Joined</div>
                <div>Actions</div>
              </div>
            </div>
            <div className="divide-y">
              {recentUsers.map((user) => (
                <div key={user.id} className="grid grid-cols-6 items-center p-2">
                  <div className="col-span-2">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.email}</div>
                  </div>
                  <div>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : user.status === "pending" ? "secondary" : "destructive"
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>
                  <div>
                    <Badge
                      variant={
                        user.role === "superadmin"
                          ? "destructive"
                          : user.role === "admin"
                            ? "default"
                            : user.role === "moderator"
                              ? "secondary"
                              : "outline"
                      }
                    >
                      {user.role}
                    </Badge>
                  </div>
                  <div className="text-sm">{new Date(user.created_at).toLocaleDateString()}</div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newRole = prompt("Enter new role (user, moderator, admin, superadmin):", user.role)
                        if (newRole && ["user", "moderator", "admin", "superadmin"].includes(newRole)) {
                          handleRoleUpdate(user.user_id, newRole as "user" | "moderator" | "admin" | "superadmin")
                        }
                      }}
                      aria-label={`Change role for ${user.name}`}
                    >
                      <Shield className="h-4 w-4" />
                      <span className="sr-only">Change role</span>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => handleBanUser(user.user_id)}
                      aria-label={`Ban ${user.name}`}
                    >
                      <UserX className="h-4 w-4" />
                      <span className="sr-only">Ban user</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="rounded-md border">
            <div className="bg-muted/50 p-2">
              <div className="grid grid-cols-5 font-medium">
                <div>Admin</div>
                <div>Action</div>
                <div>Target</div>
                <div>ID</div>
                <div>Timestamp</div>
              </div>
            </div>
            <div className="divide-y">
              {recentLogs.map((log) => (
                <div key={log.id} className="grid grid-cols-5 items-center p-2">
                  <div className="font-medium">{log.admin.name}</div>
                  <div>{log.action.replace(/_/g, " ")}</div>
                  <div>{log.target_table}</div>
                  <div className="font-mono text-xs">{log.target_id.substring(0, 8)}...</div>
                  <div className="text-sm">{new Date(log.created_at).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

