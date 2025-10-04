"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff, CheckCircle, AlertCircle, Mail, User, AtSign, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProgressIndicator from "./progress-indicator"
import { contrastSafeText, focusVisible } from "@/lib/ui-utils"

interface Step3Props {
  onComplete: () => void
  timeLeft: string
  colors?: any
}

export default function Step3CreateAccount({ onComplete, timeLeft: _timeLeft, colors: _colors }: Step3Props) {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [passwordStrength, setPasswordStrength] = useState<{ score: number; label: string; color: string }>({
    score: 0,
    label: "",
    color: "",
  })

  // Auto-generate username from display name
  const generateUsername = (displayName: string): string => {
    return displayName
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '')
      .substring(0, 20)
  }

  const validateEmail = (email: string) => {
    if (!email) return "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email format"
    return null
  }

  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/[A-Z]/.test(password)) return "Password must contain an uppercase letter"
    if (!/[a-z]/.test(password)) return "Password must contain a lowercase letter"
    if (!/[0-9]/.test(password)) return "Password must contain a number"
    return null
  }

  const calculatePasswordStrength = (password: string): { score: number; label: string; color: string } => {
    if (!password) return { score: 0, label: "", color: "" }

    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password)) score++
    if (/[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++

    if (score <= 2) return { score: 1, label: "Weak", color: "text-red-400" }
    if (score <= 4) return { score: 2, label: "Fair", color: "text-yellow-400" }
    if (score <= 5) return { score: 3, label: "Good", color: "text-cyan-400" }
    return { score: 4, label: "Strong", color: "text-emerald-400" }
  }

  // Real-time password strength calculation
  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password))
  }, [formData.password])

  // Real-time validation for touched fields
  useEffect(() => {
    const newErrors: Record<string, string> = {}

    if (touchedFields.displayName && !formData.displayName) {
      newErrors.displayName = "Display name is required"
    }

    if (touchedFields.email) {
      const emailError = validateEmail(formData.email)
      if (emailError) newErrors.email = emailError
    }

    if (touchedFields.password) {
      const passwordError = validatePassword(formData.password)
      if (passwordError) newErrors.password = passwordError
    }

    if (touchedFields.confirmPassword && formData.confirmPassword) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
  }, [formData, touchedFields])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.displayName) newErrors.displayName = "Display name is required"

    const emailError = validateEmail(formData.email)
    if (emailError) newErrors.email = emailError

    const passwordError = validatePassword(formData.password)
    if (passwordError) newErrors.password = passwordError

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    setIsSubmitting(true)

    // Generate username for future use
    // const username = generateUsername(formData.displayName)

    // TODO: Implement Supabase signup
    // const { data, error } = await supabase.auth.signUp({
    //   email: formData.email,
    //   password: formData.password,
    //   options: {
    //     data: {
    //       display_name: formData.displayName,
    //       username: username,
    //     }
    //   }
    // })

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    onComplete()
  }

  const canSubmit =
    formData.displayName && formData.email && formData.password && formData.confirmPassword

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-cyan-500/20 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-cyan-500/20 pointer-events-none" />

        <div className="relative z-10">
          <ProgressIndicator currentStep={3} stepTitle="Create Account" estimatedMinutes={3} />
          <div className="mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Create Your Account</h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Choose your identity and create your secure account.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
            {/* Display Name */}
            <div>
              <Label htmlFor="displayName" className="block text-sm sm:text-base font-semibold text-slate-100 mb-2.5 flex items-center gap-2">
                <User className="w-4 h-4" />
                Display Name
              </Label>
              <Input
                id="displayName"
                type="text"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                onBlur={() => setTouchedFields({ ...touchedFields, displayName: true })}
                placeholder="Your preferred name"
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border rounded-xl text-white placeholder-white/40 text-base focus:border-teal-400/70 focus:ring-4 focus:ring-teal-500/20 transition-all ${focusVisible.default} ${errors.displayName ? 'border-red-400/50' : 'border-cyan-400/30'}`}
              />
              <p className="mt-1.5 text-xs text-slate-300">
                This is how other members will see you
              </p>
              {formData.displayName && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2 flex items-center gap-2 text-xs text-cyan-300"
                >
                  <AtSign className="w-3 h-3" />
                  <span className="font-mono">@{generateUsername(formData.displayName) || 'username_preview'}</span>
                  <span className="text-slate-300">(auto-generated username)</span>
                </motion.div>
              )}
              {errors.displayName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-cyan-300 flex items-center gap-2 bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-cyan-600/10 rounded-lg p-2.5 border border-teal-400/30"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errors.displayName}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm sm:text-base font-semibold text-slate-100 mb-2.5 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onBlur={() => setTouchedFields({ ...touchedFields, email: true })}
                placeholder="your@email.com"
                className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border rounded-xl text-white placeholder-white/40 text-base focus:border-teal-400/70 focus:ring-4 focus:ring-teal-500/20 transition-all ${focusVisible.default} ${errors.email ? 'border-red-400/50' : 'border-cyan-400/30'}`}
              />
              <p className="mt-1.5 text-xs text-slate-300">
                We'll send you a verification link
              </p>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-cyan-300 flex items-center gap-2 bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-cyan-600/10 rounded-lg p-2.5 border border-teal-400/30"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-sm sm:text-base font-semibold text-slate-100 mb-2.5 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  onBlur={() => setTouchedFields({ ...touchedFields, password: true })}
                  placeholder="Create a strong password"
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border rounded-xl text-white placeholder-white/40 pr-14 text-base focus:border-teal-400/50 focus:ring-4 focus:ring-teal-500/20 transition-all ${focusVisible.default} ${errors.password ? 'border-red-400/50' : 'border-cyan-400/30'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.password && passwordStrength.label && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-2"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-300">Password Strength:</span>
                    <span className={`text-xs font-semibold ${passwordStrength.color} ${contrastSafeText.muted}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                      transition={{ duration: 0.3 }}
                      className={`h-full ${
                        passwordStrength.score === 1 ? 'bg-red-400' :
                        passwordStrength.score === 2 ? 'bg-yellow-400' :
                        passwordStrength.score === 3 ? 'bg-cyan-400' :
                        'bg-emerald-400'
                      }`}
                    />
                  </div>
                </motion.div>
              )}
              <p className={`mt-1.5 text-xs text-slate-300 ${contrastSafeText.muted}`}>
                Min 8 characters, include uppercase, lowercase, and number
              </p>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-cyan-300 flex items-center gap-2 bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-cyan-600/10 rounded-lg p-2.5 border border-teal-400/30"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="block text-sm sm:text-base font-semibold text-slate-100 mb-2.5">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  onBlur={() => setTouchedFields({ ...touchedFields, confirmPassword: true })}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border rounded-xl text-white placeholder-white/40 pr-14 text-base focus:border-teal-400/50 focus:ring-4 focus:ring-teal-500/20 transition-all ${focusVisible.default} ${errors.confirmPassword ? 'border-red-400/50' : 'border-cyan-400/30'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formData.confirmPassword && !errors.confirmPassword && formData.password === formData.confirmPassword && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2 flex items-center gap-2 text-xs text-emerald-400"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span className={contrastSafeText.muted}>Passwords match</span>
                </motion.div>
              )}
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-cyan-300 flex items-center gap-2 bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-cyan-600/10 rounded-lg p-2.5 border border-teal-400/30"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || isSubmitting}
            className={`w-full text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all ${
              canSubmit && !isSubmitting
                ? "bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-700 hover:from-cyan-700 hover:via-teal-700 hover:to-cyan-800 shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40"
                : "bg-gray-600/50 cursor-not-allowed opacity-50"
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mr-2 inline-block" />
                Creating Account...
              </>
            ) : canSubmit ? (
              <>
                Create Account
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Fill All Fields
                <CheckCircle className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
