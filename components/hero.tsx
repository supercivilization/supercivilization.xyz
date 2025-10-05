"use client"

import { Button } from "@/components/ui/button"
import ScrollIndicator from "./scroll-indicator"
import { useRouter } from "next/navigation"

export default function Hero() {
  const router = useRouter()

  const scrollToCards = () => {
    const cardsSection = document.getElementById("featured-cards")
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleParticipateClick = () => {
    router.push("/join")
  }

  const handleContributeClick = () => {
    router.push("/login")
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-100 via-zinc-50 to-zinc-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-300/30 via-zinc-400/20 to-zinc-500/30 dark:from-zinc-900/60 dark:via-zinc-900/70 dark:to-zinc-950/80" />
      </div>
      <div className="relative z-10 text-center space-y-8 sm:space-y-10 md:space-y-12 px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight tracking-tight">
          <span className="text-fuchsia-600">S</span>
          <span className="text-pink-600">u</span>
          <span className="text-rose-600">p</span>
          <span className="text-red-600">e</span>
          <span className="text-orange-600">r</span>
          <span className="text-amber-600">c</span>
          <span className="text-yellow-600">i</span>
          <span className="text-lime-600">v</span>
          <span className="text-green-600">i</span>
          <span className="text-emerald-600">l</span>
          <span className="text-teal-600">i</span>
          <span className="text-cyan-600">z</span>
          <span className="text-sky-600">a</span>
          <span className="text-blue-600">t</span>
          <span className="text-indigo-600">i</span>
          <span className="text-violet-600">o</span>
          <span className="text-purple-600">n</span>
        </h1>
        <p className="text-3xl sm:text-4xl md:text-5xl font-medium text-zinc-600 dark:text-zinc-200 leading-relaxed max-w-3xl mx-auto">
          Avolve from Degen to Regen
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8 sm:mt-10 md:mt-12">
          <Button
            size="lg"
            className="bg-zinc-800 hover:bg-zinc-900 text-zinc-50 dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-900 transition-all duration-300 transform hover:scale-105 font-semibold px-8 sm:px-10 py-3 text-lg sm:text-xl rounded-md"
            onClick={handleParticipateClick}
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-zinc-50/80 hover:bg-zinc-100/80 text-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-800/50 dark:text-zinc-100 border-zinc-300 dark:border-zinc-700 transition-all duration-300 transform hover:scale-105 font-semibold px-8 sm:px-10 py-3 text-lg sm:text-xl rounded-md backdrop-blur-sm"
            onClick={handleContributeClick}
          >
            Keep Going
          </Button>
        </div>
      </div>
      <div onClick={scrollToCards}>
        <ScrollIndicator />
      </div>
    </section>
  )
}

