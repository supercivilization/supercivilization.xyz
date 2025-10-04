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

export default function ProgressIndicator({
  currentStep,
  totalSteps = 7,
  stepTitle: _stepTitle,
  estimatedMinutes,
}: ProgressIndicatorProps) {
  const colorClass = stepColors[currentStep as keyof typeof stepColors] || stepColors[1]

  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center justify-between mb-3">
        {/* Step Dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index + 1 === currentStep
                  ? `w-8 bg-gradient-to-r ${colorClass}`
                  : index + 1 < currentStep
                    ? "w-2 bg-white/40"
                    : "w-2 bg-white/20"
              }`}
            />
          ))}
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
