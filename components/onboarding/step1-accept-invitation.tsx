"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Shield, CheckCircle, AlertCircle, ArrowRight, Info, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProgressIndicator from "./progress-indicator"

interface Step1Props {
  onComplete: () => void
  timeLeft: string
  colors?: any
}

export default function Step1AcceptInvitation({ onComplete, timeLeft: _timeLeft, colors: _colors }: Step1Props) {
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
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl  p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-purple-500/20 pointer-events-none" />

        <div className="relative z-10">
          <ProgressIndicator currentStep={1} stepTitle="Accept Invitation" estimatedMinutes={2} />

          {!validated ? (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-shadow mb-3 sm:mb-4 flex items-center gap-3">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-purple-400" />
                  Exclusive Invitation
                </h2>
                <p className="text-sm sm:text-base text-slate-200 mb-4 sm:mb-6 leading-relaxed text-pretty">
                  Supercivilization is invitation-only. Entry requires sponsorship from a member in good standing who
                  has assembled a verification team for you.
                </p>

                <motion.div
                  className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-6 ring-1 ring-inset ring-white/10 shadow-md shadow-purple-500/10 shadow-lg"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start gap-4">
                    <Info className="w-6 h-6 text-purple-300 flex-shrink-0 mt-0.5" />
                    <div className="text-sm sm:text-base text-slate-200">
                      <strong className="text-slate-100 text-base sm:text-lg block mb-3">Why invitation-only?</strong>
                      <ul className="space-y-2 text-slate-200 leading-relaxed">
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
                  <label htmlFor="invite-code" className="block text-base sm:text-lg font-bold text-slate-100 mb-3">Invitation Code</label>
                  <Input
                    id="invite-code"
                    type="text"
                    value={inviteCode}
                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !validating && inviteCode) {
                        e.preventDefault()
                        validateInvite()
                      }
                    }}
                    placeholder="SC-2025-XXXX"
                    autoComplete="off"
                    className="w-full px-5 sm:px-6 py-4 sm:py-5 bg-white/10 ring-1 ring-inset ring-white/10 shadow-md shadow-violet-500/10 rounded-xl text-white placeholder-white/40 text-base sm:text-lg font-mono focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-500/40 focus-visible:ring-offset-0 transition-all touch-manipulation"
                  />
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2.5 flex items-center gap-2 text-purple-300 text-sm sm:text-base bg-gradient-to-br from-purple-500/10 via-violet-500/10 to-purple-600/10 rounded-lg p-3 ring-1 ring-inset ring-white/10 shadow-md shadow-purple-500/10"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </div>

                <Button
                  onClick={validateInvite}
                  disabled={!inviteCode || validating}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/40 focus-visible:ring-offset-0 touch-manipulation"
                  aria-label="Verify invitation code"
                >
                  {validating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-violet-500/30 border-t-violet-400 rounded-full animate-spin mr-2" />
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
                  className="bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-purple-600/20 ring-1 ring-inset ring-white/10 shadow-md shadow-violet-500/10 rounded-xl p-5 shadow-lg"
                  whileHover={{ scale: 1.01 }}
                >
                  <p className="text-base sm:text-lg text-slate-100 font-semibold">
                    <strong className="text-white">Demo Code:</strong> SC-2025-A7B3
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
                  className="inline-block p-4 bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-purple-600/20 rounded-2xl mb-4 ring-1 ring-inset ring-white/10 shadow-md shadow-violet-500/10 shadow-xl"
                >
                  <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-violet-400" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white text-shadow mb-2">Invitation Verified</h2>
                <p className="text-base sm:text-lg text-slate-200">Your verification team is ready</p>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2 sm:mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                  Your Sponsor
                </h3>
                <div className="bg-white/5 rounded-lg p-3 sm:p-4 ">
                  <div className="flex items-center justify-between mb-2 sm:mb-3 gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm sm:text-base truncate">
                        {DEMO_INVITE.inviter.name}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-300 font-mono truncate">
                        @{DEMO_INVITE.inviter.accountName}
                      </div>
                    </div>
                    <span className="px-2 sm:px-3 py-1 bg-violet-500/20 text-violet-300 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                      {DEMO_INVITE.inviter.standing}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300">
                    Member since {DEMO_INVITE.inviter.memberSince}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-purple-300 mb-2 sm:mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Your Witnesses (Pre-assigned)
                </h3>
                <div className="space-y-2 sm:space-y-3">
                  {DEMO_INVITE.witnesses.map((witness, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 rounded-lg p-3 sm:p-4 ring-1 ring-inset ring-white/10 shadow-md shadow-violet-500/10"
                    >
                      <div className="flex items-center justify-between mb-2 gap-3">
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-sm sm:text-base truncate">{witness.name}</div>
                          <div className="text-xs sm:text-sm text-slate-300 font-mono truncate">
                            @{witness.accountName}
                          </div>
                        </div>
                        <span className="px-2 sm:px-3 py-1 bg-violet-500/20 text-violet-300 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                          {witness.standing}
                        </span>
                      </div>
                      <div className="text-xs sm:text-sm text-slate-300">Member since {witness.memberSince}</div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 ring-1 ring-inset ring-white/10 shadow-md shadow-purple-500/10 shadow-lg"
                whileHover={{ scale: 1.01 }}
              >
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  <strong className="text-slate-100 text-sm sm:text-base block mb-2">Next:</strong> Review and
                  acknowledge The Prime Law - the constitutional foundation that governs all interactions within
                  Supercivilization.
                </p>
              </motion.div>

              <Button
                onClick={onComplete}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-opacity focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500/40 focus-visible:ring-offset-0 touch-manipulation"
                aria-label="Continue to Prime Law"
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
