/**
 * This file provides compatibility between our dependencies and React 19 / date-fns 4.1.0
 * It helps resolve peer dependency warnings without downgrading our packages
 */

// Re-export React hooks to ensure compatibility
import React from "react"

// Export React hooks that might be used by third-party libraries
export const useState = React.useState
export const useEffect = React.useEffect
export const useContext = React.useContext
export const useRef = React.useRef
export const useMemo = React.useMemo
export const useCallback = React.useCallback

// Provide compatibility for date-fns if needed
import { format, parse, isValid, formatDistance } from "date-fns"

// Re-export date-fns functions with compatibility wrappers
export const formatDate = format
export const parseDate = parse
export const isValidDate = isValid
export const formatDistanceDate = formatDistance

// Add any other compatibility helpers as needed

