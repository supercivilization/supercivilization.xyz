import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AdminDashboardClient } from './admin-dashboard-client'
import { createClient } from '@supabase/supabase-js'

// Mock Supabase client
jest.mock('@supabase/supabase-js')

describe('Admin Dashboard', () => {
  const mockStats = {
    totalUsers: 100,
    pendingUsers: 5,
    activeUsers: 80,
    totalInvites: 50,
    usedInvites: 30,
    conversionRate: 60,
  }

  const mockRecentUsers = [
    {
      id: '1',
      user_id: 'user1',
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
      role: 'user',
      created_at: '2024-03-20T00:00:00Z',
    },
    {
      id: '2',
      user_id: 'user2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'pending',
      role: 'user',
      created_at: '2024-03-19T00:00:00Z',
    },
  ]

  const mockRecentLogs = [
    {
      id: '1',
      action: 'update_role',
      target_table: 'users',
      target_id: 'user1',
      created_at: '2024-03-20T00:00:00Z',
      admin: {
        name: 'Admin User',
      },
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render admin dashboard with stats', () => {
    render(
      <AdminDashboardClient
        stats={mockStats}
        recentUsers={mockRecentUsers}
        recentLogs={mockRecentLogs}
      />
    )

    // Check stats are displayed
    expect(screen.getByText('100')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('60%')).toBeInTheDocument()
  })

  it('should display recent users', () => {
    render(
      <AdminDashboardClient
        stats={mockStats}
        recentUsers={mockRecentUsers}
        recentLogs={mockRecentLogs}
      />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('should handle role updates', async () => {
    const mockUpdateRole = jest.fn()
    render(
      <AdminDashboardClient
        stats={mockStats}
        recentUsers={mockRecentUsers}
        recentLogs={mockRecentLogs}
        onUpdateRole={mockUpdateRole}
      />
    )

    // Find and click role update button
    const roleButton = screen.getByRole('button', { name: /update role/i })
    fireEvent.click(roleButton)

    // Select new role
    const moderatorOption = screen.getByText('moderator')
    fireEvent.click(moderatorOption)

    await waitFor(() => {
      expect(mockUpdateRole).toHaveBeenCalledWith('user1', 'moderator')
    })
  })

  it('should handle user bans', async () => {
    const mockBanUser = jest.fn()
    render(
      <AdminDashboardClient
        stats={mockStats}
        recentUsers={mockRecentUsers}
        recentLogs={mockRecentLogs}
        onBanUser={mockBanUser}
      />
    )

    // Find and click ban button
    const banButton = screen.getByRole('button', { name: /ban user/i })
    fireEvent.click(banButton)

    // Enter ban reason
    const reasonInput = screen.getByPlaceholderText(/reason/i)
    fireEvent.change(reasonInput, { target: { value: 'Violation of rules' } })

    // Submit ban
    const submitButton = screen.getByRole('button', { name: /confirm/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockBanUser).toHaveBeenCalledWith('user1', 'Violation of rules')
    })
  })

  it('should refresh data when refresh button is clicked', async () => {
    const mockRefresh = jest.fn()
    render(
      <AdminDashboardClient
        stats={mockStats}
        recentUsers={mockRecentUsers}
        recentLogs={mockRecentLogs}
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