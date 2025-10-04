"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Video, CheckCircle, ArrowRight, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import ProgressIndicator from "./progress-indicator"

interface Step6Props {
  onComplete: () => void
  timeLeft: string
  colors?: any
}

export default function Step6AffirmCeremony({ onComplete, timeLeft: _timeLeft, colors: _colors }: Step6Props) {
  const [recordingConsent, setRecordingConsent] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(false)

  const handleFileUpload = async () => {
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setUploadedFile(true)
  }

  return (
    <div className="max-w-3xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-rose-500/20 p-6 sm:p-8 md:p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20 pointer-events-none" />

        <div className="relative z-10">
          <ProgressIndicator currentStep={6} stepTitle="Affirm Ceremony" estimatedMinutes={2} />

        {!uploadedFile ? (
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Recording Consent</h2>
              <p className="text-sm sm:text-base text-stone-200 leading-relaxed">Your ceremony must be recorded and permanently stored on IPFS.</p>
            </div>

            <div className="bg-white/5 rounded-lg p-5 sm:p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Why We Record</h4>
              <div className="space-y-3 text-sm text-stone-200">
                {[
                  {
                    title: "Immutable Proof",
                    desc: "Creates permanent, verifiable record of your commitment to The Prime Law",
                  },
                  {
                    title: "Social Accountability",
                    desc: "Your witnesses' attestations become part of the permanent record",
                  },
                  {
                    title: "Network State Foundation",
                    desc: "Building auditable history for eventual diplomatic recognition",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{item.title}:</strong> {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <label htmlFor="recording-consent" className="flex items-start gap-4 p-5 sm:p-6 rounded-xl cursor-pointer transition-all border-2 bg-white/5 hover:bg-white/10 border-white/10 hover:border-rose-400/50">
              <Checkbox
                id="recording-consent"
                checked={recordingConsent}
                onCheckedChange={(checked) => setRecordingConsent(checked as boolean)}
                className="mt-1 flex-shrink-0 border-2 border-rose-400 bg-white/5 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-orange-500 data-[state=checked]:via-red-500 data-[state=checked]:to-rose-600 data-[state=checked]:border-rose-400"
                aria-label="I Consent to Recording"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white mb-2 text-sm sm:text-base">I Consent to Recording</div>
                <div className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  I consent to having my induction ceremony recorded and stored on IPFS. I understand this recording
                  becomes part of the permanent, immutable record of Supercivilization membership and includes:
                </div>
                <ul className="mt-2 text-sm text-stone-200 space-y-1 ml-4">
                  <li>• My full legal name and face</li>
                  <li>• My verbal oath to The Prime Law</li>
                  <li>• Witness attestations of my identity and commitment</li>
                  <li>• Timestamp and cryptographic proof</li>
                </ul>
              </div>
            </label>

            <div className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20 rounded-lg p-4 sm:p-5 border border-rose-400/30">
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                <strong className="text-white">Demo:</strong> Click the button below to simulate uploading your ceremony
                recording.
              </p>
            </div>

            <Button
              onClick={handleFileUpload}
              disabled={!recordingConsent}
              className={`w-full text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all ${recordingConsent ? "bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 hover:from-orange-700 hover:via-red-700 hover:to-rose-800 shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40" : "bg-gray-600/50 cursor-not-allowed"}`}
            >
              {recordingConsent ? (
                <>
                  Upload Ceremony Recording
                  <Upload className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  Consent Required
                  <Camera className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 sm:space-y-6">
            <div className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20 rounded-lg p-5 sm:p-6 border border-rose-400/50">
              <div className="flex items-center gap-4 mb-4 sm:mb-5">
                <CheckCircle className="w-12 h-12 sm:w-14 sm:h-14 text-rose-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white mb-1 text-sm sm:text-base">Recording Uploaded Successfully</div>
                  <div className="text-xs sm:text-sm text-stone-200">Stored on IPFS: Permanent & Immutable</div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-stone-200">IPFS Hash</span>
                  <Video className="w-4 h-4 text-rose-400" />
                </div>
                <code className="text-xs text-rose-300 font-mono break-all">
                  QmX4Kx3JNB8gD7nVWqMp8sL2tY9vR5wH6fE1aZ3cB2mN4
                </code>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-5 sm:p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-3 sm:mb-4 text-sm sm:text-base">Ceremony Verification</h4>
              <div className="space-y-2 text-sm">
                {[
                  "All participants confirmed present",
                  "Prime Law reading verified",
                  "Oath spoken and recorded",
                  "Witness attestations completed",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-rose-400" />
                    <span className="text-stone-200">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20 rounded-lg p-4 sm:p-5 border border-rose-400/30">
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                <strong className="text-white">Next:</strong> Complete payment to activate your membership and mint NFTs
                for all ceremony participants.
              </p>
            </div>

            <Button onClick={onComplete} className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-rose-700 text-white hover:from-orange-700 hover:via-red-700 hover:to-rose-800 shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/40 text-base sm:text-lg py-4 sm:py-6 rounded-xl font-semibold shadow-lg transition-all">
              Continue to Activation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
        </div>
      </motion.div>
    </div>
  )
}
