import { ResetPasswordForm } from "@/components/reset-password-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Reset your password to regain access to your account",
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <ResetPasswordForm />
    </div>
  )
}

