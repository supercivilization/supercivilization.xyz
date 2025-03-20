import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// Create Redis client
const redis = Redis.fromEnv()

// Create a new ratelimiter that allows 5 requests per 24 hours
const inviteRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '24 h'),
  analytics: true,
  prefix: '@upstash/ratelimit',
})

/**
 * Check if a user has exceeded their rate limit for invite generation
 * @param userId The ID of the user to check
 * @returns Object containing success status and remaining limit
 */
export async function checkInviteRateLimit(userId: string) {
  try {
    const { success, limit, remaining, reset } = await inviteRatelimit.limit(userId)
    
    return {
      success,
      limit,
      remaining,
      reset,
      error: null
    }
  } catch (error) {
    console.error('Rate limit check failed:', error)
    return {
      success: false,
      limit: 0,
      remaining: 0,
      reset: new Date(),
      error: 'Failed to check rate limit'
    }
  }
} 