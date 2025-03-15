import type { ApiError } from "@/types/supabase"

// Error types
export enum ErrorType {
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",
  VALIDATION = "validation",
  NOT_FOUND = "not_found",
  SERVER_ERROR = "server_error",
  NETWORK_ERROR = "network_error",
  UNKNOWN = "unknown",
}

// Error class for consistent error handling
export class AppError extends Error {
  type: ErrorType
  status: number
  code?: string

  constructor(message: string, type: ErrorType = ErrorType.UNKNOWN, status = 500, code?: string) {
    super(message)
    this.name = "AppError"
    this.type = type
    this.status = status
    this.code = code
  }

  // Convert to API error format
  toApiError(): ApiError {
    return {
      message: this.message,
      status: this.status,
      code: this.code,
    }
  }

  // Convert to user-friendly message
  toUserMessage(): string {
    switch (this.type) {
      case ErrorType.AUTHENTICATION:
        return "Please sign in to continue."
      case ErrorType.AUTHORIZATION:
        return "You don't have permission to perform this action."
      case ErrorType.VALIDATION:
        return `Invalid input: ${this.message}`
      case ErrorType.NOT_FOUND:
        return "The requested resource was not found."
      case ErrorType.NETWORK_ERROR:
        return "Network error. Please check your connection and try again."
      case ErrorType.SERVER_ERROR:
        return "Something went wrong on our end. Please try again later."
      default:
        return "An unexpected error occurred. Please try again."
    }
  }
}

// Helper to handle API errors
export async function handleApiRequest<T>(
  requestFn: () => Promise<T>,
): Promise<{ data: T | null; error: ApiError | null }> {
  try {
    const data = await requestFn()
    return { data, error: null }
  } catch (err) {
    console.error("API request error:", err)

    if (err instanceof AppError) {
      return { data: null, error: err.toApiError() }
    }

    // Handle unknown errors
    const message = err instanceof Error ? err.message : "Unknown error occurred"
    return {
      data: null,
      error: {
        message,
        status: 500,
      },
    }
  }
}

// React hook for error handling in components
export function useErrorHandler() {
  const handleError = (error: unknown): AppError => {
    if (error instanceof AppError) {
      return error
    }

    if (error instanceof Error) {
      return new AppError(error.message)
    }

    return new AppError("An unknown error occurred")
  }

  return { handleError }
}

