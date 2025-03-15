"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function JoinSupercivilization() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const inviteCode = searchParams.get("code") || ""

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Sign up the user with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            invite_code: inviteCode,
          },
        },
      })

      if (error) throw error

      setSubmitted(true)
      toast({
        title: "Account created!",
        description: "Please check your email to confirm your account.",
      })
    } catch (error: any) {
      setError(error.message || "Something went wrong. Please try again.")
      toast({
        title: "Error creating account",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-zinc-50 dark:bg-zinc-900 transition-colors duration-500">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-zinc-300/50 dark:bg-zinc-700/50 rounded-full blur-3xl"></div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin mb-4" />
          <p className="text-center">Creating your account...</p>
        </div>
      ) : !submitted ? (
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-xl z-10 transition-all duration-300 hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
              Create Your Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                  hover:border-zinc-400 dark:hover:border-zinc-600
                  focus:border-zinc-500 dark:focus:border-zinc-500
                  transition-all duration-200 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                  hover:border-zinc-400 dark:hover:border-zinc-600
                  focus:border-zinc-500 dark:focus:border-zinc-500
                  transition-all duration-200 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  minLength={6}
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                  hover:border-zinc-400 dark:hover:border-zinc-600
                  focus:border-zinc-500 dark:focus:border-zinc-500
                  transition-all duration-200 shadow-sm"
                />
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Must be at least 6 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteCode">Invite Code</Label>
                <Input
                  id="inviteCode"
                  type="text"
                  placeholder="Enter invite code"
                  value={inviteCode}
                  readOnly
                  className="bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700
                  text-zinc-500 dark:text-zinc-400 font-mono tracking-wider uppercase
                  transition-all duration-200 shadow-sm"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600
                text-white font-medium py-2 transition-all duration-300 shadow-md hover:shadow-lg
                hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20
                focus:ring-2 focus:ring-zinc-500/50 dark:focus:ring-zinc-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
                disabled={isLoading}
              >
                Create Account
              </Button>

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-xl z-10">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4 text-zinc-800 dark:text-zinc-100">Account created!</h2>
            <p className="mb-4 text-zinc-700 dark:text-zinc-300">Please check your email to confirm your account.</p>
            <Link
              href="/login"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:underline transition-colors"
            >
              Return to login
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 