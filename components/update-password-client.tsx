"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

export default function UpdatePasswordClient() {
  const router = useRouter()
  const { toast } = useToast()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isValidLink, setIsValidLink] = useState(true)

  useEffect(() => {
    // Check if we have a valid session from the password reset link
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (error || !data.session) {
        setIsValidLink(false)
        setError("Invalid or expired password reset link. Please request a new one.")
      }
    }

    checkSession()
  }, [])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      })

      if (updateError) throw updateError

      setIsSuccess(true)
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated",
      })

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login")
      }, 3000)
    } catch (err: any) {
      console.error("Update password error:", err)
      setError(err.message || "Failed to update password")

      toast({
        title: "Error",
        description: err.message || "Failed to update password",
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

      <Card
        className="w-full max-w-md backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 
                border border-zinc-200 dark:border-zinc-700 shadow-xl z-10
                transition-all duration-300 hover:shadow-zinc-300/20 dark:hover:shadow-zinc-700/20
                animate-fade-in-up"
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
            Update Password
          </CardTitle>
          <CardDescription className="text-center text-zinc-600 dark:text-zinc-400">
            {isSuccess ? "Your password has been updated" : "Create a new password for your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isValidLink ? (
            <div className="text-center space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button variant="outline" className="mt-4" asChild>
                <Link href="/reset-password">Request new reset link</Link>
              </Button>
            </div>
          ) : isSuccess ? (
            <div className="text-center space-y-4">
              <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-4 rounded-md">
                Password updated successfully! You will be redirected to login.
              </div>
              <Button variant="outline" asChild className="mt-4">
                <Link href="/login">Go to login</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2 group">
                <Label
                  htmlFor="password"
                  className="inline-block transition-colors group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200"
                >
                  New Password
                </Label>
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
                    transition-all duration-200 shadow-sm"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Must be at least 6 characters</p>
              </div>

              <div className="space-y-2 group">
                <Label
                  htmlFor="confirmPassword"
                  className="inline-block transition-colors group-focus-within:text-zinc-800 dark:group-focus-within:text-zinc-200"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                  className="bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 
                  hover:border-zinc-400 dark:hover:border-zinc-600
                  focus:border-zinc-500 dark:focus:border-zinc-500
                  transition-all duration-200 shadow-sm"
                />
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
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </form>
          )}
        </CardContent>
        {!isSuccess && !isValidLink && (
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-zinc-600 dark:text-zinc-400">
              <Link
                href="/login"
                className="text-zinc-800 dark:text-zinc-300 hover:text-zinc-600 dark:hover:text-zinc-100 hover:underline transition-colors"
              >
                Back to login
              </Link>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

