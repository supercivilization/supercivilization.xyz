// This file provides utility functions for date-fns v4 compatibility
import { format, formatDistance, formatRelative, isToday, isYesterday, parseISO } from "date-fns"

// Format a date with a specific format string
export function formatDate(date: Date | string | number, formatStr = "PPP"): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, formatStr)
}

// Format a date relative to now (e.g., "5 minutes ago")
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date

  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, "p")}`
  }

  if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, "p")}`
  }

  return formatRelative(dateObj, new Date())
}

// Format the distance between two dates (e.g., "about 1 hour")
export function formatTimeDistance(date: Date | string | number, baseDate: Date = new Date()): string {
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return formatDistance(dateObj, baseDate, { addSuffix: true })
}

// Format a date for display in the UI
export function formatDisplayDate(date: Date | string | number): string {
  const dateObj = typeof date === "string" ? parseISO(date) : typeof date === "number" ? new Date(date) : date

  if (isToday(dateObj)) {
    return `Today at ${format(dateObj, "p")}`
  }

  if (isYesterday(dateObj)) {
    return `Yesterday at ${format(dateObj, "p")}`
  }

  // Within the current year
  if (dateObj.getFullYear() === new Date().getFullYear()) {
    return format(dateObj, "MMM d, p")
  }

  // Different year
  return format(dateObj, "MMM d, yyyy, p")
}

