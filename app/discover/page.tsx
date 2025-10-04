"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, FileText, UserPlus, Fingerprint, Calendar, Video, Award, CheckCircle, Lock } from "lucide-react"
import Step0Welcome from "@/components/onboarding/step0-welcome"
import Step1AcceptInvitation from "@/components/onboarding/step1-accept-invitation"
import Step2AgreePrimeLaw from "@/components/onboarding/step2-agree-primelaw"
import Step3CreateAccount from "@/components/onboarding/step3-create-account"
import Step4AuthenticateIdentity from "@/components/onboarding/step4-authenticate-identity"
import Step5ArrangeCeremony from "@/components/onboarding/step5-arrange-ceremony"
import Step6AffirmCeremony from "@/components/onboarding/step6-affirm-ceremony"
import Step7ActivateMembership from "@/components/onboarding/step7-activate-membership"

const STEP_CONFIGS = {
  1: {
    id: 1,
    name: "Accept",
    fullName: "Accept Invitation",
    icon: Shield,
    // Purple/Violet multi-color palette
    bgGradient: "from-slate-950 via-purple-950 via-violet-950 to-slate-950",
    iconBg: "bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    titleColor: "text-violet-200",
    stepBg: "bg-gradient-to-br from-purple-500 via-violet-500 to-purple-600",
    stepRing: "ring-violet-400/50",
    stepShadow: "shadow-violet-500/50",
    stepText: "text-violet-400",
    accentLeft: "bg-purple-500",
    accentRight: "bg-violet-500",
    pulseGradient: "from-purple-500/10 via-violet-500/10 to-purple-500/10",
    neutral: "slate", // Cool
  },
  2: {
    id: 2,
    name: "Agree",
    fullName: "Agree to Prime Law",
    icon: FileText,
    // Indigo/Blue/Sky multi-color palette
    bgGradient: "from-slate-950 via-indigo-950 via-blue-950 via-sky-950 to-slate-950",
    iconBg: "bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20",
    iconColor: "text-blue-400",
    titleColor: "text-blue-200",
    stepBg: "bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-600",
    stepRing: "ring-blue-400/50",
    stepShadow: "shadow-blue-500/50",
    stepText: "text-blue-400",
    accentLeft: "bg-indigo-500",
    accentRight: "bg-sky-500",
    pulseGradient: "from-indigo-500/10 via-blue-500/10 to-sky-500/10",
    neutral: "slate", // Cool
  },
  3: {
    id: 3,
    name: "Account",
    fullName: "Create Account",
    icon: UserPlus,
    // Cyan/Teal multi-color palette
    bgGradient: "from-slate-950 via-cyan-950 via-teal-950 to-slate-950",
    iconBg: "bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-cyan-500/20",
    iconColor: "text-cyan-400",
    titleColor: "text-cyan-200",
    stepBg: "bg-gradient-to-br from-cyan-500 via-teal-500 to-cyan-600",
    stepRing: "ring-cyan-400/50",
    stepShadow: "shadow-cyan-500/50",
    stepText: "text-cyan-400",
    accentLeft: "bg-cyan-500",
    accentRight: "bg-teal-500",
    pulseGradient: "from-cyan-500/10 via-teal-500/10 to-cyan-500/10",
    neutral: "slate", // Cool
  },
  4: {
    id: 4,
    name: "Authenticate",
    fullName: "Authenticate Identity",
    icon: Fingerprint,
    // Emerald/Green/Lime multi-color palette
    bgGradient: "from-zinc-950 via-emerald-950 via-green-950 via-lime-950 to-zinc-950",
    iconBg: "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20",
    iconColor: "text-emerald-400",
    titleColor: "text-emerald-200",
    stepBg: "bg-gradient-to-br from-emerald-500 via-green-500 to-lime-600",
    stepRing: "ring-emerald-400/50",
    stepShadow: "shadow-emerald-500/50",
    stepText: "text-emerald-400",
    accentLeft: "bg-emerald-500",
    accentRight: "bg-lime-500",
    pulseGradient: "from-emerald-500/10 via-green-500/10 to-lime-500/10",
    neutral: "zinc", // Neutral
  },
  5: {
    id: 5,
    name: "Arrange",
    fullName: "Arrange Ceremony",
    icon: Calendar,
    // Amber/Yellow multi-color palette
    bgGradient: "from-stone-950 via-amber-950 via-yellow-950 to-stone-950",
    iconBg: "bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-500/20",
    iconColor: "text-amber-400",
    titleColor: "text-amber-200",
    stepBg: "bg-gradient-to-br from-amber-500 via-yellow-500 to-amber-600",
    stepRing: "ring-amber-400/50",
    stepShadow: "shadow-amber-500/50",
    stepText: "text-amber-400",
    accentLeft: "bg-amber-500",
    accentRight: "bg-yellow-500",
    pulseGradient: "from-amber-500/10 via-yellow-500/10 to-amber-500/10",
    neutral: "stone", // Warm
  },
  6: {
    id: 6,
    name: "Affirm",
    fullName: "Affirm Commitment",
    icon: Video,
    // Orange/Red/Rose multi-color palette
    bgGradient: "from-stone-950 via-orange-950 via-red-950 via-rose-950 to-stone-950",
    iconBg: "bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20",
    iconColor: "text-rose-400",
    titleColor: "text-rose-200",
    stepBg: "bg-gradient-to-br from-orange-500 via-red-500 to-rose-600",
    stepRing: "ring-rose-400/50",
    stepShadow: "shadow-rose-500/50",
    stepText: "text-rose-400",
    accentLeft: "bg-orange-500",
    accentRight: "bg-rose-500",
    pulseGradient: "from-orange-500/10 via-red-500/10 to-rose-500/10",
    neutral: "stone", // Warm
  },
  7: {
    id: 7,
    name: "Activate",
    fullName: "Activate Membership",
    icon: Award,
    // Pink/Fuchsia multi-color palette
    bgGradient: "from-stone-950 via-pink-950 via-fuchsia-950 to-stone-950",
    iconBg: "bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-500/20",
    iconColor: "text-fuchsia-400",
    titleColor: "text-fuchsia-200",
    stepBg: "bg-gradient-to-br from-pink-500 via-fuchsia-500 to-pink-600",
    stepRing: "ring-fuchsia-400/50",
    stepShadow: "shadow-fuchsia-500/50",
    stepText: "text-fuchsia-400",
    accentLeft: "bg-pink-500",
    accentRight: "bg-fuchsia-500",
    pulseGradient: "from-pink-500/10 via-fuchsia-500/10 to-pink-500/10",
    neutral: "stone", // Warm
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

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7>(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 0, minutes: 0 })
  const [expiresAt] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))

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

  const currentStepData = currentStep === 0 ? null : STEP_CONFIGS[currentStep as 1 | 2 | 3 | 4 | 5 | 6 | 7]
  const allSteps = Object.values(STEP_CONFIGS)

  const handleStepComplete = () => {
    if (currentStep > 0 && !completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < 7) {
      setCurrentStep((currentStep + 1) as 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7)
    }
  }

  const handleStepClick = (stepId: number) => {
    // For demo purposes, allow clicking any step (but not step 0)
    if (stepId > 0) {
      setCurrentStep(stepId as 1 | 2 | 3 | 4 | 5 | 6 | 7)
    }
  }

  const timeLeftString = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`

  // Context-aware neutral colors for header/footer based on current step
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

  // Show Step 0 without header/footer
  if (currentStep === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 transition-all duration-700">
        <Step0Welcome onComplete={handleStepComplete} />
      </div>
    )
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentStepData?.bgGradient || 'from-slate-950 to-slate-950'} transition-all duration-700`}>
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
                const currentStepConfig = currentStep > 0 ? STEP_CONFIGS[currentStep as keyof typeof STEP_CONFIGS] : STEP_CONFIGS[1]
                const neutral = currentStepConfig.neutral

                // Generate neutral-based classes
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
                        className={`relative w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                          isCompleted
                            ? "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white shadow-lg shadow-emerald-500/30 border border-emerald-300 hover:shadow-emerald-500/50"
                            : isCurrent
                              ? `bg-gradient-to-br ${stepConfig.stepBg} text-white ring-2 sm:ring-3 lg:ring-4 ${stepConfig.stepRing} shadow-xl ${stepConfig.stepShadow} border border-white/30`
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

                    {/* Connecting Line - Aligned to center of icon */}
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
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white px-4 leading-tight text-balance"
          >
            {currentStepData?.fullName || ''}
          </motion.h1>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentStep === 1 && <Step1AcceptInvitation onComplete={handleStepComplete} timeLeft={timeLeftString} colors={currentStepData} />}
            {currentStep === 2 && <Step2AgreePrimeLaw onComplete={handleStepComplete} timeLeft={timeLeftString} colors={currentStepData} />}
            {currentStep === 3 && <Step3CreateAccount onComplete={handleStepComplete} timeLeft={timeLeftString} colors={currentStepData} />}
            {currentStep === 4 && (
              <Step4AuthenticateIdentity onComplete={handleStepComplete} timeLeft={timeLeftString} colors={currentStepData} />
            )}
            {currentStep === 5 && <Step5ArrangeCeremony onComplete={handleStepComplete} timeLeft={timeLeftString} colors={currentStepData} />}
            {currentStep === 6 && <Step6AffirmCeremony onComplete={handleStepComplete} timeLeft={timeLeftString} colors={currentStepData} />}
            {currentStep === 7 && <Step7ActivateMembership onComplete={handleStepComplete} timeLeft={timeLeftString} colors={currentStepData} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className={`border-t ${headerBorderClass} ${headerBgClass} backdrop-blur-sm mt-12 sm:mt-16 lg:mt-20`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
          {/* Centered Countdown Timer */}
          {currentStep < 7 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              {/* Centered timer numbers */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                {/* Days */}
                <div className="flex flex-col items-center">
                  <div className={`px-3 py-2 rounded-lg ${currentStepData?.iconBg || 'bg-zinc-500/20'} border border-white/10`}>
                    <div className={`text-xl sm:text-2xl font-bold ${currentStepData?.iconColor || 'text-zinc-400'} font-mono tabular-nums`}>
                      {timeLeft.days.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-white/40 uppercase tracking-wider mt-1">Days</p>
                </div>

                <div className={`text-xl sm:text-2xl font-bold ${currentStepData?.iconColor || 'text-zinc-400'}`}>:</div>

                {/* Hours */}
                <div className="flex flex-col items-center">
                  <div className={`px-3 py-2 rounded-lg ${currentStepData?.iconBg || 'bg-zinc-500/20'} border border-white/10`}>
                    <div className={`text-xl sm:text-2xl font-bold ${currentStepData?.iconColor || 'text-zinc-400'} font-mono tabular-nums`}>
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-white/40 uppercase tracking-wider mt-1">Hrs</p>
                </div>

                <div className={`text-xl sm:text-2xl font-bold ${currentStepData?.iconColor || 'text-zinc-400'}`}>:</div>

                {/* Minutes */}
                <div className="flex flex-col items-center">
                  <div className={`px-3 py-2 rounded-lg ${currentStepData?.iconBg || 'bg-zinc-500/20'} border border-white/10`}>
                    <div className={`text-xl sm:text-2xl font-bold ${currentStepData?.iconColor || 'text-zinc-400'} font-mono tabular-nums`}>
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs font-medium text-white/40 uppercase tracking-wider mt-1">Min</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Minimal footer info */}
          <div className="text-center">
            <p className="text-xs text-white/40">© 2025 Supercivilization. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
