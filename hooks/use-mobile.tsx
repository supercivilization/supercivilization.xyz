"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIsMobile()

    // Add event listener
    window.addEventListener("resize", checkIsMobile)

    // Clean up
    return () => window.removeEventListener("resize", checkIsMobile)
  }, [])

  return isMobile
}

export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const checkIsTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= 768 && width < 1024)
    }

    // Initial check
    checkIsTablet()

    // Add event listener
    window.addEventListener("resize", checkIsTablet)

    // Clean up
    return () => window.removeEventListener("resize", checkIsTablet)
  }, [])

  return isTablet
}

export function useBreakpoint(breakpoint: number) {
  const [isAboveBreakpoint, setIsAboveBreakpoint] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return

    const checkBreakpoint = () => {
      setIsAboveBreakpoint(window.innerWidth >= breakpoint)
    }

    // Initial check
    checkBreakpoint()

    // Add event listener
    window.addEventListener("resize", checkBreakpoint)

    // Clean up
    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [breakpoint])

  return isAboveBreakpoint
}

