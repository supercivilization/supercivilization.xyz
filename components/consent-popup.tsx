import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export function ConsentPopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsent = localStorage.getItem("cookieConsent")
    if (!hasConsent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true")
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "false")
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Cookie Consent</CardTitle>
          <CardDescription>
            We use cookies to enhance your experience and analyze our website traffic.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              By using Supercivilization, you agree to our use of cookies and our Privacy Policy.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant="outline" onClick={handleDecline}>
            Decline
          </Button>
          <Button onClick={handleAccept}>Accept</Button>
        </CardFooter>
      </Card>
    </div>
  )
} 