"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function ScrollIndicator() {
  const scrollToNextSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      onClick={scrollToNextSection}
    >
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <ChevronDown className="w-10 h-10 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors duration-300" />
      </motion.div>
    </motion.div>
  )
}

