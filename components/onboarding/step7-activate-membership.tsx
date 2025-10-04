"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Award, CheckCircle, ArrowRight, CreditCard, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import ProgressIndicator from "./progress-indicator"

interface Step7Props {
  onComplete: () => void
  timeLeft: string
  colors?: any
}

export default function Step7ActivateMembership({ onComplete, timeLeft: _timeLeft, colors: _colors }: Step7Props) {
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
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-500/20 pointer-events-none" />

        <div className="relative z-10">
          <ProgressIndicator currentStep={7} stepTitle="Activate Membership" estimatedMinutes={5} />

        {step === "payment" && (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Activate Membership</h2>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed mb-4 sm:mb-6">Financial commitment demonstrates skin-in-the-game and funds our path to network state status.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-600/20 rounded-lg p-5 sm:p-6 border border-pink-400/30">
              <h3 className="font-semibold text-white mb-4 text-sm sm:text-base">Funding Allocation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm text-stone-200">
                <div>
                  <div className="font-semibold text-stone-100 text-sm sm:text-base">40%</div>
                  <div>Platform & ops</div>
                </div>
                <div>
                  <div className="font-semibold text-stone-100 text-sm sm:text-base">30%</div>
                  <div>Property</div>
                </div>
                <div>
                  <div className="font-semibold text-stone-100 text-sm sm:text-base">20%</div>
                  <div>Treasury</div>
                </div>
                <div>
                  <div className="font-semibold text-stone-100 text-sm sm:text-base">10%</div>
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
                        ? "bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-600/20 border-pink-400/50"
                        : "bg-white/5 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="mt-1 w-4 h-4 sm:w-5 sm:h-5 text-pink-600 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2 gap-3">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-semibold text-white text-sm sm:text-base truncate">{plan.name}</span>
                          {plan.recommended && (
                            <span className="bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white text-xs sm:text-sm px-2 py-0.5 rounded font-medium whitespace-nowrap">
                              RECOMMENDED
                            </span>
                          )}
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xl sm:text-2xl font-bold text-white">${plan.price}</div>
                          {plan.monthlyEquivalent && (
                            <div className="text-xs sm:text-sm text-pink-300">
                              ${plan.monthlyEquivalent}/mo equiv
                            </div>
                          )}
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">{plan.description}</p>
                      {plan.savings && (
                        <div className="inline-block bg-gradient-to-r from-pink-500/20 to-fuchsia-500/20 text-pink-300 text-xs sm:text-sm px-2 py-1 rounded mt-2">
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
                      ? "bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-600/20 border-pink-400/50"
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
                      ? "bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-600/20 border-pink-400/50"
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
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/40 text-sm sm:text-base focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                  />
                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <Input
                      type="text"
                      placeholder="MM/YY"
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/40 text-sm sm:text-base focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                    />
                    <Input
                      type="text"
                      placeholder="CVC"
                      className="px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/40 text-sm sm:text-base focus:border-fuchsia-400/50 focus:ring-4 focus:ring-fuchsia-500/20 transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Consent */}
            <label htmlFor="payment-consent" className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl cursor-pointer transition-all border-2 bg-white/5 hover:bg-white/10 border-white/10 hover:border-pink-400/50">
              <Checkbox
                id="payment-consent"
                checked={paymentConsent}
                onCheckedChange={(checked) => setPaymentConsent(checked as boolean)}
                className="mt-1 flex-shrink-0 border-2 border-white/40 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-pink-500 data-[state=checked]:via-fuchsia-500 data-[state=checked]:to-pink-600 data-[state=checked]:border-fuchsia-400"
                aria-label="Payment Authorization"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white mb-2 text-sm sm:text-base">Payment Authorization</div>
                <div className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  I authorize payment of ${selectedPlanDetails.price} for {selectedPlanDetails.name} membership. Past
                  contributions are non-refundable except within first 7 days.
                </div>
              </div>
            </label>

            <Button
              onClick={handlePayment}
              disabled={!paymentConsent || processing}
              className={`w-full text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all ${paymentConsent && !processing ? "bg-gradient-to-r from-pink-600 via-fuchsia-600 to-pink-700 hover:from-pink-700 hover:via-fuchsia-700 hover:to-pink-800 shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40" : "bg-gray-600/50 cursor-not-allowed"}`}
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
          <div className="text-center py-8 sm:py-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-block p-4 sm:p-5 bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-600/20 rounded-full mb-4 sm:mb-6"
            >
              <Sparkles className="w-14 h-14 sm:w-16 sm:h-16 text-pink-400 animate-pulse" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 sm:mb-5">Minting Membership NFTs</h2>
            <p className="text-sm sm:text-base text-stone-200 mb-4 sm:mb-6">
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
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border-2 bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-600/20 border-pink-400/50"
                  >
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 flex-shrink-0" />
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
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4 sm:py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-block p-4 sm:p-5 bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-600/20 rounded-full mb-4 sm:mb-6"
            >
              <Award className="w-16 h-16 sm:w-20 sm:h-20 text-pink-400" />
            </motion.div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Membership Activated!</h2>
            <p className="text-lg sm:text-xl text-stone-100 mb-1">Welcome to Supercivilization</p>
            <p className="text-sm sm:text-base text-stone-200 mb-4 sm:mb-6">Member #{String(Date.now()).slice(-4)}</p>

            <div className="bg-white/5 rounded-lg p-5 sm:p-6 border border-white/10 mb-4 sm:mb-6 text-left">
              <h4 className="font-semibold text-white mb-4 sm:mb-5 text-sm sm:text-base">
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
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <div className="font-medium text-white text-sm sm:text-base">{item.title}</div>
                      <div className="text-xs sm:text-sm text-stone-200 leading-relaxed">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-fuchsia-500/20 rounded-lg p-4 sm:p-5 border border-fuchsia-400/30 mb-4 sm:mb-6">
              <p className="text-sm text-stone-200 leading-relaxed">
                <strong className="text-white">The 48-Hour Rule:</strong> Check your email within 48 hours and complete
                your first action to maintain momentum. Your journey has begun.
              </p>
            </div>

            <Button
              onClick={onComplete}
              className="w-full bg-gradient-to-r from-pink-600 via-fuchsia-600 to-pink-700 text-white hover:from-pink-700 hover:via-fuchsia-700 hover:to-pink-800 shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all"
            >
              Begin Onboarding Experience
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </motion.div>
        )}
        </div>
      </motion.div>
    </div>
  )
}
