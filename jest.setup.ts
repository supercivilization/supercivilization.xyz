import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'
import React from 'react'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}))

// Mock next/link
jest.mock('next/link', () => {
  const React = require('react')
  return function Link({ children, ...props }: { children: React.ReactNode }) {
    return React.createElement('a', props, children)
  }
})

// Mock lucide-react
jest.mock('lucide-react', () => ({
  Users: () => React.createElement('div', { 'data-testid': 'users-icon' }),
  UserCheck: () => React.createElement('div', { 'data-testid': 'user-check-icon' }),
  UserX: () => React.createElement('div', { 'data-testid': 'user-x-icon' }),
  Clock: () => React.createElement('div', { 'data-testid': 'clock-icon' }),
  Activity: () => React.createElement('div', { 'data-testid': 'activity-icon' }),
  RefreshCw: () => React.createElement('div', { 'data-testid': 'refresh-icon' }),
  Shield: () => React.createElement('div', { 'data-testid': 'shield-icon' }),
})) 