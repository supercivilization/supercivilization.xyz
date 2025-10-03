"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, CheckCircle, AlertCircle, ArrowRight, Info, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Step1Props {
  onComplete: () => void
  timeLeft: string
}

export default function Step1AcceptInvitation({ onComplete, timeLeft }: Step1Props) {
  const [inviteCode, setInviteCode] = useState("")
  const [validating, setValidating] = useState(false)
  const [validated, setValidated] = useState(false)
  const [error, setError] = useState("")

  const DEMO_INVITE = {
    code: "SC-2025-A7B3",
    inviter: {
      name: "Sarah Chen",
      accountName: "schen",
      memberSince: "March 2024",
      standing: "Excellent",
    },
    witnesses: [
      { name: "Marcus Rivera", accountName: "mrivera", memberSince: "Jan 2024", standing: "Excellent" },
      { name: "Elena Kowalski", accountName: "ekowalski", memberSince: "Feb 2024", standing: "Excellent" },
    ],
  }

  const validateInvite = async () => {
    setValidating(true)
    setError("")

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (inviteCode.toUpperCase() === DEMO_INVITE.code) {
      setValidated(true)
    } else {
      setError("Invalid invitation code. Please check and try again.")
    }

    setValidating(false)
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-10 md:p-12 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-purple-500/20 pointer-events-none" />

        <div className="relative z-10">
          {!validated ? (
            <div className="space-y-6 sm:space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                  <h2 className="text-3xl sm:text-4xl font-bold text-white">Exclusive Invitation</h2>
                </div>
                <p className="text-base sm:text-lg text-purple-100/90 mb-6 leading-relaxed text-pretty">
                  Supercivilization is invitation-only. Entry requires sponsorship from a member in good standing who
                  has assembled a verification team for you.
                </p>

                <motion.div
                  className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-6 border border-purple-400/30 shadow-lg"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-purple-300 flex-shrink-0 mt-0.5" />
                    <div className="text-sm sm:text-base text-purple-100">
                      <strong className="text-purple-200 text-base sm:text-lg block mb-3">Why invitation-only?</strong>
                      <ul className="space-y-2 text-purple-200/90 leading-relaxed">
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>Ensures high-trust relationships</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>Prevents Sybil attacks and bad actors</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>Creates social accountability through sponsor network</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-purple-400 mt-0.5">•</span>
                          <span>Maintains alignment with Prime Law principles</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-base sm:text-lg font-bold text-purple-200 mb-3">Invitation Code</label>
                  <Input
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    onKeyPress={(e) => e.key === "Enter" && !validating && inviteCode && validateInvite()}
                    placeholder="SC-2025-XXXX"
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-white/40 text-lg sm:text-xl font-mono focus:border-purple-400/50 focus:ring-4 focus:ring-purple-500/20 transition-all"
                  />
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2.5 flex items-center gap-2 text-red-300 text-sm sm:text-base bg-red-500/10 rounded-lg p-3 border border-red-400/30"
                    >
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </div>

                <Button
                  onClick={validateInvite}
                  disabled={!inviteCode || validating}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 text-lg sm:text-xl py-5 sm:py-7 rounded-xl font-bold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {validating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Validating...
                    </>
                  ) : (
                    <>
                      Verify Invitation
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <motion.div
                  className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-400/30 rounded-xl p-5 shadow-lg"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-base sm:text-lg text-amber-200 font-semibold">
                    <strong className="text-amber-100">Demo Code:</strong> SC-2025-A7B3
                  </p>
                </motion.div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-5 sm:space-y-6"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="inline-block p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl mb-4 border border-emerald-400/30 shadow-xl"
                >
                  <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-400" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Invitation Verified</h2>
                <p className="text-base sm:text-lg text-purple-200">Your verification team is ready</p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2 sm:mb-3 flex items-center gap-2">
                  <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                  Your Sponsor
                </h3>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-2 sm:mb-3 gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm sm:text-base truncate">
                        {DEMO_INVITE.inviter.name}
                      </div>
                      <div className="text-xs sm:text-sm text-purple-200 font-mono truncate">
                        @{DEMO_INVITE.inviter.accountName}
                      </div>
                    </div>
                    <span className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
                      {DEMO_INVITE.inviter.standing}
                    </span>
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/60">
                    Member since {DEMO_INVITE.inviter.memberSince}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2 sm:mb-3 flex items-center gap-2">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                  Your Witnesses (Pre-assigned)
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {DEMO_INVITE.witnesses.map((witness, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-3 sm:p-4 border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2 gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-sm sm:text-base truncate">{witness.name}</div>
                          <div className="text-xs sm:text-sm text-purple-200 font-mono truncate">
                            @{witness.accountName}
                          </div>
                        </div>
                        <span className="px-2 sm:px-3 py-1 bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs font-medium rounded-full whitespace-nowrap">
                          {witness.standing}
                        </span>
                      </div>
                      <div className="text-[10px] sm:text-xs text-white/60">Member since {witness.memberSince}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-purple-400/30 shadow-lg"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-sm sm:text-base text-purple-100 leading-relaxed">
                  <strong className="text-purple-200 text-sm sm:text-base block mb-2">Next:</strong> Review and
                  acknowledge The Prime Law - the constitutional foundation that governs all interactions within
                  Supercivilization.
                </p>
              </motion.div>

              <Button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all"
              >
                Continue to Prime Law
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
