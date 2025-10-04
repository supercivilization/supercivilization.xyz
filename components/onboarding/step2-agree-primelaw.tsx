"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Lock, Unlock, ArrowRight, AlertCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import ProgressIndicator from "./progress-indicator"
import { contrastSafeText, focusVisible } from "@/lib/ui-utils"

interface Step2Props {
  onComplete: () => void
  timeLeft: string
  colors?: any
}

export default function Step2AgreePrimeLaw({ onComplete, timeLeft: _timeLeft, colors: _colors }: Step2Props) {
  const [agreements, setAgreements] = useState({
    primeLaw: false,
    terms: false,
    privacy: false,
  })
  const [showFullText, setShowFullText] = useState(false)

  const canContinue = agreements.primeLaw && agreements.terms && agreements.privacy

  const toggleAgreement = (field: keyof typeof agreements) => {
    setAgreements({ ...agreements, [field]: !agreements[field] })
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-blue-500/20 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20 pointer-events-none" />

        <div className="relative z-10">
          <ProgressIndicator currentStep={2} stepTitle="The Prime Law" estimatedMinutes={5} />

          <div className="mb-4 sm:mb-6">
          <h2 className={`text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4 ${contrastSafeText.heading}`}>The Prime Law</h2>
          <p className={`text-sm sm:text-base text-slate-200 mb-4 sm:mb-6 leading-relaxed text-pretty ${contrastSafeText.body}`}>
            Before creating your account, you must understand and acknowledge The Prime Law - the single constitutional
            principle that governs all interactions within Supercivilization.
          </p>
          <div className="bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20 rounded-xl p-6 border border-sky-400/30">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-sky-300 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
                This is not fine print. The Prime Law is the <strong className="text-white">only law</strong> we have.
                Everything else - Terms of Service, Privacy Policy, Community Guidelines - flows from and must align
                with this foundational principle.
              </p>
            </div>
          </div>
        </div>

        {/* The Prime Law */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl border-2 border-sky-400/50 p-5 sm:p-6 mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-sky-400" />
            The Prime Law
          </h3>

          <div className="space-y-4 text-white">
            <div className="bg-white/10 rounded-lg p-4 border border-indigo-400/30">
              <p className="font-semibold mb-2 text-slate-100">Preamble</p>
              <ul className="space-y-2 text-sm text-slate-200">
                <li>• The purpose of human life is to prosper and live happily</li>
                <li>• The function of society is to provide conditions for individuals to fulfill that purpose</li>
                <li>• The Prime Law guarantees those conditions by forbidding initiatory force, fraud, or coercion</li>
              </ul>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Article 1",
                  text: "No person, group of persons, or organization shall initiate force, threat of force, or fraud against any individual's self, property, or contract.",
                },
                {
                  title: "Article 2",
                  text: "Force is morally and legally justified only for protection from those who violate Article 1.",
                },
                { title: "Article 3", text: "No exceptions shall exist for Articles 1 and 2." },
              ].map((article, index) => (
                <motion.div
                  key={article.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20 rounded-lg p-4 border border-sky-400/30"
                >
                  <p className="font-semibold mb-2 text-slate-100">{article.title}</p>
                  <p className="text-sm text-slate-200">{article.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20 rounded-lg p-4 border border-sky-400/30">
              <p className="text-sm text-slate-200 font-medium">
                The Prime Law is the fundamental, natural law of protection and may not be amended.
              </p>
            </div>
          </div>

          {!showFullText && (
            <button
              onClick={() => setShowFullText(true)}
              className="mt-4 text-sky-300 hover:text-sky-200 text-sm font-medium flex items-center gap-2"
            >
              Read detailed explanation
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Expanded Explanation */}
        {showFullText && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white/5 rounded-lg p-5 sm:p-6 mb-4 sm:mb-6 border border-blue-500/20"
          >
            <h4 className="font-semibold text-white mb-3">What This Means in Practice</h4>
            <div className="space-y-3 text-sm text-slate-200">
              <p>
                <strong className="text-white">Initiatory Force:</strong> Aggression against person or property.
                Self-defense and defense of property are explicitly allowed.
              </p>
              <p>
                <strong className="text-white">Fraud:</strong> Deception in voluntary exchanges. This includes
                misrepresentation, breach of contract, or theft.
              </p>
              <p>
                <strong className="text-white">Coercion:</strong> Threats of force to compel action. All interactions
                must be voluntary.
              </p>
            </div>

            <div className="mt-4 bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20 rounded-lg p-4 border border-sky-400/30">
              <p className="text-sm text-slate-200">
                <strong className="text-sky-200">Simple Rule:</strong> You're free to do anything that doesn't
                involve initiating force, committing fraud, or coercing others. This applies to everyone equally - no
                special privileges, no exceptions.
              </p>
            </div>
          </motion.div>
        )}

        {/* Agreement Checkboxes */}
        <div className="space-y-4 mb-4 sm:mb-6">
          {[
            {
              key: "primeLaw" as const,
              title: "I Acknowledge The Prime Law",
              description:
                "I have read and understand The Prime Law. I agree to conduct myself in accordance with this principle by not initiating force, fraud, or coercion against any person, property, or contract.",
            },
            {
              key: "terms" as const,
              title: "Terms of Service",
              description:
                "I accept the Terms of Service which incorporate The Prime Law as the governing agreement. I understand that violations of the Prime Law may result in membership termination.",
            },
            {
              key: "privacy" as const,
              title: "Privacy Policy",
              description:
                "I accept the Privacy Policy. I understand my personal data will be handled in accordance with The Prime Law - no unauthorized use, no sharing without consent, full transparency.",
            },
          ].map((item, index) => (
            <motion.label
              key={item.key}
              htmlFor={`agreement-${item.key}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-all border-2 ${
                agreements[item.key]
                  ? "bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20 border-sky-300"
                  : "bg-white/5 border-sky-300/50 hover:border-sky-300"
              }`}
            >
              <Checkbox
                id={`agreement-${item.key}`}
                checked={agreements[item.key]}
                onCheckedChange={() => toggleAgreement(item.key)}
                className={`mt-1 border-2 border-sky-200 bg-slate-900 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-indigo-500 data-[state=checked]:via-blue-500 data-[state=checked]:to-sky-600 data-[state=checked]:border-sky-300 ${focusVisible.highContrast}`}
                aria-label={item.title}
              />
              <div className="flex-1">
                <div className="font-semibold text-white mb-1.5">{item.title}</div>
                <div className="text-sm text-slate-200 leading-relaxed">{item.description}</div>
              </div>
              {agreements[item.key] && <CheckCircle className="w-6 h-6 text-sky-400 flex-shrink-0" />}
            </motion.label>
          ))}
        </div>

        {!canContinue && (
          <div className="mb-4 sm:mb-6 bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20 rounded-lg p-4 sm:p-5 border border-sky-400/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-sky-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-slate-200">
              You must acknowledge all three agreements to proceed. These are not optional - they are the constitutional
              foundation of Supercivilization.
            </p>
          </div>
        )}

        <Button
          onClick={onComplete}
          disabled={!canContinue}
          className={`w-full text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all ${
            canContinue
              ? "bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-700 hover:from-indigo-700 hover:via-blue-700 hover:to-sky-800 shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40"
              : "bg-gray-600 opacity-50 cursor-not-allowed"
          }`}
        >
          {canContinue ? <Unlock className="w-6 h-6 mr-2" /> : <Lock className="w-6 h-6 mr-2" />}
          {canContinue ? "Continue to Account Creation" : "Accept All to Continue"}
          {canContinue && <ArrowRight className="w-6 h-6 ml-2" />}
        </Button>
        </div>
      </motion.div>
    </div>
  )
}
