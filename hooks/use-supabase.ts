"use client"

import { useEffect, useState } from "react"
import { getSupabaseClient } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { AppError, ErrorType } from "@/lib/error-handling"

export function useSupabase() {
  const supabase = getSupabaseClient()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<AppError | null>(null)

  // Helper to handle errors consistently
  const handleError = (err: unknown) => {
    console.error("Supabase error:", err)

    let appError: AppError

    if (err instanceof AppError) {
      appError = err
    } else if (err instanceof Error) {
      appError = new AppError(err.message, ErrorType.SERVER_ERROR, 500)
    } else {
      appError = new AppError("An unknown error occurred", ErrorType.UNKNOWN, 500)
    }

    setError(appError)

    toast({
      variant: "destructive",
      title: "Error",
      description: appError.toUserMessage(),
    })

    return appError
  }

  // Clear error on unmount
  useEffect(() => {
    return () => {
      setError(null)
    }
  }, [])

  return {
    supabase,
    isLoading,
    setIsLoading,
    error,
    setError,
    handleError,
  }
}

