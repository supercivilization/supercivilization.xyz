"use client"

import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import StepWrapper from "@/components/onboarding/step-wrapper"
import Step1AcceptInvitation from "@/components/onboarding/step1-accept-invitation"
import Step2AgreePrimeLaw from "@/components/onboarding/step2-agree-primelaw"
import Step3CreateAccount from "@/components/onboarding/step3-create-account"
import Step4AuthenticateIdentity from "@/components/onboarding/step4-authenticate-identity"
import Step5ArrangeCeremony from "@/components/onboarding/step5-arrange-ceremony"
import Step6AffirmCeremony from "@/components/onboarding/step6-affirm-ceremony"
import Step7ActivateMembership from "@/components/onboarding/step7-activate-membership"

export default function DiscoverStepPage() {
  const params = useParams()
  const router = useRouter()
  const step = parseInt(params.step as string, 10)

  // Validate step number
  if (isNaN(step) || step < 1 || step > 7) {
    router.push('/discover')
    return null
  }

  const currentStep = step as 1 | 2 | 3 | 4 | 5 | 6 | 7

  const handleStepComplete = () => {
    // Save completed step to localStorage
    const saved = localStorage.getItem('discover-completed-steps')
    const completed = saved ? JSON.parse(saved) : []
    if (!completed.includes(currentStep)) {
      localStorage.setItem('discover-completed-steps', JSON.stringify([...completed, currentStep]))
    }

    // Navigate to next step
    if (currentStep < 7) {
      router.push(`/discover/${currentStep + 1}`)
    } else {
      // Completed all steps
      router.push('/discover')
    }
  }

  const STEP_CONFIGS = {
    1: { iconBg: "bg-gradient-to-br from-purple-500/20 via-violet-500/20 to-purple-500/20", iconColor: "text-violet-400" },
    2: { iconBg: "bg-gradient-to-br from-indigo-500/20 via-blue-500/20 to-sky-500/20", iconColor: "text-blue-400" },
    3: { iconBg: "bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-cyan-500/20", iconColor: "text-cyan-400" },
    4: { iconBg: "bg-gradient-to-br from-emerald-500/20 via-green-500/20 to-lime-500/20", iconColor: "text-emerald-400" },
    5: { iconBg: "bg-gradient-to-br from-amber-500/20 via-yellow-500/20 to-amber-500/20", iconColor: "text-amber-400" },
    6: { iconBg: "bg-gradient-to-br from-orange-500/20 via-red-500/20 to-rose-500/20", iconColor: "text-rose-400" },
    7: { iconBg: "bg-gradient-to-br from-pink-500/20 via-fuchsia-500/20 to-pink-500/20", iconColor: "text-fuchsia-400" },
  }

  const colors = STEP_CONFIGS[currentStep]
  const timeLeft = "7d 0h 0m" // Placeholder - will be calculated in StepWrapper

  return (
    <StepWrapper currentStep={currentStep}>
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
      >
        {currentStep === 1 && <Step1AcceptInvitation onComplete={handleStepComplete} timeLeft={timeLeft} colors={colors} />}
        {currentStep === 2 && <Step2AgreePrimeLaw onComplete={handleStepComplete} timeLeft={timeLeft} colors={colors} />}
        {currentStep === 3 && <Step3CreateAccount onComplete={handleStepComplete} timeLeft={timeLeft} colors={colors} />}
        {currentStep === 4 && <Step4AuthenticateIdentity onComplete={handleStepComplete} timeLeft={timeLeft} colors={colors} />}
        {currentStep === 5 && <Step5ArrangeCeremony onComplete={handleStepComplete} timeLeft={timeLeft} colors={colors} />}
        {currentStep === 6 && <Step6AffirmCeremony onComplete={handleStepComplete} timeLeft={timeLeft} colors={colors} />}
        {currentStep === 7 && <Step7ActivateMembership onComplete={handleStepComplete} timeLeft={timeLeft} colors={colors} />}
      </motion.div>
    </StepWrapper>
  )
}
