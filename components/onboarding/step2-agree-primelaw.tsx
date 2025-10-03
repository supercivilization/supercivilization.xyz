"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Lock, Unlock, ArrowRight, AlertCircle, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Step2Props {
  onComplete: () => void
  timeLeft: string
}

export default function Step2AgreePrimeLaw({ onComplete }: Step2Props) {
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
    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-10 md:p-12 shadow-2xl"
      >
        <div className="mb-10">
          <p className="text-blue-100 text-lg sm:text-xl mb-6 leading-relaxed text-pretty">
            Before creating your account, you must understand and acknowledge The Prime Law - the single constitutional
            principle that governs all interactions within Supercivilization.
          </p>
          <div className="bg-blue-500/20 rounded-xl p-6 border border-blue-400/30">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-300 flex-shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                This is not fine print. The Prime Law is the <strong className="text-white">only law</strong> we have.
                Everything else - Terms of Service, Privacy Policy, Community Guidelines - flows from and must align
                with this foundational principle.
              </p>
            </div>
          </div>
        </div>

        {/* The Prime Law */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl border-2 border-blue-400/50 p-6 mb-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-400" />
            The Prime Law
          </h3>

          <div className="space-y-4 text-white">
            <div className="bg-white/10 rounded-lg p-4 border border-white/20">
              <p className="font-semibold mb-2 text-blue-200">Preamble</p>
              <ul className="space-y-2 text-sm text-blue-100">
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
                  className="bg-blue-500/20 rounded-lg p-4 border border-blue-400/30"
                >
                  <p className="font-semibold mb-2 text-blue-200">{article.title}</p>
                  <p className="text-sm text-white">{article.text}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-amber-500/20 rounded-lg p-4 border border-amber-400/30">
              <p className="text-sm text-amber-100 font-medium">
                The Prime Law is the fundamental, natural law of protection and may not be amended.
              </p>
            </div>
          </div>

          {!showFullText && (
            <button
              onClick={() => setShowFullText(true)}
              className="mt-4 text-blue-300 hover:text-blue-200 text-sm font-medium flex items-center gap-2"
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
            className="bg-white/5 rounded-lg p-6 mb-6 border border-white/10"
          >
            <h4 className="font-semibold text-white mb-3">What This Means in Practice</h4>
            <div className="space-y-3 text-sm text-blue-100">
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

            <div className="mt-4 bg-emerald-500/20 rounded-lg p-4 border border-emerald-400/30">
              <p className="text-sm text-emerald-100">
                <strong className="text-emerald-200">Simple Rule:</strong> You're free to do anything that doesn't
                involve initiating force, committing fraud, or coercing others. This applies to everyone equally - no
                special privileges, no exceptions.
              </p>
            </div>
          </motion.div>
        )}

        {/* Agreement Checkboxes */}
        <div className="space-y-4 mb-8">
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-all border-2 ${
                agreements[item.key]
                  ? "bg-blue-500/20 border-blue-400/50"
                  : "bg-white/5 border-white/10 hover:border-white/30"
              }`}
            >
              <Checkbox
                checked={agreements[item.key]}
                onCheckedChange={() => toggleAgreement(item.key)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-semibold text-white mb-1">{item.title}</div>
                <div className="text-sm text-blue-100">{item.description}</div>
              </div>
              {agreements[item.key] && <CheckCircle className="w-6 h-6 text-blue-400 flex-shrink-0" />}
            </motion.label>
          ))}
        </div>

        {!canContinue && (
          <div className="mb-6 bg-amber-500/20 rounded-lg p-4 border border-amber-400/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-100">
              You must acknowledge all three agreements to proceed. These are not optional - they are the constitutional
              foundation of Supercivilization.
            </p>
          </div>
        )}

        <Button
          onClick={onComplete}
          disabled={!canContinue}
          className={`w-full text-lg sm:text-xl py-6 sm:py-7 rounded-xl font-bold shadow-lg transition-all ${
            canContinue
              ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
              : "bg-gray-600 opacity-50 cursor-not-allowed"
          }`}
        >
          {canContinue ? <Unlock className="w-6 h-6 mr-2" /> : <Lock className="w-6 h-6 mr-2" />}
          {canContinue ? "Continue to Account Creation" : "Accept All to Continue"}
          {canContinue && <ArrowRight className="w-6 h-6 ml-2" />}
        </Button>
      </motion.div>
    </div>
  )
}
