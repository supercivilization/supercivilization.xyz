import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ForumSystem } from './forum'
import { createClient } from '@supabase/supabase-js'

// Mock Supabase client
jest.mock('@supabase/supabase-js')

describe('Forum System', () => {
  const mockTopics = [
    {
      id: '1',
      title: 'Understanding The Prime Law',
      author: {
        name: 'John Doe',
        trust_score: 85,
      },
      created_at: '2024-03-20T00:00:00Z',
      last_post: {
        content: 'Great discussion!',
        created_at: '2024-03-21T00:00:00Z',
      },
      post_count: 5,
    },
    {
      id: '2',
      title: 'Community Guidelines',
      author: {
        name: 'Jane Smith',
        trust_score: 92,
      },
      created_at: '2024-03-19T00:00:00Z',
      last_post: {
        content: 'Please read carefully',
        created_at: '2024-03-20T00:00:00Z',
      },
      post_count: 3,
    },
  ]

  const mockPosts = [
    {
      id: '1',
      topic_id: '1',
      content: 'Initial post content',
      author: {
        name: 'John Doe',
        trust_score: 85,
      },
      created_at: '2024-03-20T00:00:00Z',
    },
    {
      id: '2',
      topic_id: '1',
      content: 'Reply to initial post',
      author: {
        name: 'Jane Smith',
        trust_score: 92,
      },
      created_at: '2024-03-21T00:00:00Z',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render forum topics list', () => {
    render(
      <ForumSystem
        currentUserId="user1"
        topics={mockTopics}
        posts={[]}
      />
    )

    expect(screen.getByText('Forum Topics')).toBeInTheDocument()
    expect(screen.getByText('Understanding The Prime Law')).toBeInTheDocument()
    expect(screen.getByText('Community Guidelines')).toBeInTheDocument()
  })

  it('should display topic details when selected', () => {
    render(
      <ForumSystem
        currentUserId="user1"
        topics={mockTopics}
        posts={mockPosts}
      />
    )

    // Click on a topic
    fireEvent.click(screen.getByText('Understanding The Prime Law'))

    expect(screen.getByText('Initial post content')).toBeInTheDocument()
    expect(screen.getByText('Reply to initial post')).toBeInTheDocument()
  })

  it('should create new topic', async () => {
    const mockCreateTopic = jest.fn()
    render(
      <ForumSystem
        currentUserId="user1"
        topics={mockTopics}
        posts={[]}
        onCreateTopic={mockCreateTopic}
      />
    )

    // Click new topic button
    const newTopicButton = screen.getByRole('button', { name: /new topic/i })
    fireEvent.click(newTopicButton)

    // Fill in topic details
    const titleInput = screen.getByPlaceholderText(/topic title/i)
    fireEvent.change(titleInput, { target: { value: 'New Topic' } })

    const contentInput = screen.getByPlaceholderText(/topic content/i)
    fireEvent.change(contentInput, { target: { value: 'Topic content' } })

    // Submit topic
    const submitButton = screen.getByRole('button', { name: /create/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockCreateTopic).toHaveBeenCalledWith('New Topic', 'Topic content')
    })
  })

  it('should add reply to topic', async () => {
    const mockAddReply = jest.fn()
    render(
      <ForumSystem
        currentUserId="user1"
        topics={mockTopics}
        posts={mockPosts}
        onAddReply={mockAddReply}
      />
    )

    // Select topic
    fireEvent.click(screen.getByText('Understanding The Prime Law'))

    // Add reply
    const replyInput = screen.getByPlaceholderText(/your reply/i)
    fireEvent.change(replyInput, { target: { value: 'New reply' } })

    const submitButton = screen.getByRole('button', { name: /reply/i })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockAddReply).toHaveBeenCalledWith('1', 'New reply')
    })
  })

  it('should filter topics by trust score', () => {
    render(
      <ForumSystem
        currentUserId="user1"
        topics={mockTopics}
        posts={[]}
      />
    )

    // Set trust score filter
    const filterInput = screen.getByPlaceholderText(/min trust score/i)
    fireEvent.change(filterInput, { target: { value: '90' } })

    expect(screen.getByText('Community Guidelines')).toBeInTheDocument()
    expect(screen.queryByText('Understanding The Prime Law')).not.toBeInTheDocument()
  })

  it('should show trust score badges for authors', () => {
    render(
      <ForumSystem
        currentUserId="user1"
        topics={mockTopics}
        posts={[]}
      />
    )

    expect(screen.getByText('85')).toBeInTheDocument()
    expect(screen.getByText('92')).toBeInTheDocument()
  })

  it('should handle loading states', async () => {
    render(
      <ForumSystem
        currentUserId="user1"
        topics={[]}
        posts={[]}
        isLoading={true}
      />
    )

    expect(screen.getByRole('status')).toBeInTheDocument()

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })
  })
}) 