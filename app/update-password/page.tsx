"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

export default function UpdatePassword() {
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    // Check if we have access to update password
    const checkAccess = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      if (error || !session) {
        toast({
          title: "Access denied",
          description: "Please use a valid password reset link",
          variant: "destructive",
        })
        router.push("/login")
      }
    }
    checkAccess()
  }, [router, toast])

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) throw error

      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      })

      // Sign out the user and redirect to login
      await supabase.auth.signOut()
      router.push("/login")
    } catch (err: any) {
      console.error("Update password error:", err)
      setError(err.message || "Failed to update password")
      toast({
        title: "Update failed",
        description: err.message || "Please try again later",
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

      <Card className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-xl z-10 transition-all duration-300 hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">Update Password</CardTitle>
          <CardDescription className="text-center text-zinc-600 dark:text-zinc-400">
            Enter your new password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={isLoading}
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                  hover:border-zinc-400 dark:hover:border-zinc-600
                  focus:border-zinc-500 dark:focus:border-zinc-500
                  transition-all duration-200 shadow-sm pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-zinc-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-zinc-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                  hover:border-zinc-400 dark:hover:border-zinc-600
                  focus:border-zinc-500 dark:focus:border-zinc-500
                  transition-all duration-200 shadow-sm pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-zinc-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-zinc-500" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600
              text-white font-medium py-2 transition-all duration-300 shadow-md hover:shadow-lg
              hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20
              focus:ring-2 focus:ring-zinc-500/50 dark:focus:ring-zinc-400/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating password...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 