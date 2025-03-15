"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full bg-zinc-200/80 dark:bg-zinc-800/80 backdrop-blur-sm
                hover:bg-zinc-300/80 dark:hover:bg-zinc-700/80 transition-all duration-200"
    >
      {theme === "dark" ? <Sun className="h-5 w-5 text-zinc-300" /> : <Moon className="h-5 w-5 text-zinc-700" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

