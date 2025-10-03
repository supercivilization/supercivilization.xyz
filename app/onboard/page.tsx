"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, Video, Calendar, Fingerprint, UserPlus, FileText, Shield, CheckCircle, Lock, Timer } from "lucide-react"
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
    name: "Welcome",
    fullName: "Welcome to Supercivilization",
    icon: Award,
    bgGradient: "from-stone-950 via-fuchsia-950 to-stone-950", // Stone for warm fuchsia
    iconBg: "bg-fuchsia-500/20",
    iconColor: "text-fuchsia-400",
    titleColor: "text-fuchsia-200",
    stepBg: "bg-fuchsia-600",
    stepRing: "ring-fuchsia-400/50",
    stepShadow: "shadow-fuchsia-500/50",
    stepText: "text-fuchsia-400",
    neutral: "stone", // Warm
  },
  2: {
    id: 2,
    name: "Profile",
    fullName: "Complete Your Profile",
    icon: Video,
    bgGradient: "from-stone-950 via-rose-950 to-stone-950", // Stone for warm rose
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    titleColor: "text-rose-200",
    stepBg: "bg-rose-600",
    stepRing: "ring-rose-400/50",
    stepShadow: "shadow-rose-500/50",
    stepText: "text-rose-400",
    neutral: "stone", // Warm
  },
  3: {
    id: 3,
    name: "Preferences",
    fullName: "Set Your Preferences",
    icon: Calendar,
    bgGradient: "from-stone-950 via-amber-950 to-stone-950", // Stone for warm amber
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-400",
    titleColor: "text-amber-200",
    stepBg: "bg-amber-600",
    stepRing: "ring-amber-400/50",
    stepShadow: "shadow-amber-500/50",
    stepText: "text-amber-400",
    neutral: "stone", // Warm
  },
  4: {
    id: 4,
    name: "Connect",
    fullName: "Connect Your Accounts",
    icon: Fingerprint,
    bgGradient: "from-zinc-950 via-emerald-950 to-zinc-950", // Zinc for neutral emerald
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    titleColor: "text-emerald-200",
    stepBg: "bg-emerald-600",
    stepRing: "ring-emerald-400/50",
    stepShadow: "shadow-emerald-500/50",
    stepText: "text-emerald-400",
    neutral: "zinc", // Neutral
  },
  5: {
    id: 5,
    name: "Explore",
    fullName: "Explore Features",
    icon: UserPlus,
    bgGradient: "from-slate-950 via-cyan-950 to-slate-950", // Slate for cool cyan
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    titleColor: "text-cyan-200",
    stepBg: "bg-cyan-600",
    stepRing: "ring-cyan-400/50",
    stepShadow: "shadow-cyan-500/50",
    stepText: "text-cyan-400",
    neutral: "slate", // Cool
  },
  6: {
    id: 6,
    name: "Learn",
    fullName: "Learn the Basics",
    icon: FileText,
    bgGradient: "from-slate-950 via-blue-950 to-slate-950", // Slate for cool blue
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    titleColor: "text-blue-200",
    stepBg: "bg-blue-600",
    stepRing: "ring-blue-400/50",
    stepShadow: "shadow-blue-500/50",
    stepText: "text-blue-400",
    neutral: "slate", // Cool
  },
  7: {
    id: 7,
    name: "Complete",
    fullName: "You're All Set!",
    icon: Shield,
    bgGradient: "from-slate-950 via-violet-950 to-slate-950", // Slate for cool violet
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    titleColor: "text-violet-200",
    stepBg: "bg-violet-600",
    stepRing: "ring-violet-400/50",
    stepShadow: "shadow-violet-500/50",
    stepText: "text-violet-400",
    neutral: "slate", // Cool
  },
} as const

const STEP_ICONS = {
  1: Award,
  2: Video,
  3: Calendar,
  4: Fingerprint,
  5: UserPlus,
  6: FileText,
  7: Shield,
}

