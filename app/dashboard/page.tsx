"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser()
        if (error) throw error
        setUser(user)
      } catch (error: any) {
        console.error("Error fetching user:", error)
        toast({
          title: "Error",
          description: "Failed to load user data",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [toast])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push("/login")
    } catch (error: any) {
      console.error("Error signing out:", error)
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-900">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-600 dark:text-zinc-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 bg-zinc-50 dark:bg-zinc-900 transition-colors duration-500">
      <div className="max-w-4xl mx-auto space-y-4">
        <Card className="backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">Welcome to Dashboard</CardTitle>
            <CardDescription className="text-zinc-600 dark:text-zinc-400">
              You are logged in as {user?.email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 