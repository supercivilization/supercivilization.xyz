export interface PasswordValidationResult {
  isValid: boolean
  errors: string[]
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = []
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    errors.push("Password must be at least 8 characters long")
  }
  if (!hasUpperCase) {
    errors.push("Password must contain at least one uppercase letter")
  }
  if (!hasLowerCase) {
    errors.push("Password must contain at least one lowercase letter")
  }
  if (!hasNumbers) {
    errors.push("Password must contain at least one number")
  }
  if (!hasSpecialChar) {
    errors.push("Password must contain at least one special character")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function getPasswordRequirementsText(): string {
  return "Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters"
} 