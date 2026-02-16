import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.PropsWithChildren<Record<string, unknown>>) => (
      <div data-testid="loading-spinner" {...props}>{children}</div>
    ),
  },
}))

describe('Loading', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading spinner', async () => {
    const Loading = (await import('./loading')).default
    render(<Loading />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('renders with correct structure', async () => {
    const Loading = (await import('./loading')).default
    const { container } = render(<Loading />)
    const loadingContainer = container.querySelector('#loading')
    expect(loadingContainer).toBeInTheDocument()
  })
})
