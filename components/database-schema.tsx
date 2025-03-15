"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Key, Shield, Users } from "lucide-react"

export function DatabaseSchema() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Database Schema</h2>
        <p className="text-zinc-600 dark:text-zinc-400">
          Complete reference for the Supercivilization database schema, implemented with Supabase PostgreSQL and Row
          Level Security
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="invites" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Invites
          </TabsTrigger>
          <TabsTrigger value="verifications" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Verifications
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Users Table</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  users
                </Badge>
              </div>
              <CardDescription>Stores extended user profile information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                      <th className="py-2 px-4 text-left font-medium">Column</th>
                      <th className="py-2 px-4 text-left font-medium">Type</th>
                      <th className="py-2 px-4 text-left font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">id</td>
                      <td className="py-2 px-4 font-mono text-sm">uuid</td>
                      <td className="py-2 px-4 text-sm">Primary key, references auth.users.id</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">name</td>
                      <td className="py-2 px-4 font-mono text-sm">text</td>
                      <td className="py-2 px-4 text-sm">User's full name</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">email</td>
                      <td className="py-2 px-4 font-mono text-sm">text</td>
                      <td className="py-2 px-4 text-sm">User's email address</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">status</td>
                      <td className="py-2 px-4 font-mono text-sm">text</td>
                      <td className="py-2 px-4 text-sm">User status (pending, active, rejected)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">reputation</td>
                      <td className="py-2 px-4 font-mono text-sm">integer</td>
                      <td className="py-2 px-4 text-sm">User's reputation score</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">invited_by</td>
                      <td className="py-2 px-4 font-mono text-sm">uuid</td>
                      <td className="py-2 px-4 text-sm">References the user who sent the invite</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">invite_code</td>
                      <td className="py-2 px-4 font-mono text-sm">text</td>
                      <td className="py-2 px-4 text-sm">The invite code used to join</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">created_at</td>
                      <td className="py-2 px-4 font-mono text-sm">timestamp</td>
                      <td className="py-2 px-4 text-sm">When the user was created</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">updated_at</td>
                      <td className="py-2 px-4 font-mono text-sm">timestamp</td>
                      <td className="py-2 px-4 text-sm">When the user was last updated</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="font-medium">Row Level Security Policies</h3>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`-- Users can read their own profile
CREATE POLICY "Users can read own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Admins can read all profiles
CREATE POLICY "Admins can read all profiles"
ON users FOR SELECT
USING (auth.uid() IN (SELECT id FROM users WHERE is_admin = true));`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Invites Table</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  invites
                </Badge>
              </div>
              <CardDescription>Stores invitation codes generated by users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                      <th className="py-2 px-4 text-left font-medium">Column</th>
                      <th className="py-2 px-4 text-left font-medium">Type</th>
                      <th className="py-2 px-4 text-left font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">id</td>
                      <td className="py-2 px-4 font-mono text-sm">uuid</td>
                      <td className="py-2 px-4 text-sm">Primary key</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">code</td>
                      <td className="py-2 px-4 font-mono text-sm">text</td>
                      <td className="py-2 px-4 text-sm">Unique invite code</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">inviter_id</td>
                      <td className="py-2 px-4 font-mono text-sm">uuid</td>
                      <td className="py-2 px-4 text-sm">References the user who created the invite</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">invitee_id</td>
                      <td className="py-2 px-4 font-mono text-sm">uuid</td>
                      <td className="py-2 px-4 text-sm">References the user who used the invite (null if unused)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">used</td>
                      <td className="py-2 px-4 font-mono text-sm">boolean</td>
                      <td className="py-2 px-4 text-sm">Whether the invite has been used</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">created_at</td>
                      <td className="py-2 px-4 font-mono text-sm">timestamp</td>
                      <td className="py-2 px-4 text-sm">When the invite was created</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">expires_at</td>
                      <td className="py-2 px-4 font-mono text-sm">timestamp</td>
                      <td className="py-2 px-4 text-sm">When the invite expires</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="font-medium">Row Level Security Policies</h3>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`-- Users can read their own invites
CREATE POLICY "Users can read own invites"
ON invites FOR SELECT
USING (auth.uid() = inviter_id);

-- Users can create invites
CREATE POLICY "Users can create invites"
ON invites FOR INSERT
WITH CHECK (auth.uid() = inviter_id);

-- Anyone can read an invite by code (for validation)
CREATE POLICY "Anyone can read invite by code"
ON invites FOR SELECT
USING (true);`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Verifications Table</CardTitle>
                <Badge variant="outline" className="font-mono text-xs">
                  verifications
                </Badge>
              </div>
              <CardDescription>Stores verification records for new members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800">
                      <th className="py-2 px-4 text-left font-medium">Column</th>
                      <th className="py-2 px-4 text-left font-medium">Type</th>
                      <th className="py-2 px-4 text-left font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">id</td>
                      <td className="py-2 px-4 font-mono text-sm">uuid</td>
                      <td className="py-2 px-4 text-sm">Primary key</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">invitee_id</td>
                      <td className="py-2 px-4 font-mono text-sm">uuid</td>
                      <td className="py-2 px-4 text-sm">References the user being verified</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">verifier_id</td>
                      <td className="py-2 px-4 font-mono text-sm">uuid</td>
                      <td className="py-2 px-4 text-sm">References the user performing the verification</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">confirmed</td>
                      <td className="py-2 px-4 font-mono text-sm">boolean</td>
                      <td className="py-2 px-4 text-sm">Whether the verification was confirmed or rejected</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">reason</td>
                      <td className="py-2 px-4 font-mono text-sm">text</td>
                      <td className="py-2 px-4 text-sm">Reason for rejection (null if confirmed)</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4 font-mono text-sm">created_at</td>
                      <td className="py-2 px-4 font-mono text-sm">timestamp</td>
                      <td className="py-2 px-4 text-sm">When the verification was performed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="font-medium">Row Level Security Policies</h3>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-md font-mono text-sm overflow-x-auto">
                  <pre>
                    {`-- Users can read verifications they performed
CREATE POLICY "Users can read own verifications"
ON verifications FOR SELECT
USING (auth.uid() = verifier_id);

-- Users can create verifications
CREATE POLICY "Users can create verifications"
ON verifications FOR INSERT
WITH CHECK (auth.uid() = verifier_id);

-- Users can read verifications for their invitees
CREATE POLICY "Users can read verifications for invitees"
ON verifications FOR SELECT
USING (auth.uid() IN (
  SELECT invited_by FROM users WHERE id = invitee_id
));`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

