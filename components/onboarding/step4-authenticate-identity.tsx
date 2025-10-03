"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Upload, CheckCircle, Camera, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Step4Props {
  onComplete: () => void
  timeLeft: string
}

export default function Step4AuthenticateIdentity({ onComplete }: Step4Props) {
  const [uploads, setUploads] = useState({
    idFront: false,
    idBack: false,
    selfie: false,
  })

  const allUploaded = uploads.idFront && uploads.idBack && uploads.selfie

  const handleFileUpload = (type: keyof typeof uploads) => {
    // Simulate file upload
    setTimeout(() => {
      setUploads({ ...uploads, [type]: true })
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/20 p-4 sm:p-6 md:p-8 shadow-2xl"
      >
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Verify Your Identity</h2>
          <p className="text-sm sm:text-base text-emerald-100 leading-relaxed">
            Upload government-issued ID and a selfie for proof-of-human verification.
          </p>
        </div>

        <div className="bg-emerald-500/20 rounded-lg p-3 sm:p-4 border border-emerald-400/30 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            <strong className="text-white">Why we need this:</strong> Prevents Sybil attacks and ensures one person =
            one membership. Your documents are encrypted and only viewed by your verification team during the ceremony.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          {[
            {
              key: "idFront" as const,
              title: "Government ID (Front)",
              icon: Upload,
              description: "Driver's license, passport, or national ID",
            },
            {
              key: "idBack" as const,
              title: "Government ID (Back)",
              icon: Upload,
              description: "Back of your ID document",
            },
            {
              key: "selfie" as const,
              title: "Selfie with ID",
              icon: Camera,
              description: "Hold your ID next to your face",
            },
          ].map((item, index) => (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border-2 border-dashed rounded-lg p-4 sm:p-6 transition-all ${
                uploads[item.key]
                  ? "border-emerald-400/50 bg-emerald-500/10"
                  : "border-white/20 hover:border-emerald-400/30"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div
                    className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${uploads[item.key] ? "bg-emerald-500/20" : "bg-white/10"}`}
                  >
                    {uploads[item.key] ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    ) : (
                      <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-white text-sm sm:text-base">{item.title}</div>
                    <div className="text-xs sm:text-sm text-white/60 truncate">{item.description}</div>
                  </div>
                </div>
                {!uploads[item.key] && (
                  <Button
                    onClick={() => handleFileUpload(item.key)}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-xs sm:text-sm flex-shrink-0"
                  >
                    Upload
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-amber-500/20 rounded-lg p-3 sm:p-4 border border-amber-400/30 mb-4 sm:mb-6">
          <div className="flex items-start gap-2 sm:gap-3">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 flex-shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              <strong className="text-white">Security:</strong> All documents are encrypted end-to-end and stored on
              IPFS. Only your verification team can decrypt them during your ceremony.
            </p>
          </div>
        </div>

        <Button
          onClick={onComplete}
          disabled={!allUploaded}
          className={`w-full text-sm sm:text-base py-2 sm:py-3 ${allUploaded ? "bg-emerald-600 hover:bg-emerald-700" : "bg-gray-600"}`}
        >
          {allUploaded ? (
            <>
              Continue to Ceremony Scheduling
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </>
          ) : (
            <>
              Upload All Documents
              <Upload className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </>
          )}
        </Button>
      </motion.div>
    </div>
  )
}
