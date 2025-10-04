/**
 * UI Utility Functions
 * Contrast-safe text utilities for dark gradient backgrounds
 * WCAG 2.1 AA compliant (4.5:1 for normal text, 3:1 for large text)
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Contrast-safe text shadows for dark gradient backgrounds
 * Use these classes to ensure text is readable on complex gradients
 */
export const contrastSafeText = {
  /** Primary headings on gradients - large bold text */
  heading: "[text-shadow:_0_2px_12px_rgb(0_0_0_/_90%)]",

  /** Body text on gradients - normal weight text */
  body: "[text-shadow:_0_1px_8px_rgb(0_0_0_/_85%)]",

  /** Secondary/muted text on gradients */
  muted: "[text-shadow:_0_1px_6px_rgb(0_0_0_/_80%)]",

  /** Interactive elements (buttons, links) on gradients */
  interactive: "[text-shadow:_0_1px_4px_rgb(0_0_0_/_75%)]",
}

/**
 * WCAG-compliant touch targets
 * Minimum 44px x 44px for Level AA compliance
 */
export const touchTarget = {
  /** Standard WCAG AA touch target (44px min) */
  standard: "min-w-[44px] min-h-[44px] touch-manipulation",

  /** Large touch target for primary actions (48px) */
  large: "min-w-[48px] min-h-[48px] touch-manipulation",

  /** Small but still compliant (44px with padding) */
  small: "min-w-[44px] min-h-[44px] p-2 touch-manipulation",
}

/**
 * Focus-visible styles for keyboard navigation
 * WCAG 2.1 Level AA compliant focus indicators
 */
export const focusVisible = {
  /** Standard focus ring */
  default: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",

  /** High contrast focus ring for dark backgrounds */
  highContrast: "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black",

  /** Focus ring for interactive elements on gradients */
  onGradient: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-4 focus-visible:ring-offset-black/50",
}
