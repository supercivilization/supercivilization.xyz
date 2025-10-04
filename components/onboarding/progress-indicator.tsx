"use client"

import { Clock } from "lucide-react"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps?: number
  stepTitle: string
  estimatedMinutes?: number
}

const stepColors = {
  1: "from-purple-500 via-violet-500 to-purple-600",      // Purple/Violet
  2: "from-indigo-500 via-blue-500 to-sky-500",           // Indigo/Blue/Sky
  3: "from-cyan-500 via-teal-500 to-cyan-600",            // Cyan/Teal
  4: "from-emerald-500 via-green-500 to-lime-500",        // Emerald/Green/Lime
  5: "from-amber-500 via-yellow-500 to-amber-600",        // Amber/Yellow
  6: "from-orange-500 via-red-500 to-rose-500",           // Orange/Red/Rose
  7: "from-pink-500 via-fuchsia-500 to-pink-600",         // Pink/Fuchsia
}

const stepCompletedColors = {
  1: "from-purple-400/80 via-violet-400/80 to-purple-500/80",
  2: "from-indigo-400/80 via-blue-400/80 to-sky-400/80",
  3: "from-cyan-400/80 via-teal-400/80 to-cyan-500/80",
  4: "from-emerald-400/80 via-green-400/80 to-lime-400/80",
  5: "from-amber-400/80 via-yellow-400/80 to-amber-500/80",
  6: "from-orange-400/80 via-red-400/80 to-rose-400/80",
  7: "from-pink-400/80 via-fuchsia-400/80 to-pink-500/80",
}

export default function ProgressIndicator({
  currentStep,
  totalSteps = 7,
  stepTitle: _stepTitle,
  estimatedMinutes,
}: ProgressIndicatorProps) {
  const colorClass = stepColors[currentStep as keyof typeof stepColors] || stepColors[1]

  return (
    <div className="mb-4 sm:mb-6" role="navigation" aria-label="Progress indicator">
      <div className="flex items-center justify-between mb-3">
        {/* Step Dots */}
        <div className="flex items-center gap-2" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps} aria-label={`Step ${currentStep} of ${totalSteps}`}>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const completedColorClass = stepCompletedColors[stepNumber as keyof typeof stepCompletedColors]

            return (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? `w-8 bg-gradient-to-r ${colorClass}`
                    : isCompleted
                      ? `w-2 bg-gradient-to-r ${completedColorClass}`
                      : "w-2 bg-white/20"
                }`}
                aria-label={`Step ${stepNumber}${isCurrent ? ' (current)' : isCompleted ? ' (completed)' : ''}`}
              />
            )
          })}
        </div>

        {/* Time Estimate */}
        {estimatedMinutes && (
          <div className="flex items-center gap-1.5 text-white/80">
            <Clock className="w-4 h-4" />
            <span className="text-xs sm:text-sm">{estimatedMinutes} min</span>
          </div>
        )}
      </div>
    </div>
  )
}
