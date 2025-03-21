import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import React from 'react'

global.TextEncoder = TextEncoder
// Cast TextDecoder to unknown first to avoid type compatibility issues
global.TextDecoder = TextDecoder as unknown as typeof globalThis.TextDecoder

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
  usePathname: () => '',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next/link
jest.mock('next/link', () => {
  const React = require('react')
  return function Link({ children, href }: { children: React.ReactNode; href: string }) {
    return React.createElement('a', { href }, children)
  }
})

// Mock lucide-react
jest.mock('lucide-react', () => ({
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