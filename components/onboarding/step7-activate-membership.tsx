"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, CheckCircle, ArrowRight, CreditCard, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

interface Step7Props {
  onComplete: () => void
  timeLeft: string
}

export default function Step7ActivateMembership({ onComplete }: Step7Props) {
  const [step, setStep] = useState("payment") // payment, processing, activated
  const [selectedPlan, setSelectedPlan] = useState("annual")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [paymentConsent, setPaymentConsent] = useState(false)
  const [processing, setProcessing] = useState(false)

  const plans = [
    { id: "monthly", name: "Monthly", price: 50, period: "month", description: "Cancel anytime after 3-month minimum" },
    {
      id: "annual",
      name: "Annual",
      price: 480,
      period: "year",
      monthlyEquivalent: 40,
      savings: 20,
      description: "Best value - $40/month equivalent",
      recommended: true,
    },
    {
      id: "lifetime",
      name: "Founding Member",
      price: 5000,
      period: "lifetime",
      description: "Lifetime membership + special benefits",
    },
  ]

  const selectedPlanDetails = plans.find((p) => p.id === selectedPlan)!

  const handlePayment = async () => {
    if (!paymentConsent) return
    setProcessing(true)
    setStep("processing")

    await new Promise((resolve) => setTimeout(resolve, 3000))
    setStep("activated")
    setProcessing(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8 shadow-2xl"
      >
        {step === "payment" && (
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-fuchsia-500/20 rounded-lg p-4 sm:p-6 border border-fuchsia-400/30">
              <h3 className="font-semibold text-white mb-2 text-sm sm:text-base">Why We Charge</h3>
              <p className="text-xs sm:text-sm text-fuchsia-100 mb-3 leading-relaxed">
                Financial commitment demonstrates skin-in-the-game and funds our path to network state status.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-[10px] sm:text-xs text-fuchsia-100">
                <div>
                  <div className="font-semibold text-fuchsia-200 text-sm sm:text-base">40%</div>
                  <div>Platform & ops</div>
                </div>
                <div>
                  <div className="font-semibold text-fuchsia-200 text-sm sm:text-base">30%</div>
                  <div>Property</div>
                </div>
                <div>
                  <div className="font-semibold text-fuchsia-200 text-sm sm:text-base">20%</div>
                  <div>Treasury</div>
                </div>
                <div>
                  <div className="font-semibold text-fuchsia-200 text-sm sm:text-base">10%</div>
                  <div>Community</div>
                </div>
              </div>
            </div>

            {/* Plans */}
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
                Choose Your Membership Level
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl cursor-pointer transition-all border-2 ${
                      selectedPlan === plan.id
                        ? "bg-fuchsia-500/20 border-fuchsia-400/50"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-600 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2 gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-semibold text-white text-sm sm:text-base truncate">{plan.name}</span>
                          {plan.recommended && (
                            <span className="bg-fuchsia-600 text-white text-[10px] sm:text-xs px-2 py-0.5 rounded font-medium whitespace-nowrap">
                              RECOMMENDED
                            </span>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xl sm:text-2xl font-bold text-white">${plan.price}</div>
                          {plan.monthlyEquivalent && (
                            <div className="text-[10px] sm:text-xs text-fuchsia-300">
                              ${plan.monthlyEquivalent}/mo equiv
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{plan.description}</p>
                      {plan.savings && (
                        <div className="inline-block bg-emerald-500/20 text-emerald-300 text-[10px] sm:text-xs px-2 py-1 rounded mt-2">
                          Save {plan.savings}%
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Payment Method</h4>
              <div className="flex gap-2 sm:gap-3 mb-3 sm:mb-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 p-3 sm:p-4 rounded-lg border-2 transition ${
                    paymentMethod === "card"
                      ? "bg-fuchsia-500/20 border-fuchsia-400/50"
                      : "bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                >
                  <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-white" />
                  <div className="text-xs sm:text-sm font-medium text-white">Card</div>
                </button>
                <button
                  onClick={() => setPaymentMethod("crypto")}
                  className={`flex-1 p-3 sm:p-4 rounded-lg border-2 transition ${
                    paymentMethod === "crypto"
                      ? "bg-fuchsia-500/20 border-fuchsia-400/50"
                      : "bg-white/5 border-white/10 hover:border-white/30"
                  }`}
                >
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-white" />
                  <div className="text-xs sm:text-sm font-medium text-white">Crypto</div>
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-2 sm:space-y-3">
                  <Input
                    type="text"
                    placeholder="Card number"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm sm:text-base"
                  />
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm sm:text-base"
                    />
                    <Input
                      type="text"
                      placeholder="CVC"
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 text-sm sm:text-base"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl cursor-pointer transition-all border-2 bg-white/5 hover:bg-white/10 border-white/10 hover:border-fuchsia-400/50">
              <Checkbox
                checked={paymentConsent}
                onCheckedChange={(checked) => setPaymentConsent(checked as boolean)}
                className="mt-1 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white mb-2 text-sm sm:text-base">Payment Authorization</div>
                <div className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  I authorize payment of ${selectedPlanDetails.price} for {selectedPlanDetails.name} membership. Past
                  contributions are non-refundable except within first 7 days.
                </div>
              </div>
            </label>

            <Button
              onClick={handlePayment}
              disabled={!paymentConsent || processing}
              className={`w-full text-sm sm:text-base py-2 sm:py-3 ${paymentConsent && !processing ? "bg-fuchsia-600 hover:bg-fuchsia-700" : "bg-gray-600"}`}
            >
              {processing ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  Process Payment & Activate
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}

        {step === "processing" && (
          <div className="text-center py-6 sm:py-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block p-3 sm:p-4 bg-fuchsia-500/20 rounded-full mb-4 sm:mb-6"
            >
              <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-fuchsia-400 animate-pulse" />
            </motion.div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Minting Membership NFTs</h2>
            <p className="text-sm sm:text-base text-fuchsia-200 mb-6 sm:mb-8">
              Creating on-chain proof for all participants
            </p>

            <div className="space-y-2 sm:space-y-3 max-w-md mx-auto">
              {["Your Member NFT", "Inviter Reward NFT", "Witness 1 Reward NFT", "Witness 2 Reward NFT"].map(
                (item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.3 }}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 bg-emerald-500/20 border-emerald-400/50"
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="font-medium text-white text-sm sm:text-base">{item}</div>
                    </div>
                  </motion.div>
                ),
              )}
            </div>
          </div>
        )}

        {step === "activated" && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block p-3 sm:p-4 bg-emerald-500/20 rounded-full mb-4 sm:mb-6"
            >
              <Award className="w-16 h-16 sm:w-20 sm:h-20 text-emerald-400" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Membership Activated!</h2>
            <p className="text-lg sm:text-xl text-emerald-200 mb-1">Welcome to Supercivilization</p>
            <p className="text-sm sm:text-base text-white/60 mb-6 sm:mb-8">Member #{String(Date.now()).slice(-4)}</p>

            <div className="bg-white/5 rounded-lg p-4 sm:p-6 border border-white/10 mb-4 sm:mb-6 text-left">
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">
                Discovery Complete - Onboarding Begins
              </h4>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { title: "First Saturday Meeting", desc: "This Saturday at 11 AM (calendar invite sent)" },
                  { title: "7-Step Onboarding", desc: "Introduction to the Supercivilization ecosystem" },
                  { title: "Full Member Status", desc: "Unlocks after Week 4 (80%+ attendance)" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-2 sm:gap-3"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-white text-sm sm:text-base">{item.title}</div>
                      <div className="text-xs sm:text-sm text-white/70 leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-fuchsia-500/20 rounded-lg p-3 sm:p-4 border border-fuchsia-400/30 mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm text-fuchsia-100 leading-relaxed">
                <strong className="text-white">The 48-Hour Rule:</strong> Check your email within 48 hours and complete
                your first action to maintain momentum. Your journey has begun.
              </p>
            </div>

            <Button
              onClick={onComplete}
              className="w-full bg-emerald-600 text-white hover:bg-emerald-700 text-sm sm:text-base py-2 sm:py-3"
            >
              Begin Onboarding Experience
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
