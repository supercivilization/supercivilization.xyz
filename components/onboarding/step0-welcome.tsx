"use client"

import { motion } from "framer-motion"
import { ArrowRight, Shield, FileText, UserPlus, Fingerprint, Calendar, Video, Award, Lock, Play, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Step0Welcome() {
  const allSteps = [
    {
      id: 1,
      name: "Accept",
      icon: Shield,
      classes: {
        bg: "bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-purple-500/20",
        border: "border-violet-400/30"
      }
    },
    {
      id: 2,
      name: "Agree",
      icon: FileText,
      classes: {
        bg: "bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20",
        border: "border-blue-400/30"
      }
    },
    {
      id: 3,
      name: "Account",
      icon: UserPlus,
      classes: {
        bg: "bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-cyan-500/20",
        border: "border-cyan-400/30"
      }
    },
    {
      id: 4,
      name: "Authenticate",
      icon: Fingerprint,
      classes: {
        bg: "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20",
        border: "border-emerald-400/30"
      }
    },
    {
      id: 5,
      name: "Arrange",
      icon: Calendar,
      classes: {
        bg: "bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-500/20",
        border: "border-amber-400/30"
      }
    },
    {
      id: 6,
      name: "Affirm",
      icon: Video,
      classes: {
        bg: "bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20",
        border: "border-rose-400/30"
      }
    },
    {
      id: 7,
      name: "Activate",
      icon: Award,
      classes: {
        bg: "bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-500/20",
        border: "border-fuchsia-400/30"
      }
    },
  ]

  const journeySteps = [
    {
      number: 1,
      icon: Shield,
      title: "Accept Invitation",
      description: "Verify your exclusive invitation code",
      duration: "2 min",
      classes: {
        bg: "bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-purple-500/20",
        icon: "text-violet-400",
        border: "border-violet-400/30",
      }
    },
    {
      number: 2,
      icon: FileText,
      title: "Agree to Prime Law",
      description: "Acknowledge our constitutional foundation",
      duration: "8 min",
      classes: {
        bg: "bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20",
        icon: "text-blue-400",
        border: "border-blue-400/30",
      }
    },
    {
      number: 3,
      icon: UserPlus,
      title: "Create Account",
      description: "Set up your member profile",
      duration: "3 min",
      classes: {
        bg: "bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-cyan-500/20",
        icon: "text-cyan-400",
        border: "border-cyan-400/30",
      }
    },
    {
      number: 4,
      icon: Fingerprint,
      title: "Authenticate Identity",
      description: "Connect accounts to verify you're real",
      duration: "5 min",
      classes: {
        bg: "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20",
        icon: "text-emerald-400",
        border: "border-emerald-400/30",
      }
    },
    {
      number: 5,
      icon: Calendar,
      title: "Arrange Ceremony",
      description: "Schedule your induction with your team",
      duration: "3 min",
      classes: {
        bg: "bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-500/20",
        icon: "text-amber-400",
        border: "border-amber-400/30",
      }
    },
    {
      number: 6,
      icon: Video,
      title: "Affirm Ceremony",
      description: "Record your commitment to Prime Law",
      duration: "8 min",
      classes: {
        bg: "bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20",
        icon: "text-rose-400",
        border: "border-rose-400/30",
      }
    },
    {
      number: 7,
      icon: Award,
      title: "Activate Membership",
      description: "Complete payment and receive your NFT",
      duration: "5 min",
      classes: {
        bg: "bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-500/20",
        icon: "text-fuchsia-400",
        border: "border-fuchsia-400/30",
      }
    },
  ]

  const totalMinutes = journeySteps.reduce((acc, step) => {
    const mins = parseInt(step.duration)
    return acc + mins
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 transition-all duration-700">
      {/* Header with Progress - Same as other steps */}
      <div className="border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
          {/* Progress Bar */}
          <div className="flex items-center justify-center">
            <div className="flex items-start gap-0">
              {allSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-0">
                    <div className="flex flex-col items-center gap-2 sm:gap-2.5 lg:gap-3">
                      {/* Step Circle - Locked */}
                      <motion.button
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        disabled
                        className="relative w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 cursor-not-allowed bg-slate-800/50 text-slate-600 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/70"
                      >
                        <Lock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                      </motion.button>

                      {/* Step Name */}
                      <div className="text-center w-12 sm:w-20 lg:w-24">
                        <div className="text-[10px] sm:text-xs lg:text-sm font-semibold text-zinc-500 transition-colors duration-300 leading-tight">
                          {step.name}
                        </div>
                      </div>
                    </div>

                    {/* Connecting Line - Aligned to center of icon */}
                    {index < allSteps.length - 1 && (
                      <div className="flex items-center h-11 sm:h-14 lg:h-16 mx-1 sm:mx-2">
                        <div className="w-4 sm:w-8 lg:w-12 h-1 rounded-full bg-zinc-800/50" />
                      </div>
                    )}
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - VSL Style */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center pt-6 sm:pt-8 lg:pt-12 pb-6 sm:pb-8 lg:pb-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full mb-4 sm:mb-6"
          >
            <Zap className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-xs sm:text-sm font-medium text-zinc-300">Invitation-Only Access</span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Welcome to Your<br />
            Discovery Journey
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            You've been invited to join the Supercivilization. Watch this brief overview to understand the commitment you're making to yourself, others, and society.
          </p>
        </motion.div>

        {/* Video Section - VSL Optimized */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/50 shadow-xl group">
            {/* Video Placeholder with Play Button */}
            <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-zinc-700 rounded-full blur-xl opacity-40" />
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 hover:bg-white/15 transition-colors">
                  <Play className="w-7 h-7 sm:w-9 sm:h-9 text-white ml-0.5" fill="white" />
                </div>
              </motion.button>
            </div>

            {/* Video Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent">
              <p className="text-white text-xs sm:text-sm font-medium">The Supercivilization Introduction</p>
              <p className="text-white/60 text-xs">5:32 minutes</p>
            </div>
          </div>
        </motion.div>

        {/* What You'll Get - Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Your 7-Step Journey
            </h2>
            <div className="inline-flex items-center gap-2 text-sm sm:text-base text-slate-400">
              <Clock className="w-4 h-4" />
              <span>Complete in just {totalMinutes} minutes</span>
            </div>
          </div>

          <div className="grid gap-3 sm:gap-4 max-w-3xl mx-auto mb-8">
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="bg-white/[0.03] backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/10 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${step.classes.bg} border ${step.classes.border} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${step.classes.icon}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="text-sm sm:text-base font-semibold text-white">
                          Step {step.number}: {step.title}
                        </h3>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mb-10 sm:mb-12 lg:mb-14 max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-xl border border-zinc-700/50 bg-gradient-to-br from-zinc-900/50 to-zinc-950/50 backdrop-blur-sm p-6 sm:p-8">
            <div className="absolute top-0 right-0 w-48 h-48 bg-zinc-500/5 rounded-full blur-3xl" />
            <div className="relative text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Before You Begin
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                <p>
                  This discovery and onboarding experience activates your membership and creates a <span className="font-semibold text-white">permanent, on-chain record</span> of your commitment to The Prime Law. Your induction ceremony will be <span className="font-semibold text-white">recorded and stored on IPFS</span> — this cannot be deleted or reversed.
                </p>
                <p className="text-base sm:text-lg font-semibold text-white pt-1">
                  Only proceed if you're fully committed to membership.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section - VSL Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mb-10 sm:mb-12 lg:mb-14"
        >
          <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-5 sm:p-6 lg:p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3">
                Ready to Begin Your Journey?
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                Start your 7-step discovery process now. Your verification team is waiting.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <Link href="/discover/1" className="flex-1">
                <Button
                  className="w-full bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 hover:from-zinc-800 hover:via-zinc-700 hover:to-zinc-800 text-white text-sm sm:text-base py-5 sm:py-6 rounded-lg sm:rounded-xl font-bold shadow-xl shadow-zinc-500/20 hover:shadow-zinc-500/40 transition-all group"
                >
                  <span>I'm Ready - Begin Discovery</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="mt-4 text-center">
              <button className="text-xs sm:text-sm text-slate-400 hover:text-slate-300 underline underline-offset-4 transition-colors">
                Don't have an invitation? Apply here
              </button>
            </div>
          </div>
        </motion.div>

        {/* Social Proof / Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="grid grid-cols-3 gap-3 sm:gap-4 pb-12 sm:pb-16 lg:pb-20 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-300 mb-1">34min</div>
            <div className="text-xs text-slate-400">Average Completion</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-300 mb-1">100%</div>
            <div className="text-xs text-slate-400">Verified Members</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-300 mb-1">On-Chain</div>
            <div className="text-xs text-slate-400">Permanent Record</div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
