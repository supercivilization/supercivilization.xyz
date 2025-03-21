import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MessagingSystem } from './messaging'
import { createClient } from '@supabase/supabase-js'

// Mock Supabase client
jest.mock('@supabase/supabase-js')

describe('Messaging System', () => {
  const mockMessages = [
    {
      id: '1',
      sender_id: 'user1',
      receiver_id: 'user2',
      content: 'Hello!',
      created_at: '2024-03-20T00:00:00Z',
      sender: {
        name: 'John Doe',
        trust_score: 85,
      },
    },
  ]

  const mockContacts = [
    {
      id: 'user1',
      name: 'John Doe',
      trust_score: 85,
      last_message: 'Hello!',
      last_message_time: '2024-03-20T00:00:00Z',
    },
    {
      id: 'user2',
      name: 'Jane Smith',
      trust_score: 92,
      last_message: 'Hi there!',
      last_message_time: '2024-03-19T00:00:00Z',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render messaging interface', () => {
    render(
      <MessagingSystem
        currentUserId="user2"
        messages={mockMessages}
        contacts={mockContacts}
      />
    )

    expect(screen.getByText('Messages')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
  })

  it('should display messages for selected contact', () => {
    render(
      <MessagingSystem
        currentUserId="user2"
        messages={mockMessages}
        contacts={mockContacts}
      />
    )

    // Click on a contact
    fireEvent.click(screen.getByText('John Doe'))

    expect(screen.getByText('Hello!')).toBeInTheDocument()
  })

  it('should send new message', async () => {
    const mockSendMessage = jest.fn()
    render(
      <MessagingSystem
        currentUserId="user2"
        messages={mockMessages}
        contacts={mockContacts}
        onSendMessage={mockSendMessage}
      />
    )

    // Select contact
    fireEvent.click(screen.getByText('John Doe'))

    // Type message
    const messageInput = screen.getByPlaceholderText(/type a message/i)
    fireEvent.change(messageInput, { target: { value: 'New message' } })

    // Send message
    const sendButton = screen.getByRole('button', { name: /send/i })
    fireEvent.click(sendButton)

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith('user1', 'New message')
    })
  })

  it('should filter contacts by trust score', () => {
    render(
      <MessagingSystem
        currentUserId="user2"
        messages={mockMessages}
        contacts={mockContacts}
      />
    )

    // Set trust score filter
    const filterInput = screen.getByPlaceholderText(/min trust score/i)
    fireEvent.change(filterInput, { target: { value: '90' } })

    expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
  })

  it('should show trust score badges for contacts', () => {
    render(
      <MessagingSystem
        currentUserId="user2"
        messages={mockMessages}
        contacts={mockContacts}
      />
    )

    expect(screen.getByText('85')).toBeInTheDocument()
    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('should handle message loading states', async () => {
    render(
      <MessagingSystem
        currentUserId="user2"
        messages={[]}
        contacts={mockContacts}
        isLoading={true}
      />
    )

    // Click on a contact
    fireEvent.click(screen.getByText('John Doe'))

    expect(screen.getByRole('status')).toBeInTheDocument()

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })
  })
}) 