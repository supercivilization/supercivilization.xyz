"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Shield, ArrowRight, Video, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ProgressIndicator from "./progress-indicator"

interface Step5Props {
  onComplete: () => void
  timeLeft: string
  colors?: any
}

export default function Step5ArrangeCeremony({ onComplete, timeLeft: _timeLeft, colors: _colors }: Step5Props) {
  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    notes: "",
  })

  const CEREMONY_TEAM = {
    inviter: {
      name: "Sarah Chen",
      accountName: "schen",
      role: "Sponsor",
      standing: "Excellent",
    },
    witnesses: [
      { name: "Marcus Rivera", accountName: "mrivera", role: "Witness 1", standing: "Excellent" },
      { name: "Elena Kowalski", accountName: "ekowalski", role: "Witness 2", standing: "Excellent" },
    ],
  }

  const canSubmit = formData.preferredDate && formData.preferredTime

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-amber-500/20 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-500/20 pointer-events-none" />

        <div className="relative z-10">
          <ProgressIndicator currentStep={5} stepTitle="Arrange Ceremony" estimatedMinutes={3} />

          <div className="mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
              Schedule Your Induction
            </h2>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed text-pretty">
              Propose a date and time for your ceremony. We'll coordinate with your verification team to confirm
              everyone's availability.
            </p>
          </div>

          <div className="mb-4 sm:mb-6">
            <h3 className="text-sm sm:text-base font-semibold text-stone-100 mb-3 sm:mb-4 flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
              Your Verification Team
            </h3>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl p-4 sm:p-5 border border-amber-400/30 mb-3"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start sm:items-center justify-between gap-2 mb-2">
                    <div className="font-semibold text-white text-sm sm:text-base truncate">
                      {CEREMONY_TEAM.inviter.name}
                    </div>
                    <span className="px-2 sm:px-3 py-1 bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-600/20 text-yellow-300 border border-yellow-400/30 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                      {CEREMONY_TEAM.inviter.standing}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm text-stone-300">
                    {CEREMONY_TEAM.inviter.role} • @{CEREMONY_TEAM.inviter.accountName}
                  </div>
                </div>
              </div>
            </motion.div>

            {CEREMONY_TEAM.witnesses.map((witness, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1 }}
                className="bg-white/5 rounded-xl p-4 sm:p-5 border border-amber-400/30 mb-3"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start sm:items-center justify-between gap-2 mb-2">
                      <div className="font-semibold text-white text-sm sm:text-base truncate">{witness.name}</div>
                      <span className="px-2 sm:px-3 py-1 bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-600/20 text-yellow-300 border border-yellow-400/30 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap">
                        {witness.standing}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-stone-300">
                      {witness.role} • @{witness.accountName}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-yellow-400/30 mb-4 sm:mb-6 shadow-lg"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3">
              <Video className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
              <div className="text-sm sm:text-base text-stone-200 leading-relaxed">
                <strong className="text-stone-100 block mb-2">Ceremony Details:</strong>
                Your induction takes 15-20 minutes via video call. All three team members must be present. The ceremony
                will be recorded and stored on IPFS as permanent proof of your commitment.
              </div>
            </div>
          </motion.div>

          <div className="space-y-4 sm:space-y-5 mb-4 sm:mb-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-sm sm:text-base font-semibold text-stone-100 mb-2.5 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border border-amber-400/30 rounded-xl text-white text-base focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-500/20 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm sm:text-base font-semibold text-stone-100 mb-2.5 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Preferred Time
                </label>
                <Input
                  type="time"
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border border-amber-400/30 rounded-xl text-white text-base focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-500/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm sm:text-base font-semibold text-stone-100 mb-2.5">
                Additional Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any scheduling preferences or constraints..."
                rows={3}
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-white/10 border border-amber-400/30 rounded-xl text-white placeholder-white/40 text-base focus:border-yellow-400/50 focus:ring-4 focus:ring-yellow-500/20 transition-all resize-none"
              />
            </div>
          </div>

          <motion.div
            className="bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-600/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-yellow-400/30 mb-4 sm:mb-6 shadow-lg"
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-stone-100 mb-2 sm:mb-3 text-sm sm:text-base">What Happens Next</h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-stone-200 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Calendar invites sent to all participants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Team members confirm availability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Secure video link generated once confirmed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-0.5">•</span>
                    <span>Email reminder 24 hours before ceremony</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          <Button
            onClick={onComplete}
            disabled={!canSubmit}
            className={`w-full text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all ${
              canSubmit
                ? "bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-700 hover:via-yellow-700 hover:to-amber-800 shadow-yellow-500/30 hover:shadow-xl hover:shadow-yellow-500/40"
                : "bg-gray-600/50 cursor-not-allowed"
            }`}
          >
            {canSubmit ? (
              <>
                Propose Schedule
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Select Date & Time
                <Calendar className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
