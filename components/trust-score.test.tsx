import { render, screen, waitFor, act } from '@testing-library/react'
import { TrustScoreDisplay } from './trust-score'
import * as trustScoring from '@/lib/trust-scoring'

// Mock the trust scoring module
jest.mock('@/lib/trust-scoring', () => ({
  calculateTrustScore: jest.fn(),
}))

// Mock the Supabase client
jest.mock('@supabase/ssr', () => ({
  createBrowserClient: () => ({})
}))

// Mock the Loader2 component
jest.mock('lucide-react', () => ({
  Loader2: () => <div role="status" aria-label="Loading" />
}))

describe('Trust Score Display', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should display bronze level for new user', async () => {
    const mockScore = {
      level: 'Bronze',
      total: 0,
      components: {
        activity: 0,
        reputation: 0,
        understanding: 0
      },
      badges: []
    }
    const mockCalculateTrustScore = trustScoring.calculateTrustScore as jest.Mock
    mockCalculateTrustScore.mockResolvedValueOnce(mockScore)

    await act(async () => {
      render(<TrustScoreDisplay userId="test-user" />)
    })

    await waitFor(() => {
      expect(screen.getByText('Bronze')).toBeInTheDocument()
      expect(screen.getByText('Overall Score')).toBeInTheDocument()
      expect(screen.getByTestId('overall-score')).toHaveTextContent('0%')
    })
  })

  it('should display gold level for active user', async () => {
    const mockScore = {
      level: 'Gold',
      total: 75,
      components: {
        activity: 80,
        reputation: 70,
        understanding: 75
      },
      badges: ['Law Adherent', 'Active Participant']
    }
    const mockCalculateTrustScore = trustScoring.calculateTrustScore as jest.Mock
    mockCalculateTrustScore.mockResolvedValueOnce(mockScore)

    await act(async () => {
      render(<TrustScoreDisplay userId="test-user" />)
    })

    await waitFor(() => {
      expect(screen.getByText('Gold')).toBeInTheDocument()
      expect(screen.getByText('Overall Score')).toBeInTheDocument()
      expect(screen.getByTestId('overall-score')).toHaveTextContent('75%')
      expect(screen.getByText('Law Adherent')).toBeInTheDocument()
    })
  })

  it('should display platinum level for highly trusted user', async () => {
    const mockScore = {
      level: 'Platinum',
      total: 95,
      components: {
        activity: 95,
        reputation: 95,
        understanding: 95
      },
      badges: ['Law Guardian', 'Community Pillar']
    }
    const mockCalculateTrustScore = trustScoring.calculateTrustScore as jest.Mock
    mockCalculateTrustScore.mockResolvedValueOnce(mockScore)

    await act(async () => {
      render(<TrustScoreDisplay userId="test-user" />)
    })

    await waitFor(() => {
      expect(screen.getByText('Platinum')).toBeInTheDocument()
      expect(screen.getByText('Overall Score')).toBeInTheDocument()
      expect(screen.getByTestId('overall-score')).toHaveTextContent('95%')
      expect(screen.getByText('Law Guardian')).toBeInTheDocument()
    })
  })

  it('should handle loading state', async () => {
    const mockCalculateTrustScore = trustScoring.calculateTrustScore as jest.Mock
    mockCalculateTrustScore.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))

    await act(async () => {
      render(<TrustScoreDisplay userId="test-user" />)
    })

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should handle error state', async () => {
    const error = new Error('Failed to load')
    const mockCalculateTrustScore = trustScoring.calculateTrustScore as jest.Mock
    mockCalculateTrustScore.mockRejectedValueOnce(error)

    await act(async () => {
      render(<TrustScoreDisplay userId="test-user" />)
    })

    await waitFor(() => {
      expect(screen.getByText('Unable to load trust score')).toBeInTheDocument()
    })
  })
}) 