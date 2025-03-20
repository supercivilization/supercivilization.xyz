import { render, screen, waitFor } from '@testing-library/react'
import { TrustScoreDisplay } from './trust-score'
import { createClient } from '@supabase/supabase-js'

// Mock Supabase client
jest.mock('@supabase/supabase-js')

describe('Trust Score Display', () => {
  const mockSupabase = {
    from: jest.fn(() => ({
      select: jest.fn(),
      single: jest.fn(),
    })),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  it('should show loading state initially', () => {
    render(<TrustScoreDisplay userId="test-user" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should display bronze level for new user', async () => {
    // Mock database responses for new user
    mockSupabase.from.mockImplementation((table: string) => ({
      select: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null }),
    }))

    render(<TrustScoreDisplay userId="test-user" />)

    await waitFor(() => {
      expect(screen.getByText('Bronze')).toBeInTheDocument()
      expect(screen.getByText('0%')).toBeInTheDocument()
    })
  })

  it('should display gold level for active user', async () => {
    // Mock database responses for active user
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

    render(<TrustScoreDisplay userId="test-user" />)

    await waitFor(() => {
      expect(screen.getByText('Gold')).toBeInTheDocument()
      expect(screen.getByText('Law Adherent')).toBeInTheDocument()
      expect(screen.getByText('Active Participant')).toBeInTheDocument()
    })
  })

  it('should display platinum level for highly trusted user', async () => {
    // Mock database responses for platinum user
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

    render(<TrustScoreDisplay userId="test-user" />)

    await waitFor(() => {
      expect(screen.getByText('Platinum')).toBeInTheDocument()
      expect(screen.getByText('Law Guardian')).toBeInTheDocument()
      expect(screen.getByText('Community Pillar')).toBeInTheDocument()
    })
  })

  it('should handle error state gracefully', async () => {
    // Mock database error
    mockSupabase.from.mockImplementation(() => {
      throw new Error('Database error')
    })

    render(<TrustScoreDisplay userId="test-user" />)

    await waitFor(() => {
      expect(screen.getByText('Unable to load trust score')).toBeInTheDocument()
    })
  })
}) 