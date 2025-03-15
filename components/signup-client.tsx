"use client"

import { useRouter } from "next/navigation"
import MyGeniusSignupForm from "@/my-genius-signup-form"
import { useToast } from "@/hooks/use-toast"

export default function SignupClient() {
  const router = useRouter()
  const { toast } = useToast()

  const handleSuccess = () => {
    toast({
      title: "Signup successful!",
      description: "Please check your email to confirm your account.",
    })

    // Redirect to login page after successful signup
    setTimeout(() => {
      router.push("/login")
    }, 2000)
  }

  return (
    <div className="container mx-auto py-10">
      <MyGeniusSignupForm inviteCode="GENIUS123" onSuccess={handleSuccess} />
    </div>
  )
}

