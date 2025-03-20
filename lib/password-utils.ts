/**
 * Password validation and utility functions
 */

// Password requirements
const MIN_LENGTH = 8
const REQUIRES_UPPERCASE = true
const REQUIRES_LOWERCASE = true
const REQUIRES_NUMBER = true
const REQUIRES_SPECIAL = true

/**
 * Validates a password against security requirements
 * @param password The password to validate
 * @returns boolean indicating if the password meets all requirements
 */
export function validatePassword(password: string): boolean {
  if (!password || password.length < MIN_LENGTH) {
    return false
  }

  if (REQUIRES_UPPERCASE && !/[A-Z]/.test(password)) {
    return false
  }

  if (REQUIRES_LOWERCASE && !/[a-z]/.test(password)) {
    return false
  }

  if (REQUIRES_NUMBER && !/[0-9]/.test(password)) {
    return false
  }

  if (REQUIRES_SPECIAL && !/[^A-Za-z0-9]/.test(password)) {
    return false
  }

  return true
}

/**
 * Returns a human-readable text describing password requirements
 * @returns string with password requirements
 */
export function getPasswordRequirementsText(): string {
  return `Password must be at least ${MIN_LENGTH} characters and include ${REQUIRES_UPPERCASE ? 'an uppercase letter, ' : ''}${REQUIRES_LOWERCASE ? 'a lowercase letter, ' : ''}${REQUIRES_NUMBER ? 'a number, ' : ''}${REQUIRES_SPECIAL ? 'and a special character' : ''}.`
}

/**
 * Calculates password strength on a scale of 0-4
 * @param password The password to evaluate
 * @returns number from 0 (very weak) to 4 (very strong)
 */
export function getPasswordStrength(password: string): number {
  if (!password) return 0

  let score = 0
  
  // Length check
  if (password.length >= MIN_LENGTH) score += 1
  if (password.length >= 12) score += 1

  // Character variety checks
  if (/[A-Z]/.test(password)) score += 1
  if (/[a-z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^A-Za-z0-9]/.test(password)) score += 1

  // Normalize to 0-4 scale
  return Math.min(4, Math.floor(score / 2))
}

/**
 * Returns a color based on password strength
 * @param strength Password strength value (0-4)
 * @returns CSS color string
 */
export function getPasswordStrengthColor(strength: number): string {
  switch (strength) {
    case 0: return 'var(--red-500)' // Very weak
    case 1: return 'var(--orange-500)' // Weak
    case 2: return 'var(--yellow-500)' // Medium
    case 3: return 'var(--green-400)' // Strong
    case 4: return 'var(--green-600)' // Very strong
    default: return 'var(--red-500)'
  }
} 