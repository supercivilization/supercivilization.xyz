"use client"

import { ChevronDown } from "lucide-react"

export default function ScrollIndicator() {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer animate-bounce"
      onClick={scrollToNextSection}
    >
      <ChevronDown className="w-10 h-10 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors duration-300" />
    </div>
  )
}

