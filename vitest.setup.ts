import '@testing-library/jest-dom'
import { expect, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'
import React from 'react'

// Add jest-dom matchers to vitest
expect.extend(matchers)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/link
vi.mock('next/link', () => {
  return {
    default: ({ children, href }: { children: React.ReactNode; href: string }) => {
      return React.createElement('a', { href }, children)
    }
  }
})

// Mock lucide-react
vi.mock('lucide-react', () => ({
  ArrowLeft: () => 'ArrowLeft',
  Copy: () => 'Copy',
  Check: () => 'Check',
  Clock: () => React.createElement('div', { 'data-testid': 'clock-icon' }),
  Loader2: () => 'Loader2',
  RefreshCw: () => React.createElement('div', { 'data-testid': 'refresh-icon' }),
  Shield: () => React.createElement('div', { 'data-testid': 'shield-icon' }),
  ShieldCheck: () => 'ShieldCheck',
  ShieldAlert: () => 'ShieldAlert',
  ShieldX: () => 'ShieldX',
  User: () => 'User',
  Users: () => React.createElement('div', { 'data-testid': 'users-icon' }),
  MessageSquare: () => 'MessageSquare',
  BarChart: () => 'BarChart',
  Settings: () => 'Settings',
  LogOut: () => 'LogOut',
  ChevronRight: () => 'ChevronRight',
  ChevronLeft: () => 'ChevronLeft',
  Plus: () => 'Plus',
  Minus: () => 'Minus',
  X: () => 'X',
  AlertCircle: () => 'AlertCircle',
  CheckCircle: () => 'CheckCircle',
  Info: () => 'Info',
  AlertTriangle: () => 'AlertTriangle',
  Mail: () => 'Mail',
  Key: () => 'Key',
  Eye: () => 'Eye',
  EyeOff: () => 'EyeOff',
  Search: () => 'Search',
  Filter: () => 'Filter',
  SortAsc: () => 'SortAsc',
  SortDesc: () => 'SortDesc',
  MoreVertical: () => 'MoreVertical',
  Edit: () => 'Edit',
  Trash: () => 'Trash',
  Ban: () => 'Ban',
  UserCog: () => 'UserCog',
  UserCheck: () => React.createElement('div', { 'data-testid': 'user-check-icon' }),
  UserX: () => React.createElement('div', { 'data-testid': 'user-x-icon' }),
  Activity: () => React.createElement('div', { 'data-testid': 'activity-icon' })
}))