export default function OnboardPage() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1)
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

  const currentStepData = STEP_CONFIGS[currentStep]
  const allSteps = Object.values(STEP_CONFIGS)

  const handleStepComplete = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep])
    }
    if (currentStep < 7) {
      setCurrentStep((currentStep + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7)
    }
  }

  const handleStepClick = (stepId: number) => {
    // For demo purposes, allow clicking any step
    setCurrentStep(stepId as 1 | 2 | 3 | 4 | 5 | 6 | 7)
  }

  const timeLeftString = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`

  // Context-aware neutral colors for header/footer based on current step
  const neutral = currentStepData.neutral
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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl">
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
              {allSteps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id)
                const isCurrent = currentStep === step.id
                const isLocked = currentStep < step.id
                const stepConfig = STEP_CONFIGS[step.id as keyof typeof STEP_CONFIGS]
                const StepIcon = STEP_ICONS[step.id as keyof typeof STEP_ICONS]
                const currentStepConfig = STEP_CONFIGS[currentStep]
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
                  <div key={step.id} className="flex items-center">
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
                        className={`relative w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
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
                          <Lock className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        ) : isCompleted ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                          </motion.div>
                        ) : (
                          <StepIcon className="w-4 h-4 sm:w-6 sm:h-6 lg:w-7 lg:h-7" />
                        )}

                        {/* Pulse animation for current step */}
                        {isCurrent && (
                          <motion.div
                            className={`absolute inset-0 rounded-xl sm:rounded-2xl ${stepConfig.stepBg} opacity-50`}
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 2,
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
                      <div className="w-4 sm:w-8 lg:w-12 h-1 mx-1 sm:mx-2 rounded-full bg-zinc-800/50 overflow-hidden mb-6 sm:mb-9 lg:mb-10">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: isCompleted ? 1 : 0 }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 origin-left shadow-md shadow-emerald-500/50"
                        />
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
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-7xl">
        <motion.div
          key={`header-${currentStep}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
            className={`inline-block p-5 sm:p-6 lg:p-8 ${currentStepData.iconBg} rounded-2xl sm:rounded-3xl mb-5 sm:mb-6 lg:mb-8 shadow-2xl border border-white/10`}
          >
            <currentStepData.icon
              className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 ${currentStepData.iconColor}`}
            />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 px-4 leading-tight text-balance"
          >
            {currentStepData.fullName}
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-3 sm:gap-4"
          >
            <div className={`h-0.5 sm:h-1 w-12 sm:w-16 lg:w-20 rounded-full ${currentStepData.stepBg}`} />
            <p className={`${currentStepData.titleColor} text-lg sm:text-xl lg:text-2xl font-semibold px-2 sm:px-4`}>
              Step {currentStep} of 7
            </p>
            <div className={`h-0.5 sm:h-1 w-12 sm:w-16 lg:w-20 rounded-full ${currentStepData.stepBg}`} />
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            {currentStep === 1 && <Step1AcceptInvitation onComplete={handleStepComplete} timeLeft={timeLeftString} />}
            {currentStep === 2 && <Step2AgreePrimeLaw onComplete={handleStepComplete} timeLeft={timeLeftString} />}
            {currentStep === 3 && <Step3CreateAccount onComplete={handleStepComplete} timeLeft={timeLeftString} />}
            {currentStep === 4 && (
              <Step4AuthenticateIdentity onComplete={handleStepComplete} timeLeft={timeLeftString} />
            )}
            {currentStep === 5 && <Step5ArrangeCeremony onComplete={handleStepComplete} timeLeft={timeLeftString} />}
            {currentStep === 6 && <Step6AffirmCeremony onComplete={handleStepComplete} timeLeft={timeLeftString} />}
            {currentStep === 7 && <Step7ActivateMembership onComplete={handleStepComplete} timeLeft={timeLeftString} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className={`border-t ${headerBorderClass} ${headerBgClass} backdrop-blur-sm mt-12 sm:mt-16 lg:mt-20`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 max-w-7xl">
          {/* Countdown Timer */}
          {currentStep < 7 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 sm:mb-10 lg:mb-12"
            >
              <div className="max-w-2xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/90 via-zinc-800/90 to-zinc-900/90 border border-zinc-700/50 p-6 sm:p-8">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500/10 via-rose-500/10 to-amber-500/10 animate-pulse" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Timer className="w-5 h-5 text-amber-400 animate-pulse" />
                      <p className="text-sm font-semibold text-amber-200 uppercase tracking-wider">
                        Complete Onboarding Within
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6">
                      {/* Days */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/20 to-rose-500/20 blur-xl" />
                          <div className="relative bg-zinc-900/80 rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-zinc-700/50 backdrop-blur-sm">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-100 font-mono tabular-nums">
                              {timeLeft.days.toString().padStart(2, "0")}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider mt-2">Days</p>
                      </div>

                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-600">:</div>

                      {/* Hours */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-amber-500/20 blur-xl" />
                          <div className="relative bg-zinc-900/80 rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-zinc-700/50 backdrop-blur-sm">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-100 font-mono tabular-nums">
                              {timeLeft.hours.toString().padStart(2, "0")}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider mt-2">Hours</p>
                      </div>

                      <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-600">:</div>

                      {/* Minutes */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-emerald-500/20 blur-xl" />
                          <div className="relative bg-zinc-900/80 rounded-xl px-4 sm:px-6 py-3 sm:py-4 border border-zinc-700/50 backdrop-blur-sm">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-100 font-mono tabular-nums">
                              {timeLeft.minutes.toString().padStart(2, "0")}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-zinc-400 uppercase tracking-wider mt-2">Minutes</p>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <p className="text-xs text-white/40">
                        Onboarding expires on {expiresAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} at {expiresAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          <div className="text-center space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">Supercivilization</h2>
              <p className="text-sm sm:text-base text-white/60">Building a society based on the Prime Law</p>
            </div>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-xs sm:text-sm lg:text-base text-white/50 leading-relaxed font-medium text-balance max-w-3xl mx-auto">
              The Prime Law: No person or group may initiate force, fraud, or coercion against any individual, property,
              or contract.
            </p>
            <p className="text-xs text-white/40">© 2025 Supercivilization. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
