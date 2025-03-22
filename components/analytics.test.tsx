import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AnalyticsDashboard } from './analytics'
import { createClient } from '@supabase/supabase-js'

// Mock Supabase client
jest.mock('@supabase/supabase-js')

describe('Analytics Dashboard', () => {
  const mockStats = {
    totalUsers: 1000,
    activeUsers: 800,
    newUsersThisMonth: 50,
    averageTrustScore: 75,
    trustScoreDistribution: {
      bronze: 200,
      silver: 400,
      gold: 300,
      platinum: 100,
    },
    userGrowth: [
      { date: '2024-03-01', count: 900 },
      { date: '2024-03-15', count: 950 },
      { date: '2024-03-20', count: 1000 },
    ],
    activityMetrics: {
      dailyActiveUsers: 150,
      averageSessionDuration: 25,
      totalPosts: 5000,
      totalMessages: 10000,
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render analytics dashboard with key metrics', () => {
    render(<AnalyticsDashboard stats={mockStats} />)

    // Check key metrics
    expect(screen.getByText('1000')).toBeInTheDocument()
    expect(screen.getByText('800')).toBeInTheDocument()
    expect(screen.getByText('50')).toBeInTheDocument()
    expect(screen.getByText('75')).toBeInTheDocument()
  })

  it('should display trust score distribution chart', () => {
    render(<AnalyticsDashboard stats={mockStats} />)

    // Check trust score distribution
    expect(screen.getByText('Trust Score Distribution')).toBeInTheDocument()
    expect(screen.getByText('200')).toBeInTheDocument() // Bronze
    expect(screen.getByText('400')).toBeInTheDocument() // Silver
    expect(screen.getByText('300')).toBeInTheDocument() // Gold
    expect(screen.getByText('100')).toBeInTheDocument() // Platinum
  })

  it('should show user growth trend', () => {
    render(<AnalyticsDashboard stats={mockStats} />)

    expect(screen.getByText('User Growth')).toBeInTheDocument()
    expect(screen.getByText('900')).toBeInTheDocument()
    expect(screen.getByText('950')).toBeInTheDocument()
    expect(screen.getByText('1000')).toBeInTheDocument()
  })

  it('should display activity metrics', () => {
    render(<AnalyticsDashboard stats={mockStats} />)

    expect(screen.getByText('150')).toBeInTheDocument() // Daily active users
    expect(screen.getByText('25')).toBeInTheDocument() // Average session duration
    expect(screen.getByText('5000')).toBeInTheDocument() // Total posts
    expect(screen.getByText('10000')).toBeInTheDocument() // Total messages
  })

  it('should handle date range selection', async () => {
    const mockOnDateRangeChange = jest.fn()
    render(
      <AnalyticsDashboard
        stats={mockStats}
        onDateRangeChange={mockOnDateRangeChange}
      />
    )

    // Select date range
    const dateRangeSelect = screen.getByRole('combobox')
    fireEvent.change(dateRangeSelect, { target: { value: '30d' } })

    await waitFor(() => {
      expect(mockOnDateRangeChange).toHaveBeenCalledWith('30d')
    })
  })

  it('should handle metric type selection', async () => {
    const mockOnMetricChange = jest.fn()
    render(
      <AnalyticsDashboard
        stats={mockStats}
        onMetricChange={mockOnMetricChange}
      />
    )

    // Select metric type
    const metricSelect = screen.getByRole('combobox', { name: /metric type/i })
    fireEvent.change(metricSelect, { target: { value: 'activity' } })

    await waitFor(() => {
      expect(mockOnMetricChange).toHaveBeenCalledWith('activity')
    })
  })

  it('should show loading state', () => {
    render(<AnalyticsDashboard stats={null} isLoading={true} />)

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should handle error state', () => {
    render(
      <AnalyticsDashboard
        stats={null}
        isLoading={false}
        error="Failed to load analytics"
      />
    )

    expect(screen.getByText('Failed to load analytics')).toBeInTheDocument()
  })

  it('should refresh data when refresh button is clicked', async () => {
    const mockRefresh = jest.fn()
    render(
      <AnalyticsDashboard
        stats={mockStats}
        onRefresh={mockRefresh}
      />
    )

    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    fireEvent.click(refreshButton)

    await waitFor(() => {
      expect(mockRefresh).toHaveBeenCalled()
    })
  })
}) 