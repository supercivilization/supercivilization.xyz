"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Eye, EyeOff, CheckCircle, AlertCircle, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Step3Props {
  onComplete: () => void
  timeLeft: string
}

export default function Step3CreateAccount({ onComplete }: Step3Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    accountName: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName) newErrors.fullName = "Full name is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!formData.accountName) newErrors.accountName = "Account name is required"
    if (!formData.password) newErrors.password = "Password is required"
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onComplete()
    }
  }

  const canSubmit =
    formData.fullName && formData.email && formData.accountName && formData.password && formData.confirmPassword

  return (
    <div className="max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-500/20 via-transparent to-cyan-500/20 pointer-events-none" />

        <div className="relative z-10">
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3">Create Your Account</h2>
            <p className="text-sm sm:text-base text-cyan-100/90 leading-relaxed">
              This information will be verified during your induction ceremony.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
            <div>
              <label className="block text-sm sm:text-base font-semibold text-cyan-200 mb-2.5">Full Legal Name</label>
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="As it appears on government ID"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 text-base focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
              />
              {errors.fullName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-300 flex items-center gap-2 bg-red-500/10 rounded-lg p-2.5 border border-red-400/30"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.fullName}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-cyan-200 mb-2.5">Email Address</label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 text-base focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-300 flex items-center gap-2 bg-red-500/10 rounded-lg p-2.5 border border-red-400/30"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-cyan-200 mb-2.5">Account Name</label>
              <Input
                type="text"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value.toLowerCase() })}
                placeholder="username"
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 font-mono text-base focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
              />
              {errors.accountName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-300 flex items-center gap-2 bg-red-500/10 rounded-lg p-2.5 border border-red-400/30"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.accountName}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-cyan-200 mb-2.5">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create a strong password"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 pr-14 text-base focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-300 flex items-center gap-2 bg-red-500/10 rounded-lg p-2.5 border border-red-400/30"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-cyan-200 mb-2.5">Confirm Password</label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Re-enter your password"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 pr-14 text-base focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-500/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-300 flex items-center gap-2 bg-red-500/10 rounded-lg p-2.5 border border-red-400/30"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>
          </div>

          <motion.div
            className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-cyan-400/30 mb-6 sm:mb-8 shadow-lg"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3">
              <Lock className="w-5 h-5 text-cyan-300 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-cyan-100 leading-relaxed">
                <strong className="text-white">Privacy Note:</strong> Your full legal name will only be visible to your
                verification team during the ceremony. Your account name is what other members will see.
              </p>
            </div>
          </motion.div>

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all ${
              canSubmit
                ? "bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40"
                : "bg-gray-600/50 cursor-not-allowed"
            }`}
          >
            {canSubmit ? (
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
