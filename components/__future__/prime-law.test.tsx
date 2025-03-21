import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { PrimeLawPage } from './prime-law'
import { createClient } from '@supabase/supabase-js'

// Mock Supabase client
jest.mock('@supabase/supabase-js')

describe('Prime Law Agreement', () => {
  const mockSupabase = {
    from: jest.fn(() => ({
      select: jest.fn(),
      insert: jest.fn(),
    })),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(createClient as jest.Mock).mockReturnValue(mockSupabase)
  })

  it('should render the Prime Law content', () => {
    render(<PrimeLawPage />)
    
    // Check for main sections
    expect(screen.getByText('The Prime Law')).toBeInTheDocument()
    expect(screen.getByText('The purpose of human life is to prosper and live happily.')).toBeInTheDocument()
    expect(screen.getByText('Article 1')).toBeInTheDocument()
  })

  it('should show verification questions after reading', async () => {
    render(<PrimeLawPage />)
    
    // Find and click the "I have read" checkbox
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    // Wait for questions to appear
    await waitFor(() => {
      expect(screen.getByText('What is the only justified use of force according to The Prime Law?')).toBeInTheDocument()
    })
  })

  it('should calculate score correctly', async () => {
    render(<PrimeLawPage />)
    
    // Mark as read
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    // Answer questions correctly
    await waitFor(() => {
      const correctAnswer = screen.getByText('Protection from those who violate Article 1')
      fireEvent.click(correctAnswer)
    })
    
    // Submit answers
    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)
    
    // Check for success message
    await waitFor(() => {
      expect(screen.getByText(/Congratulations/i)).toBeInTheDocument()
    })
  })

  it('should show error for incorrect answers', async () => {
    render(<PrimeLawPage />)
    
    // Mark as read
    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    // Answer questions incorrectly
    await waitFor(() => {
      const wrongAnswer = screen.getByText('Force is never justified')
      fireEvent.click(wrongAnswer)
    })
    
    // Submit answers
    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/Please review your answers/i)).toBeInTheDocument()
    })
  })
}) 