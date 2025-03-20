import { calculateTrustScore } from './trust-scoring'
import { createClient } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'

// Mock Supabase client
jest.mock('@supabase/supabase-js')

describe('Trust Scoring System', () => {
  const mockSupabase = {
    from: jest.fn(() => ({
      select: jest.fn(),
      single: jest.fn(),
    })),
  } as unknown as SupabaseClient

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  it('should calculate correct trust score for a new user', async () => {
    // Mock database responses
    mockSupabase.from.mockImplementation((table: string) => ({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null }),
    }))

    const score = await calculateTrustScore(mockSupabase, 'test-user-id')

    expect(score.total).toBe(0)
    expect(score.level).toBe('Bronze')
    expect(score.badges).toHaveLength(0)
  })

  it('should calculate correct trust score for an active user', async () => {
    // Mock database responses
    mockSupabase.from.mockImplementation((table: string) => ({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case 'prime_law_agreements':
            return Promise.resolve({ data: { understanding_score: 90 } })
          case 'user_activity':
            return Promise.resolve({ data: { active_days: 45 } })
          case 'reputation':
            return Promise.resolve({ data: { score: 85 } })
          default:
            return Promise.resolve({ data: null })
        }
      }),
    }))

    const score = await calculateTrustScore(mockSupabase, 'test-user-id')

    expect(score.total).toBeGreaterThan(0)
    expect(score.level).toBe('Gold')
    expect(score.badges).toContain('Law Adherent')
    expect(score.badges).toContain('Active Participant')
  })

  it('should calculate correct trust score for a platinum user', async () => {
    // Mock database responses
    mockSupabase.from.mockImplementation((table: string) => ({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockImplementation((table: string) => {
        switch (table) {
          case 'prime_law_agreements':
            return Promise.resolve({ data: { understanding_score: 95 } })
          case 'user_activity':
            return Promise.resolve({ data: { active_days: 120 } })
          case 'reputation':
            return Promise.resolve({ data: { score: 95 } })
          default:
            return Promise.resolve({ data: null })
        }
      }),
    }))

    const score = await calculateTrustScore(mockSupabase, 'test-user-id')

    expect(score.total).toBeGreaterThan(75)
    expect(score.level).toBe('Platinum')
    expect(score.badges).toContain('Law Guardian')
    expect(score.badges).toContain('Community Pillar')
  })
}) 