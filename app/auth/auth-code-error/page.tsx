"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, ArrowLeft, Mail, RefreshCw } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const errorCode = searchParams.get("error") || "unknown"

  const getErrorMessage = (code: string): string => {
    switch (code) {
      case "missing_code":
        return "The authentication link is incomplete or invalid."
      case "expired_code":
        return "The authentication link has expired."
      case "invalid_code":
        return "The authentication link is invalid or has already been used."
      case "unexpected":
        return "An unexpected error occurred during authentication."
      default:
        return `Authentication error: ${code}`
    }
  }

  const getErrorDescription = (code: string): string => {
    switch (code) {
      case "missing_code":
      case "invalid_code":
      case "expired_code":
        return "Please request a new authentication link to continue."
      case "unexpected":
        return "Please try again or contact support if the problem persists."
      default:
        return "Please try again or contact our support team if the issue continues."
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-amber-500" />
            Authentication Failed
          </CardTitle>
          <CardDescription>
            There was a problem with your authentication link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {getErrorMessage(errorCode)}
            </AlertDescription>
          </Alert>
          
          <div className="text-sm text-muted-foreground">
            <p>{getErrorDescription(errorCode)}</p>
          </div>

          <div className="flex flex-col space-y-2">
            <Link href="/login">
              <Button className="w-full" variant="default">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Return to Login
              </Button>
            </Link>
            
            <Link href="/reset-password">
              <Button className="w-full" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset Password
              </Button>
            </Link>

            <Link href="/login">
              <Button className="w-full" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Request Magic Link
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
          <p>
            If you continue to experience issues, please contact our support team at{" "}
            <a href="mailto:support@supercivilization.com" className="underline hover:text-foreground">
              support@supercivilization.com
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
} 