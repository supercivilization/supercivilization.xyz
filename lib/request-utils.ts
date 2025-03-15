// Helper functions for Next.js 15 async request APIs

/**
 * Helper function to safely get cookies in an async way
 * Compatible with Next.js 15
 */
export async function getCookies() {
  const { cookies } = await import("next/headers")
  return await cookies()
}

/**
 * Helper function to safely get headers in an async way
 * Compatible with Next.js 15
 */
export async function getHeaders() {
  const { headers } = await import("next/headers")
  return await headers()
}

/**
 * Helper function to safely get searchParams in an async way
 * For use in page.tsx files
 */
export async function getSearchParams(request: Request) {
  const { searchParams } = new URL(request.url)
  return searchParams
}

