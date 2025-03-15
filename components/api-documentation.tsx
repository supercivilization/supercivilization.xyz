"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileJson, Key, Users } from "lucide-react"

export function ApiDocumentation() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">API Reference</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Complete reference for the Supercivilization API endpoints, built natively with Next.js API routes and
          Supabase
        </p>
      </div>

      <Tabs defaultValue="auth" className="space-y-4">
        <TabsList>
          <TabsTrigger value="auth" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Authentication
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="invites" className="flex items-center gap-2">
            <FileJson className="h-4 w-4" />
            Invites
          </TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Authentication Endpoints</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  /api/auth/*
                </Badge>
              </div>
              <CardDescription>Endpoints for user authentication and session management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Signup Endpoint */}
              <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">POST</Badge>
                  <code className="font-mono text-sm">/api/auth/signup</code>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Creates a new user account with the provided information and invite code.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium">Request Body</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe",
  "invite_code": "ABC123XYZ"
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Response</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe",
    "status": "pending"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Login Endpoint */}
              <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">POST</Badge>
                  <code className="font-mono text-sm">/api/auth/login</code>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Authenticates a user and returns a session token.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium">Request Body</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "email": "user@example.com",
  "password": "securepassword"
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Response</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "success": true,
  "session": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "ey5hbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": 1672531200
  },
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Reset Password Endpoint */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">POST</Badge>
                  <code className="font-mono text-sm">/api/auth/reset-password</code>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Sends a password reset link to the user's email.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium">Request Body</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "email": "user@example.com"
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Response</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "success": true,
  "message": "Password reset link sent to email"
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">User Endpoints</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  /api/users/*
                </Badge>
              </div>
              <CardDescription>Endpoints for user management and profile operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Get User Profile Endpoint */}
              <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">GET</Badge>
                  <code className="font-mono text-sm">/api/users/profile</code>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Retrieves the profile information for the authenticated user.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium">Headers</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "Authorization": "Bearer {access_token}"
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Response</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "id": "user_id",
  "email": "user@example.com",
  "name": "John Doe",
  "status": "active",
  "reputation": 25,
  "created_at": "2023-01-01T00:00:00Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Update User Profile Endpoint */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-600">PATCH</Badge>
                  <code className="font-mono text-sm">/api/users/profile</code>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Updates the profile information for the authenticated user.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium">Headers</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "Authorization": "Bearer {access_token}"
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Request Body</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "name": "John Smith",
  "bio": "Software developer and community member"
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Response</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Smith",
    "bio": "Software developer and community member",
    "status": "active",
    "reputation": 25
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Invite Endpoints</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  /api/invites/*
                </Badge>
              </div>
              <CardDescription>Endpoints for managing invitation codes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generate Invite Endpoint */}
              <div className="space-y-3 border-b border-zinc-200 dark:border-zinc-800 pb-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600">POST</Badge>
                  <code className="font-mono text-sm">/api/invites/generate</code>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Generates a new invite code for the authenticated user.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium">Headers</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "Authorization": "Bearer {access_token}"
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Response</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "success": true,
  "invite": {
    "id": "invite_id",
    "code": "ABC123XYZ",
    "created_at": "2023-01-01T00:00:00Z",
    "expires_at": "2023-02-01T00:00:00Z",
    "used": false
  }
}`}
                    </pre>
                  </div>
                </div>
              </div>

              {/* List Invites Endpoint */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-600">GET</Badge>
                  <code className="font-mono text-sm">/api/invites</code>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Lists all invites created by the authenticated user.
                </p>

                <div className="space-y-2">
                  <h4 className="font-medium">Headers</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "Authorization": "Bearer {access_token}"
}`}
                    </pre>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Response</h4>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`{
  "invites": [
    {
      "id": "invite_id_1",
      "code": "ABC123XYZ",
      "created_at": "2023-01-01T00:00:00Z",
      "expires_at": "2023-02-01T00:00:00Z",
      "used": false
    },
    {
      "id": "invite_id_2",
      "code": "DEF456UVW",
      "created_at": "2022-12-01T00:00:00Z",
      "expires_at": "2023-01-01T00:00:00Z",
      "used": true,
      "used_by": {
        "id": "user_id",
        "name": "Jane Doe"
      }
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

