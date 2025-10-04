"use client"

import { motion } from "framer-motion"
import { Shield, FileText, UserPlus, Fingerprint, Calendar, Video, Award, CheckCircle, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { contrastSafeText, touchTarget, focusVisible } from "@/lib/ui-utils"

const STEP_CONFIGS = {
  1: {
    id: 1,
    name: "Accept",
    fullName: "Accept Invitation",
    icon: Shield,
    bgGradient: "from-slate-950 via-purple-950 via-violet-950 to-slate-950",
    iconBg: "bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    stepBg: "bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600",
    stepRing: "ring-violet-400/50",
    stepShadow: "shadow-violet-500/50",
    stepText: "text-violet-400",
    neutral: "slate",
  },
  2: {
    id: 2,
    name: "Agree",
    fullName: "Agree to Prime Law",
    icon: FileText,
    bgGradient: "from-slate-950 via-indigo-950 via-blue-950 via-sky-950 to-slate-950",
    iconBg: "bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20",
    iconColor: "text-blue-400",
    stepBg: "bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-600",
    stepRing: "ring-blue-400/50",
    stepShadow: "shadow-blue-500/50",
    stepText: "text-blue-400",
    neutral: "slate",
  },
  3: {
    id: 3,
    name: "Account",
    fullName: "Create Account",
    icon: UserPlus,
    bgGradient: "from-slate-950 via-cyan-950 via-teal-950 to-slate-950",
    iconBg: "bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
    stepBg: "bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600",
    stepRing: "ring-cyan-400/50",
    stepShadow: "shadow-cyan-500/50",
    stepText: "text-cyan-400",
    neutral: "slate",
  },
  4: {
    id: 4,
    name: "Authenticate",
    fullName: "Authenticate Identity",
    icon: Fingerprint,
    bgGradient: "from-zinc-950 via-emerald-950 via-green-950 via-lime-950 to-zinc-950",
    iconBg: "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20",
    iconColor: "text-emerald-400",
    stepBg: "bg-gradient-to-br from-emerald-500 via-green-500 to-lime-600",
    stepRing: "ring-emerald-400/50",
    stepShadow: "shadow-emerald-500/50",
    stepText: "text-emerald-400",
    neutral: "zinc",
  },
  5: {
    id: 5,
    name: "Arrange",
    fullName: "Arrange Ceremony",
    icon: Calendar,
    bgGradient: "from-stone-950 via-amber-950 via-yellow-950 to-stone-950",
    iconBg: "bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-500/20",
    iconColor: "text-amber-400",
    stepBg: "bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600",
    stepRing: "ring-amber-400/50",
    stepShadow: "shadow-amber-500/50",
    stepText: "text-amber-400",
    neutral: "stone",
  },
  6: {
    id: 6,
    name: "Affirm",
    fullName: "Affirm Commitment",
    icon: Video,
    bgGradient: "from-stone-950 via-orange-950 via-red-950 via-rose-950 to-stone-950",
    iconBg: "bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20",
    iconColor: "text-rose-400",
    stepBg: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-600",
    stepRing: "ring-rose-400/50",
    stepShadow: "shadow-rose-500/50",
    stepText: "text-rose-400",
    neutral: "stone",
  },
  7: {
    id: 7,
    name: "Activate",
    fullName: "Activate Membership",
    icon: Award,
    bgGradient: "from-stone-950 via-pink-950 via-fuchsia-950 to-stone-950",
    iconBg: "bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-400",
    stepBg: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-pink-600",
    stepRing: "ring-fuchsia-400/50",
    stepShadow: "shadow-fuchsia-500/50",
    stepText: "text-fuchsia-400",
    neutral: "stone",
  },
} as const

const STEP_ICONS = {
  1: Shield,
  2: FileText,
  3: UserPlus,
  4: Fingerprint,
  5: Calendar,
  6: Video,
  7: Award,
}

interface StepWrapperProps {
  currentStep: 1 | 2 | 3 | 4 | 5 | 6 | 7
  children: React.ReactNode
}

export default function StepWrapper({ currentStep, children }: StepWrapperProps) {
  const router = useRouter()
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 0, minutes: 0 })
  const [expiresAt] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem('discover-completed-steps')
    if (saved) {
      setCompletedSteps(JSON.parse(saved))
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Arrow keys for navigation
      if (e.key === 'ArrowRight' && currentStep < 7) {
        e.preventDefault()
        router.push(`/discover/${currentStep + 1}`)
      }
      if (e.key === 'ArrowLeft' && currentStep > 1) {
        e.preventDefault()
        router.push(`/discover/${currentStep - 1}`)
      }
      // Number keys for direct navigation (1-7)
      const num = parseInt(e.key)
      if (!isNaN(num) && num >= 1 && num <= 7) {
        e.preventDefault()
        router.push(`/discover/${num}`)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentStep, router])

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = expiresAt.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 })
        clearInterval(timer)
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

      setTimeLeft({ days, hours, minutes })
    }, 1000)

    return () => clearInterval(timer)
  }, [expiresAt])

  const currentStepData = STEP_CONFIGS[currentStep]
  const allSteps = Object.values(STEP_CONFIGS)

  const handleStepClick = (stepId: number) => {
    if (stepId > 0 && stepId <= 7) {
      router.push(`/discover/${stepId}`)
    }
  }

  const neutral = currentStepData?.neutral
  const headerBorderClass =
    neutral === "slate"
      ? "border-slate-800/50"
      : neutral === "stone"
      ? "border-stone-800/50"
      : "border-zinc-800/50"

  const headerBgClass =
    neutral === "slate"
      ? "bg-slate-950/50"
      : neutral === "stone"
      ? "bg-stone-950/50"
      : "bg-zinc-950/50"

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentStepData.bgGradient} transition-all duration-700`}>
      <div className={`border-b ${headerBorderClass} ${headerBgClass} backdrop-blur-sm`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
          {/* Progress Bar */}
          <div className="flex items-center justify-center">
            <div className="flex items-start gap-0">
              {allSteps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id)
                const isCurrent = currentStep === step.id
                const isLocked = currentStep < step.id
                const stepConfig = STEP_CONFIGS[step.id as keyof typeof STEP_CONFIGS]
                const StepIcon = STEP_ICONS[step.id as keyof typeof STEP_ICONS]

                const lockedClasses =
                  neutral === "slate"
                    ? "bg-slate-800/50 text-slate-600 border border-slate-700/50 hover:bg-slate-800/70 hover:border-slate-600/70"
                    : neutral === "stone"
                    ? "bg-stone-800/50 text-stone-600 border border-stone-700/50 hover:bg-stone-800/70 hover:border-stone-600/70"
                    : "bg-zinc-800/50 text-zinc-600 border border-zinc-700/50 hover:bg-zinc-800/70 hover:border-zinc-600/70"

                const availableClasses =
                  neutral === "slate"
                    ? "bg-slate-700/50 text-slate-500 border border-slate-600/50 hover:bg-slate-700/70 hover:border-slate-500/70"
                    : neutral === "stone"
                    ? "bg-stone-700/50 text-stone-500 border border-stone-600/50 hover:bg-stone-700/70 hover:border-stone-500/70"
                    : "bg-zinc-700/50 text-zinc-500 border border-zinc-600/50 hover:bg-zinc-700/70 hover:border-zinc-500/70"

                return (
                  <div key={step.id} className="flex items-start gap-0">
                    <div className="flex flex-col items-center gap-2 sm:gap-2.5 lg:gap-3">
                      {/* Step Circle */}
                      <motion.button
                        onClick={() => handleStepClick(step.id)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          opacity: 1,
                        }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        aria-label={`${step.fullName} - Step ${step.id}`}
                        aria-current={isCurrent ? "step" : undefined}
                        className={`relative ${touchTarget.large} rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${focusVisible.onGradient} ${
                          isCompleted
                            ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-300 hover:shadow-emerald-500/50"
                            : isCurrent
                              ? `bg-gradient-to-br ${stepConfig.stepBg} text-white ring-2 sm:ring-3 lg:ring-4 ${stepConfig.stepRing} shadow-xl ${stepConfig.stepShadow}`
                              : isLocked
                                ? lockedClasses
                                : availableClasses
                        }`}
                      >
                        {isLocked ? (
                          <Lock className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        ) : isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                          </motion.div>
                        ) : (
                          <StepIcon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        )}

                        {/* Pulse animation for current step */}
                        {isCurrent && (
                          <motion.div
                            className={`absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br ${stepConfig.stepBg} opacity-30`}
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.3, 0, 0.3],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </motion.button>

                      {/* Step Name */}
                      <div className="text-center w-12 sm:w-20 lg:w-24">
                        <div
                          className={`text-[10px] sm:text-xs lg:text-sm font-semibold transition-colors duration-300 leading-tight ${
                            isCurrent ? stepConfig.stepText : isCompleted ? "text-emerald-400" : "text-zinc-500"
                          }`}
                        >
                          {step.name}
                        </div>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {index < allSteps.length - 1 && (
                      <div className="flex items-center h-11 sm:h-14 lg:h-16 mx-1 sm:mx-2">
                        <div className="w-4 sm:w-8 lg:w-12 h-1 rounded-full bg-zinc-800/50 overflow-hidden">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isCompleted ? 1 : 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 origin-left shadow-md shadow-emerald-500/50"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 lg:py-12 max-w-7xl">
        <motion.div
          key={`header-${currentStep}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 sm:mb-8 lg:mb-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white px-4 leading-tight text-balance ${contrastSafeText.heading}`}
          >
            {currentStepData.fullName}
          </motion.h1>
        </motion.div>

        {children}
      </div>

      <footer className={`border-t ${headerBorderClass} ${headerBgClass} backdrop-blur-sm mt-12 sm:mt-16 lg:mt-20`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
          {/* Countdown Timer */}
          {currentStep < 7 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {/* Days */}
                <div className="flex flex-col items-center">
                  <div className={`px-3 py-2 rounded-lg ${currentStepData.iconBg} `}>
                    <div className={`text-xl sm:text-2xl font-bold ${currentStepData.iconColor} font-mono tabular-nums`}>
                      {timeLeft.days.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-white/40 uppercase tracking-wider mt-1">Days</p>
                </div>

                <div className={`text-xl sm:text-2xl font-bold ${currentStepData.iconColor}`}>:</div>

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className={`px-3 py-2 rounded-lg ${currentStepData.iconBg} `}>
                    <div className={`text-xl sm:text-2xl font-bold ${currentStepData.iconColor} font-mono tabular-nums`}>
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-white/40 uppercase tracking-wider mt-1">Hrs</p>
                </div>

                <div className={`text-xl sm:text-2xl font-bold ${currentStepData.iconColor}`}>:</div>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className={`px-3 py-2 rounded-lg ${currentStepData.iconBg} `}>
                    <div className={`text-xl sm:text-2xl font-bold ${currentStepData.iconColor} font-mono tabular-nums`}>
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-white/40 uppercase tracking-wider mt-1">Min</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="text-center">
            <p className="text-xs text-white/40">© 2025 Supercivilization. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
