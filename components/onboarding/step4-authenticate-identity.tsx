"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Shield, Users, Phone, Wallet, Globe, Github, Linkedin, Mail, Twitter, Apple } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ProgressIndicator from "./progress-indicator"

interface Step4Props {
  onComplete: () => void
  timeLeft: string
  colors?: any
}

const SCORE_VALUES = {
  EMAIL_VERIFIED: 20,
  GITHUB: 25,
  LINKEDIN: 25,
  GOOGLE: 20,
  TWITTER: 20,
  APPLE: 20,
  META: 20,
  WEBSITE: 15,
  PHONE: 10,
  WEB3_WALLET: 15,
  ADDITIONAL_SOCIAL: 10,
} as const

const MINIMUM_SCORE = 40

export default function Step4AuthenticateIdentity({ onComplete, timeLeft: _timeLeft, colors: _colors }: Step4Props) {
  const [identityScore, setIdentityScore] = useState<number>(SCORE_VALUES.EMAIL_VERIFIED)
  const [connectedAccounts, setConnectedAccounts] = useState<string[]>([])
  const [personalWebsite, setPersonalWebsite] = useState("")
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [walletConnected, setWalletConnected] = useState(false)

  const canProceed = identityScore >= MINIMUM_SCORE

  const handleConnectAccount = (provider: string, points: number) => {
    if (connectedAccounts.includes(provider)) return

    // TODO: Implement Supabase OAuth
    // const { data, error } = await supabase.auth.signInWithOAuth({ provider })

    setConnectedAccounts([...connectedAccounts, provider])
    setIdentityScore(identityScore + points)
  }

  const handleAddWebsite = () => {
    if (!personalWebsite || connectedAccounts.includes('website')) return
    setConnectedAccounts([...connectedAccounts, 'website'])
    setIdentityScore(identityScore + SCORE_VALUES.WEBSITE)
  }

  const handleVerifyPhone = () => {
    if (phoneVerified) return
    // TODO: Implement phone verification
    setPhoneVerified(true)
    setIdentityScore(identityScore + SCORE_VALUES.PHONE)
  }

  const handleConnectWallet = () => {
    if (walletConnected) return
    // TODO: Implement Web3 wallet connection
    setWalletConnected(true)
    setIdentityScore(identityScore + SCORE_VALUES.WEB3_WALLET)
  }

  const VERIFICATION_TEAM = {
    sponsor: { name: "Sarah Chen", username: "schen" },
    witnesses: [
      { name: "Marcus Rivera", username: "mrivera" },
      { name: "Elena Kowalski", username: "ekowalski" },
    ],
  }

  const primaryProviders = [
    { id: 'github', name: 'GitHub', icon: Github, points: SCORE_VALUES.GITHUB, recommended: true },
    { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, points: SCORE_VALUES.LINKEDIN, recommended: false },
    { id: 'google', name: 'Google', icon: Mail, points: SCORE_VALUES.GOOGLE, recommended: false },
    { id: 'twitter', name: 'Twitter/X', icon: Twitter, points: SCORE_VALUES.TWITTER, recommended: false },
    { id: 'apple', name: 'Apple', icon: Apple, points: SCORE_VALUES.APPLE, recommended: false },
    { id: 'meta', name: 'Meta', icon: CheckCircle, points: SCORE_VALUES.META, recommended: false },
  ]

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-emerald-500/20 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20 pointer-events-none" />

        <div className="relative z-10">
          <ProgressIndicator currentStep={4} stepTitle="Verify Identity" estimatedMinutes={4} />

        <div className="mb-4 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Verify Your Identity</h2>
          <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
            Connect one account to verify you're a real person. No government ID required.
          </p>
        </div>

        {/* Identity Score Progress */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm sm:text-base font-semibold text-zinc-100">Identity Score</span>
            <span className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
              {identityScore}/{MINIMUM_SCORE}
              {canProceed && <CheckCircle className="w-5 h-5 text-lime-400" />}
            </span>
          </div>

          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: `${(SCORE_VALUES.EMAIL_VERIFIED / MINIMUM_SCORE) * 100}%` }}
              animate={{ width: `${Math.min((identityScore / MINIMUM_SCORE) * 100, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500"
            />
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 mt-2">
            {canProceed
              ? "✓ Minimum score reached! You can proceed."
              : `Email verified (+20 pts). Connect one account to reach ${MINIMUM_SCORE} points.`
            }
          </p>
        </div>

        {/* Primary Verification Methods */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-zinc-100 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Connect One Account (Required)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {primaryProviders.map((provider) => {
              const isConnected = connectedAccounts.includes(provider.id)
              const Icon = provider.icon

              return (
                <motion.button
                  key={provider.id}
                  onClick={() => !isConnected && handleConnectAccount(provider.id, provider.points)}
                  disabled={isConnected}
                  whileHover={!isConnected ? { scale: 1.02 } : {}}
                  whileTap={!isConnected ? { scale: 0.98 } : {}}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    isConnected
                      ? "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20 border-lime-400/50"
                      : "bg-white/5 border-white/10 hover:border-emerald-400/30 cursor-pointer"
                  }`}
                >
                  {provider.recommended && !connectedAccounts.length && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-lime-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                      Recommended
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-white" />
                      <span className="font-semibold text-white text-sm sm:text-base">{provider.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm text-emerald-300">+{provider.points}</span>
                      {isConnected && <CheckCircle className="w-5 h-5 text-lime-400" />}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Optional Boosters */}
        {canProceed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-4 sm:mb-6"
          >
            <h3 className="text-base sm:text-lg font-semibold text-zinc-100 mb-4">
              Boost Your Profile (Optional)
            </h3>

            <div className="space-y-4">
              {/* Personal Website */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Label htmlFor="website" className="flex items-center gap-2 text-sm font-semibold text-zinc-100 mb-2">
                  <Globe className="w-4 h-4" />
                  Personal Website/Portfolio (+{SCORE_VALUES.WEBSITE} pts)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="website"
                    type="url"
                    value={personalWebsite}
                    onChange={(e) => setPersonalWebsite(e.target.value)}
                    placeholder="https://yoursite.com"
                    disabled={connectedAccounts.includes('website')}
                    className="flex-1 bg-white/10 border border-emerald-400/30 rounded-xl text-white placeholder-white/40 focus:border-lime-400/70 focus:ring-4 focus:ring-lime-500/20 transition-all"
                  />
                  <Button
                    onClick={handleAddWebsite}
                    disabled={!personalWebsite || connectedAccounts.includes('website')}
                    variant="outline"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                  >
                    {connectedAccounts.includes('website') ? <CheckCircle className="w-4 h-4" /> : 'Add'}
                  </Button>
                </div>
                <p className="text-xs text-zinc-300 mt-1.5">
                  Share your portfolio, blog, or personal homepage
                </p>
              </div>

              {/* Phone Verification */}
              <button
                onClick={handleVerifyPhone}
                disabled={phoneVerified}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  phoneVerified
                    ? "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20 border-lime-400/50"
                    : "bg-white/5 border-white/10 hover:border-emerald-400/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-white" />
                    <div>
                      <div className="font-semibold text-white text-sm sm:text-base">Phone Verification</div>
                      <div className="text-xs text-zinc-300">SMS verification for extra security</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-emerald-300">+{SCORE_VALUES.PHONE}</span>
                    {phoneVerified && <CheckCircle className="w-5 h-5 text-lime-400" />}
                  </div>
                </div>
              </button>

              {/* Web3 Wallet */}
              <button
                onClick={handleConnectWallet}
                disabled={walletConnected}
                className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                  walletConnected
                    ? "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20 border-lime-400/50"
                    : "bg-white/5 border-white/10 hover:border-emerald-400/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wallet className="w-5 h-5 text-white" />
                    <div>
                      <div className="font-semibold text-white text-sm sm:text-base">Web3 Wallet</div>
                      <div className="text-xs text-zinc-300">ENS domain or verified wallet address</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm text-emerald-300">+{SCORE_VALUES.WEB3_WALLET}</span>
                    {walletConnected && <CheckCircle className="w-5 h-5 text-lime-400" />}
                  </div>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {/* Verification Team Info */}
        <div className="bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20 rounded-xl p-4 sm:p-5 border border-lime-400/30 mb-4 sm:mb-6">
          <h4 className="flex items-center gap-2 font-semibold text-white mb-3 text-sm sm:text-base">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            Your Verification Team
          </h4>
          <p className="text-xs sm:text-sm text-emerald-100 mb-3">
            These members will review your profile before your ceremony:
          </p>
          <div className="space-y-2">
            <div className="text-xs sm:text-sm">
              <span className="text-emerald-200">Sponsor:</span>{" "}
              <span className="text-white font-medium">{VERIFICATION_TEAM.sponsor.name}</span>
              <span className="text-emerald-300 ml-1">@{VERIFICATION_TEAM.sponsor.username}</span>
            </div>
            {VERIFICATION_TEAM.witnesses.map((witness, idx) => (
              <div key={idx} className="text-xs sm:text-sm">
                <span className="text-emerald-200">Witness {idx + 1}:</span>{" "}
                <span className="text-white font-medium">{witness.name}</span>
                <span className="text-emerald-300 ml-1">@{witness.username}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-emerald-200/80 mt-3">
            Higher identity scores demonstrate commitment and build trust.
          </p>
        </div>

        <Button
          onClick={onComplete}
          disabled={!canProceed}
          className={`w-full text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all ${
            canProceed
              ? "bg-gradient-to-r from-emerald-600 via-green-600 to-lime-700 hover:from-emerald-700 hover:via-green-700 hover:to-lime-800 shadow-lime-500/30 hover:shadow-xl hover:shadow-lime-500/40"
              : "bg-gray-600/50 cursor-not-allowed opacity-50"
          }`}
        >
          {canProceed ? (
            <>
              Continue to Ceremony Setup
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          ) : (
            "Connect an account to continue"
          )}
        </Button>
        </div>
      </motion.div>
    </div>
  )
}
