import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AdminDashboardClient from './admin-dashboard-client'
import * as adminActions from '@/actions/admin-actions'

// Mock the admin actions
jest.mock('@/actions/admin-actions', () => ({
  updateUserRole: jest.fn(),
  banUser: jest.fn()
}))

// Mock the toast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
  })
}))

// Mock window.location.reload
const mockReload = jest.fn()
Object.defineProperty(window, 'location', {
  value: {
    reload: mockReload
  },
  writable: true
})

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
    // Mock window.prompt for each test
    window.prompt = jest.fn()
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
    const mockUpdateUserRole = adminActions.updateUserRole as jest.Mock
    mockUpdateUserRole.mockResolvedValueOnce({ success: true })
    window.prompt = jest.fn().mockReturnValue('moderator')

    render(
      <AdminDashboardClient
        stats={mockStats}
        recentUsers={mockRecentUsers}
        recentLogs={mockRecentLogs}
      />
    )

    // Find and click role update button
    const roleButton = screen.getByLabelText('Change role for John Doe')
    fireEvent.click(roleButton)

    await waitFor(() => {
      expect(mockUpdateUserRole).toHaveBeenCalledWith('user1', 'moderator')
    })
  })

  it('should handle user bans', async () => {
    const mockBanUser = adminActions.banUser as jest.Mock
    mockBanUser.mockResolvedValueOnce({ success: true })
    window.prompt = jest.fn().mockReturnValue('Test Reason')

    render(
      <AdminDashboardClient
        stats={mockStats}
        recentUsers={mockRecentUsers}
        recentLogs={mockRecentLogs}
      />
    )

    // Find and click ban button
    const banButton = screen.getByLabelText('Ban John Doe')
    fireEvent.click(banButton)

    await waitFor(() => {
      expect(mockBanUser).toHaveBeenCalledWith('user1', 'Test Reason')
    })
  })

  it('should refresh data when refresh button is clicked', () => {
    render(
      <AdminDashboardClient
        stats={mockStats}
        recentUsers={mockRecentUsers}
        recentLogs={mockRecentLogs}
      />
    )

    const refreshButton = screen.getByRole('button', { name: /refresh/i })
    fireEvent.click(refreshButton)

    expect(mockReload).toHaveBeenCalled()
  })
}) 