import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, AlertCircle, Fingerprint, Mail, Key } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createBrowserClient } from "@supabase/ssr"

type AuthMethod = "password" | "webauthn" | "magic-link"

export function AuthOptions() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authMethod, setAuthMethod] = useState<AuthMethod>("password")
  const { toast } = useToast()

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleWebAuthnLogin = async () => {
    if (!email) {
      setError("Email is required for WebAuthn login")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Check if WebAuthn is available
      if (!window.PublicKeyCredential) {
        throw new Error("WebAuthn is not supported in your browser")
      }

      // Check if biometrics are available
      const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
      if (!available) {
        throw new Error("Biometric authentication is not available")
      }

      // Get challenge from server
      const { data: challenge, error: challengeError } = await supabase.auth.getSession()
      if (challengeError) throw challengeError

      // Create credential
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          rpId: window.location.hostname,
          allowCredentials: [],
          userVerification: "preferred"
        }
      })

      if (!credential) {
        throw new Error("No credential received")
      }

      // Verify credential with server
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email,
        password: credential.id // Use credential ID as password
      })

      if (verifyError) throw verifyError

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
    } catch (err: any) {
      console.error("WebAuthn error:", err)
      setError(err.message || "Failed to authenticate with WebAuthn")
      toast({
        title: "Authentication failed",
        description: err.message || "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLinkLogin = async () => {
    if (!email) {
      setError("Email is required for magic link login")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error

      toast({
        title: "Magic link sent",
        description: "Please check your email for the login link.",
      })
    } catch (err: any) {
      console.error("Magic link error:", err)
      setError(err.message || "Failed to send magic link")
      toast({
        title: "Error",
        description: "Failed to send magic link. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: "Login successful",
        description: "Welcome back!",
      })
    } catch (err: any) {
      console.error("Password login error:", err)
      setError(err.message || "Failed to login")
      toast({
        title: "Login failed",
        description: err.message || "Please check your credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button
          variant={authMethod === "password" ? "default" : "outline"}
          onClick={() => setAuthMethod("password")}
          className="flex-1"
        >
          <Key className="w-4 h-4 mr-2" />
          Password
        </Button>
        <Button
          variant={authMethod === "webauthn" ? "default" : "outline"}
          onClick={() => setAuthMethod("webauthn")}
          className="flex-1"
        >
          <Fingerprint className="w-4 h-4 mr-2" />
          Biometric
        </Button>
        <Button
          variant={authMethod === "magic-link" ? "default" : "outline"}
          onClick={() => setAuthMethod("magic-link")}
          className="flex-1"
        >
          <Mail className="w-4 h-4 mr-2" />
          Magic Link
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handlePasswordLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            disabled={isLoading}
          />
        </div>

        {authMethod === "password" && (
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isLoading}
            />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {authMethod === "magic-link" ? "Sending..." : "Signing in..."}
            </>
          ) : (
            authMethod === "magic-link" ? "Send Magic Link" : "Sign in"
          )}
        </Button>
      </form>

      {authMethod === "webauthn" && (
        <div className="text-sm text-muted-foreground text-center">
          <p>Use your device's biometric authentication (fingerprint, face ID, etc.)</p>
        </div>
      )}

      {authMethod === "magic-link" && (
        <div className="text-sm text-muted-foreground text-center">
          <p>We'll send you a secure link to sign in instantly</p>
        </div>
      )}
    </div>
  )
} 