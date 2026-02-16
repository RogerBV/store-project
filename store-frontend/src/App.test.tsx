import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from './App'

vi.mock('./sidebar/sidebar', () => ({
  default: ({ activeView, onViewChange }: { activeView: string; onViewChange: (v: string) => void }) => (
    <div data-testid="sidebar">
      <span data-testid="active-view">{activeView}</span>
      <button onClick={() => onViewChange('categories')}>Go to Categories</button>
    </div>
  ),
}))

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the Sidebar component', () => {
    render(<App />)
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  it('initializes with home as active view', () => {
    render(<App />)
    expect(screen.getByTestId('active-view')).toHaveTextContent('home')
  })

  it('updates active view when sidebar triggers onViewChange', async () => {
    const user = (await import('@testing-library/user-event')).default.setup()
    render(<App />)
    const categoriesButton = screen.getByRole('button', { name: /go to categories/i })
    await user.click(categoriesButton)
    expect(screen.getByTestId('active-view')).toHaveTextContent('categories')
  })
})
