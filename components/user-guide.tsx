"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, FileCheck, Home, LayoutDashboard, Shield, User, UserPlus } from "lucide-react"

export function UserGuide() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">User Guide</h2>
        <p className="text-zinc-600 dark:text-zinc-400">Complete guide for using the Supercivilization platform</p>
      </div>

      <Tabs defaultValue="getting-started" className="space-y-4">
        <TabsList>
          <TabsTrigger value="getting-started" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Getting Started
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="invites" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Invites
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Verification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                Getting Started
              </CardTitle>
              <CardDescription>Introduction to the Supercivilization platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Welcome to Supercivilization</h3>
                <p>
                  Supercivilization is an invite-only community platform built on the concept of trust and verification.
                  To join, you need an invite code from an existing member, and your account must be verified by two
                  other members before gaining full access.
                </p>
                <p>
                  This guide will walk you through the process of joining, setting up your account, and using the
                  platform's features.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">The Prime Law</h3>
                <p>
                  Supercivilization is governed by The Prime Law, a simple set of principles that all members agree to:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>No starting fights, scams, or pushing others</li>
                  <li>You can defend yourself</li>
                  <li>These rules don't change</li>
                </ul>
                <p>
                  These principles form the foundation of our community and are explicitly agreed to during the signup
                  process.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Key Features</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <UserPlus className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="font-medium">Invitation System</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Generate unique invite codes to bring new members into the community.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Shield className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="font-medium">Verification Process</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        New members require verification from two existing members before gaining full access.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <FileCheck className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="font-medium">Reputation System</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Build reputation through positive contributions to the community.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <LayoutDashboard className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                    </div>
                    <div>
                      <h4 className="font-medium">Dashboard</h4>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Manage your profile, invites, and verification activities from a central dashboard.
                      </p>
                    </div>
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Design & Experience</h3>
                <p>Supercivilization features a clean, modern design built with:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Inter Font:</strong> A clean, modern typeface designed for excellent readability on screens
                    of all sizes.
                  </li>
                  <li>
                    <strong>Zinc Color Palette:</strong> A sophisticated monochromatic color scheme that provides
                    excellent contrast and accessibility.
                  </li>
                  <li>
                    <strong>Dark Mode Support:</strong> Full dark mode support that respects your system preferences.
                  </li>
                  <li>
                    <strong>Responsive Design:</strong> The platform works seamlessly across all device sizes, from
                    mobile to desktop.
                  </li>
                </ul>
                <p className="mt-2">
                  This consistent design system ensures a cohesive, accessible experience throughout the platform.
                </p>
              </section>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                Account Management
              </CardTitle>
              <CardDescription>Creating and managing your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Creating Your Account</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Get an invite code</strong> from an existing member of Supercivilization.
                  </li>
                  <li>
                    <strong>Visit the join page</strong> and enter your invite code.
                  </li>
                  <li>
                    <strong>Fill out the registration form</strong> with your email, name, and password.
                  </li>
                  <li>
                    <strong>Agree to The Prime Law</strong> by clicking the "Agree" button in the consent popup.
                  </li>
                  <li>
                    <strong>Verify your email</strong> by clicking the link sent to your email address.
                  </li>
                  <li>
                    <strong>Wait for verification</strong> from two existing members before gaining full access.
                  </li>
                </ol>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Logging In</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Visit the login page</strong> at <code>/login</code>.
                  </li>
                  <li>
                    <strong>Enter your email and password</strong> in the login form.
                  </li>
                  <li>
                    <strong>Click "Login"</strong> to access your account.
                  </li>
                </ol>
                <p>If you forget your password, click the "Forgot password?" link on the login page to reset it.</p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Resetting Your Password</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Visit the reset password page</strong> at <code>/reset-password</code>.
                  </li>
                  <li>
                    <strong>Enter your email address</strong> in the form.
                  </li>
                  <li>
                    <strong>Click "Send Reset Link"</strong> to receive a password reset email.
                  </li>
                  <li>
                    <strong>Check your email</strong> and click the reset link.
                  </li>
                  <li>
                    <strong>Enter your new password</strong> and confirm it.
                  </li>
                  <li>
                    <strong>Click "Update Password"</strong> to save your new password.
                  </li>
                </ol>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Account Status</h3>
                <p>Your account can have one of the following statuses:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                    <strong>Pending:</strong> Your account has been created but is awaiting verification.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                    <strong>Active:</strong> Your account has been verified and has full access.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                    <strong>Rejected:</strong> Your account has been rejected during verification.
                  </li>
                </ul>
              </section>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                Invitation System
              </CardTitle>
              <CardDescription>Generating and managing invite codes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Generating Invite Codes</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Navigate to the invite page</strong> at <code>/invite</code>.
                  </li>
                  <li>
                    <strong>Click "Generate Invite Code"</strong> to create a new invite code.
                  </li>
                  <li>
                    <strong>Copy the invite code or link</strong> using the copy button.
                  </li>
                  <li>
                    <strong>Share the invite code or link</strong> with someone you trust.
                  </li>
                </ol>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Best Practice
                  </p>
                  <p className="text-sm mt-1">
                    Only invite people you personally know and trust. Your reputation is affected by the behavior of
                    people you invite.
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Tracking Your Invites</h3>
                <p>You can track the status of your invites on your dashboard:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Pending:</strong> The invite code has been generated but not yet used.
                  </li>
                  <li>
                    <strong>Used:</strong> Someone has signed up using your invite code and is awaiting verification.
                  </li>
                  <li>
                    <strong>Active:</strong> The person you invited has been verified and is now an active member.
                  </li>
                  <li>
                    <strong>Rejected:</strong> The person you invited was rejected during verification.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Reputation Impact</h3>
                <p>Your invites affect your reputation in the community:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>+10 reputation</strong> when someone you invited becomes an active member.
                  </li>
                  <li>
                    <strong>-5 reputation</strong> when someone you invited is rejected.
                  </li>
                </ul>
                <p>
                  This system encourages members to be selective about who they invite, ensuring the community remains
                  high-quality.
                </p>
              </section>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                Verification Process
              </CardTitle>
              <CardDescription>Verifying new members and getting verified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Getting Verified</h3>
                <p>
                  After creating your account, you need to be verified by two existing members before gaining full
                  access:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Complete the signup process</strong> with a valid invite code.
                  </li>
                  <li>
                    <strong>Verify your email address</strong> by clicking the link sent to your email.
                  </li>
                  <li>
                    <strong>Wait for verification</strong> from two existing members.
                  </li>
                  <li>
                    <strong>Receive notification</strong> when your account is activated.
                  </li>
                </ol>
                <p>
                  The person who invited you will typically be one of your verifiers, but you'll need at least one more.
                </p>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Verifying Others</h3>
                <p>As an active member, you can verify new members:</p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Navigate to the verify page</strong> at <code>/verify</code>.
                  </li>
                  <li>
                    <strong>Review the pending members</strong> in the verification queue.
                  </li>
                  <li>
                    <strong>Click "Confirm"</strong> to verify a member you trust.
                  </li>
                  <li>
                    <strong>Click "Reject"</strong> to reject a member you don't trust or don't know.
                  </li>
                  <li>
                    <strong>Provide a reason</strong> if rejecting a member.
                  </li>
                </ol>
                <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Verification Guidelines
                  </p>
                  <ul className="text-sm mt-1 list-disc pl-5 space-y-1">
                    <li>Only verify people you personally know and trust</li>
                    <li>Consider whether the person will uphold The Prime Law</li>
                    <li>Don't verify someone just because they were invited by someone you know</li>
                    <li>If in doubt, don't verify</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-3">
                <h3 className="text-xl font-semibold">Verification History</h3>
                <p>Your dashboard shows a history of your verification activities:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Members you've confirmed</strong> and when you confirmed them.
                  </li>
                  <li>
                    <strong>Members you've rejected</strong> and the reasons for rejection.
                  </li>
                </ul>
                <p>This history helps maintain transparency and accountability in the verification process.</p>
              </section>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

