import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Authentication Error</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            There was a problem with your authentication
          </p>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            The authentication link you used is invalid or has expired. Please try signing in again.
          </AlertDescription>
        </Alert>

        <div className="flex justify-center">
          <Link href="/login">
            <Button>Return to Login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 