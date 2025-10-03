"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Video, CheckCircle, ArrowRight, Camera, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface Step6Props {
  onComplete: () => void
  timeLeft: string
}

export default function Step6AffirmCeremony({ onComplete }: Step6Props) {
  const [recordingConsent, setRecordingConsent] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(false)

  const handleFileUpload = async () => {
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setUploadedFile(true)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl"
      >
        {!uploadedFile ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Recording Consent</h2>
              <p className="text-red-100">Your ceremony must be recorded and permanently stored on IPFS.</p>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-4">Why We Record</h4>
              <div className="space-y-3 text-sm text-white/80">
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
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white">{item.title}:</strong> {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-4 p-6 rounded-xl cursor-pointer transition-all border-2 bg-white/5 hover:bg-white/10 border-white/10 hover:border-red-400/50">
              <Checkbox
                checked={recordingConsent}
                onCheckedChange={(checked) => setRecordingConsent(checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-semibold text-white mb-2">I Consent to Recording</div>
                <div className="text-sm text-white/70">
                  I consent to having my induction ceremony recorded and stored on IPFS. I understand this recording
                  becomes part of the permanent, immutable record of Supercivilization membership and includes:
                </div>
                <ul className="mt-2 text-sm text-white/60 space-y-1 ml-4">
                  <li>• My full legal name and face</li>
                  <li>• My verbal oath to The Prime Law</li>
                  <li>• Witness attestations of my identity and commitment</li>
                  <li>• Timestamp and cryptographic proof</li>
                </ul>
              </div>
            </label>

            <div className="bg-amber-500/20 rounded-lg p-4 border border-amber-400/30">
              <p className="text-sm text-amber-100">
                <strong className="text-white">Demo:</strong> Click the button below to simulate uploading your ceremony
                recording.
              </p>
            </div>

            <Button
              onClick={handleFileUpload}
              disabled={!recordingConsent}
              className={`w-full ${recordingConsent ? "bg-red-600 hover:bg-red-700" : "bg-gray-600"}`}
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
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
            <div className="bg-emerald-500/20 rounded-lg p-6 border border-emerald-400/50">
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle className="w-12 h-12 text-emerald-400" />
                <div className="flex-1">
                  <div className="font-semibold text-white mb-1">Recording Uploaded Successfully</div>
                  <div className="text-sm text-emerald-100">Stored on IPFS: Permanent & Immutable</div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-white/70">IPFS Hash</span>
                  <Video className="w-4 h-4 text-emerald-400" />
                </div>
                <code className="text-xs text-emerald-300 font-mono break-all">
                  QmX4Kx3JNB8gD7nVWqMp8sL2tY9vR5wH6fE1aZ3cB2mN4
                </code>
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <h4 className="font-semibold text-white mb-3">Ceremony Verification</h4>
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
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-white/80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-red-500/20 rounded-lg p-4 border border-red-400/30">
              <p className="text-sm text-red-100">
                <strong className="text-white">Next:</strong> Complete payment to activate your membership and mint NFTs
                for all ceremony participants.
              </p>
            </div>

            <Button onClick={onComplete} className="w-full bg-red-600 text-white hover:bg-red-700">
              Continue to Activation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
