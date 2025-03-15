"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, FileCode, KeyRound, Lightbulb, Wrench } from "lucide-react"

export default function Documentation() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Supercivilization Documentation</h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">Complete technical documentation and user guide</p>
        </header>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              <span className="hidden md:inline">Architecture</span>
            </TabsTrigger>
            <TabsTrigger value="auth" className="flex items-center gap-2">
              <KeyRound className="h-4 w-4" />
              <span className="hidden md:inline">Authentication</span>
            </TabsTrigger>
            <TabsTrigger value="features" className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              <span className="hidden md:inline">Features</span>
            </TabsTrigger>
            <TabsTrigger value="setup" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              <span className="hidden md:inline">Setup</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  Application Overview
                </CardTitle>
                <CardDescription>Introduction to the Supercivilization application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">About Supercivilization</h3>
                  <p>
                    Supercivilization is an invite-only community platform built on the concept of MyGenius.ID - a
                    digital identity system that enables trusted connections between members. The platform implements a
                    verification system where new members must be invited by existing members and verified by others
                    before gaining full access.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Core Principles</h3>
                  <p>The platform is built on the principles of The Prime Law:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>No starting fights, scams, or pushing others</li>
                    <li>You can defend yourself</li>
                    <li>These rules don't change</li>
                  </ul>
                  <p>
                    These principles form the foundation of the community's governance and are explicitly agreed to by
                    all members during the signup process.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Key Components</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Invitation System:</strong> Members can generate unique invite codes to bring new people
                      into the community
                    </li>
                    <li>
                      <strong>Verification Process:</strong> New members require verification from existing members
                    </li>
                    <li>
                      <strong>Reputation System:</strong> Members build reputation through positive contributions
                    </li>
                    <li>
                      <strong>MyGenius.ID:</strong> Digital identity that represents a member across the platform
                    </li>
                  </ul>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  Technical Architecture
                </CardTitle>
                <CardDescription>System architecture and technology stack</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Technology Stack</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    Supercivilization is built using a modern, cohesive stack of technologies that work seamlessly
                    together:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Frontend:</strong> Next.js 14 (App Router), React, TypeScript
                    </li>
                    <li>
                      <strong>Styling:</strong> Tailwind CSS with Zinc color palette, shadcn/ui components
                    </li>
                    <li>
                      <strong>Typography:</strong> Inter font family exclusively
                    </li>
                    <li>
                      <strong>Authentication:</strong> Supabase Auth (native Vercel integration)
                    </li>
                    <li>
                      <strong>Database:</strong> PostgreSQL (via Supabase)
                    </li>
                    <li>
                      <strong>Hosting:</strong> Vercel
                    </li>
                  </ul>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                    We've deliberately chosen technologies that are designed to work together natively, avoiding
                    unnecessary dependencies and ensuring optimal performance and maintainability.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Design System</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Typography:</strong> Inter font family exclusively, providing a clean, modern reading
                      experience with excellent legibility across all device sizes.
                    </li>
                    <li>
                      <strong>Color Palette:</strong> Zinc monochromatic color scheme throughout the application,
                      creating a cohesive, sophisticated visual identity while maintaining excellent contrast and
                      accessibility.
                    </li>
                    <li>
                      <strong>Components:</strong> shadcn/ui components, which are built on Radix UI primitives and
                      styled with Tailwind CSS, providing accessible, customizable UI elements.
                    </li>
                    <li>
                      <strong>Dark Mode:</strong> Full dark mode support with seamless transitions, respecting user
                      system preferences.
                    </li>
                    <li>
                      <strong>Responsive Design:</strong> Mobile-first approach ensuring the application works
                      flawlessly across all device sizes.
                    </li>
                  </ul>
                  <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                    This consistent design system ensures a cohesive user experience while maintaining excellent
                    performance and accessibility.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Project Structure</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    The project follows Next.js App Router conventions and best practices:
                  </p>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`supercivilization/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard page
│   ├── invite/             # Invite page
│   ├── join/               # Join page
│   ├── login/              # Login page
│   ├── reset-password/     # Password reset page
│   ├── update-password/    # Update password page
│   ├── verify/             # Verification page
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── ui/                 # UI components (shadcn)
│   ├── ConsentPopup.tsx    # Consent popup component
│   ├── MyGeniusSignupForm.tsx # Signup form component
│   └── theme-toggle.tsx    # Theme toggle component
├── lib/                    # Utility libraries
│   ├── supabase.ts         # Supabase client
│   └── utils.ts            # Utility functions
├── hooks/                  # Custom React hooks
│   ├── use-toast.ts        # Toast notifications hook
│   └── use-mobile.tsx      # Mobile detection hook
├── middleware.ts           # Next.js middleware for auth
├── tailwind.config.ts      # Tailwind configuration
└── package.json            # Project dependencies`}
                    </pre>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Database Schema</h3>
                  <p>The application uses the following key tables in Supabase:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>auth.users:</strong> User authentication data (managed by Supabase Auth)
                    </li>
                    <li>
                      <strong>users:</strong> Extended user profile information
                    </li>
                    <li>
                      <strong>invites:</strong> Invitation codes and their status
                    </li>
                    <li>
                      <strong>verifications:</strong> Member verification records
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Authentication Flow</h3>
                  <p>
                    The application uses Supabase Auth for authentication with a custom middleware to protect routes.
                    The middleware checks for valid sessions and redirects unauthenticated users to the login page.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="auth" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  Authentication & Authorization
                </CardTitle>
                <CardDescription>User authentication flows and security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Authentication Methods</h3>
                  <p>The application uses Supabase Auth with the following authentication methods:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Email/Password:</strong> Traditional email and password authentication
                    </li>
                    <li>
                      <strong>Magic Link:</strong> Passwordless authentication via email links
                    </li>
                    <li>
                      <strong>Password Reset:</strong> Self-service password reset functionality
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Registration Flow</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>User receives an invite code from an existing member</li>
                    <li>User visits the join page with the invite code</li>
                    <li>User enters their email, name, and password</li>
                    <li>User agrees to The Prime Law via the consent popup</li>
                    <li>Account is created with "pending" status</li>
                    <li>User receives a confirmation email to verify their email address</li>
                    <li>User must be verified by two existing members before gaining full access</li>
                  </ol>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Protected Routes</h3>
                  <p>The following routes are protected and require authentication:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>/dashboard:</strong> User dashboard
                    </li>
                    <li>
                      <strong>/invite:</strong> Invite generation page
                    </li>
                    <li>
                      <strong>/verify:</strong> Member verification page
                    </li>
                  </ul>
                  <p>
                    Protection is implemented via Next.js middleware that checks for valid sessions and redirects
                    unauthenticated users to the login page.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Row Level Security</h3>
                  <p>
                    Supabase's Row Level Security (RLS) is used to ensure users can only access their own data. Policies
                    are implemented on all tables to restrict access based on user ID.
                  </p>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  Features & Components
                </CardTitle>
                <CardDescription>Key features and component documentation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">User Management</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Signup Form:</strong> <code>MyGeniusSignupForm</code> component handles user registration
                      with email, name, password, and invite code validation.
                    </li>
                    <li>
                      <strong>Login:</strong> Email/password authentication with "Remember me" functionality.
                    </li>
                    <li>
                      <strong>Password Reset:</strong> Self-service password reset flow with email verification.
                    </li>
                    <li>
                      <strong>Profile Management:</strong> Users can view and update their profile information.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Invitation System</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Invite Generation:</strong> Members can generate unique invite codes to share with
                      potential new members.
                    </li>
                    <li>
                      <strong>Invite Tracking:</strong> Dashboard shows the status of sent invites.
                    </li>
                    <li>
                      <strong>Reputation Impact:</strong> Successful invites increase member reputation, while rejected
                      invites decrease it.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Verification System</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Verification Queue:</strong> Members can view and verify pending members.
                    </li>
                    <li>
                      <strong>Two-Person Verification:</strong> New members require verification from two existing
                      members.
                    </li>
                    <li>
                      <strong>Rejection Mechanism:</strong> Members can reject applicants with a reason.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Dashboard</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Profile Overview:</strong> Shows member status, reputation, and basic information.
                    </li>
                    <li>
                      <strong>Invite History:</strong> List of sent invites and their status.
                    </li>
                    <li>
                      <strong>Verification History:</strong> Record of members verified or rejected.
                    </li>
                    <li>
                      <strong>Quick Actions:</strong> Shortcuts to invite and verify functionality.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">UI Components</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Theme Toggle:</strong> Light/dark mode toggle with system preference detection.
                    </li>
                    <li>
                      <strong>Consent Popup:</strong> Modal for displaying and agreeing to The Prime Law.
                    </li>
                    <li>
                      <strong>Form Components:</strong> Styled input fields, buttons, and form elements.
                    </li>
                    <li>
                      <strong>Toast Notifications:</strong> Non-intrusive notifications for user feedback.
                    </li>
                  </ul>
                </section>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="setup" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
                  Setup & Deployment
                </CardTitle>
                <CardDescription>Environment setup and deployment instructions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Prerequisites</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Node.js 18.x or later</li>
                    <li>npm or yarn package manager</li>
                    <li>Supabase account</li>
                    <li>Vercel account (for deployment)</li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Environment Variables</h3>
                  <p>
                    Create a <code>.env.local</code> file with the following variables:
                  </p>
                  <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <pre>
                      {`# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
SUPABASE_URL=your_supabase_url

# Application
NEXT_PUBLIC_SITE_URL=http://localhost:3000`}
                    </pre>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Local Development</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>
                      Clone the repository:
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md font-mono text-sm mt-1">
                        git clone https://github.com/yourusername/supercivilization.git
                      </div>
                    </li>
                    <li>
                      Install dependencies:
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md font-mono text-sm mt-1">
                        npm install
                      </div>
                    </li>
                    <li>Set up environment variables as described above</li>
                    <li>
                      Run the development server:
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-md font-mono text-sm mt-1">
                        npm run dev
                      </div>
                    </li>
                    <li>
                      Open{" "}
                      <a href="http://localhost:3000" className="text-blue-600 dark:text-blue-400 hover:underline">
                        http://localhost:3000
                      </a>{" "}
                      in your browser
                    </li>
                  </ol>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Database Setup</h3>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Create a new Supabase project</li>
                    <li>
                      Run the SQL setup script from the <code>supabase/migrations</code> folder
                    </li>
                    <li>Set up Row Level Security policies as defined in the documentation</li>
                    <li>Configure authentication providers in the Supabase dashboard</li>
                  </ol>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Deployment</h3>
                  <p>The application is designed to be deployed on Vercel:</p>
                  <ol className="list-decimal pl-5 space-y-2">
                    <li>Push your code to a GitHub repository</li>
                    <li>Create a new project in Vercel and connect it to your repository</li>
                    <li>Configure the environment variables in the Vercel dashboard</li>
                    <li>Deploy the application</li>
                  </ol>
                  <p className="mt-2">
                    For optimal performance, use the Vercel Supabase Integration to automatically configure the
                    connection between your Vercel project and Supabase.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-xl font-semibold">Troubleshooting</h3>
                  <div className="space-y-2">
                    <p>
                      <strong>Issue: Authentication not working</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Verify Supabase environment variables are correctly set</li>
                      <li>Check that the redirect URLs are configured in Supabase Auth settings</li>
                      <li>Ensure cookies are enabled in the browser</li>
                    </ul>
                  </div>

                  <div className="space-y-2 mt-3">
                    <p>
                      <strong>Issue: Database queries failing</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      <li>Verify RLS policies are correctly configured</li>
                      <li>Check that the user has the necessary permissions</li>
                      <li>Ensure the database schema matches the expected structure</li>
                    </ul>
                  </div>
                </section>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

