import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Sidebar from './sidebar'

vi.mock('../categories/components/category-menu', () => ({
  default: () => <div data-testid="category-menu">Category Menu</div>,
}))

vi.mock('../products/components/product-menu', () => ({
  default: () => <div data-testid="product-menu">Product Menu</div>,
}))

describe('Sidebar', () => {
  const mockOnViewChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the sidebar with app title', () => {
    render(<Sidebar activeView="home" onViewChange={mockOnViewChange} />)
    expect(screen.getByText('Mi App')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Sidebar activeView="home" onViewChange={mockOnViewChange} />)
    expect(screen.getByText('Inicio')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
    expect(screen.getByText('Configuración')).toBeInTheDocument()
    expect(screen.getByText('Ayuda')).toBeInTheDocument()
  })

  it('calls onViewChange when Inicio is clicked', async () => {
    render(<Sidebar activeView="products" onViewChange={mockOnViewChange} />)
    await userEvent.click(screen.getByText('Inicio'))
    expect(mockOnViewChange).toHaveBeenCalledWith('home')
  })

  it('calls onViewChange when Categories is clicked', async () => {
    render(<Sidebar activeView="home" onViewChange={mockOnViewChange} />)
    await userEvent.click(screen.getByText('Categories'))
    expect(mockOnViewChange).toHaveBeenCalledWith('categories')
  })

  it('calls onViewChange when Products is clicked', async () => {
    render(<Sidebar activeView="home" onViewChange={mockOnViewChange} />)
    await userEvent.click(screen.getByText('Products'))
    expect(mockOnViewChange).toHaveBeenCalledWith('products')
  })

  it('shows CategoryMenu when activeView is categories', () => {
    render(<Sidebar activeView="categories" onViewChange={mockOnViewChange} />)
    expect(screen.getByTestId('category-menu')).toBeInTheDocument()
  })

  it('shows ProductMenu when activeView is products', () => {
    render(<Sidebar activeView="products" onViewChange={mockOnViewChange} />)
    expect(screen.getByTestId('product-menu')).toBeInTheDocument()
  })

  it('shows projects submenu when Proyectos is clicked', async () => {
    render(<Sidebar activeView="home" onViewChange={mockOnViewChange} />)
    expect(screen.queryByText('Proyecto 1')).not.toBeInTheDocument()
    await userEvent.click(screen.getByText('Proyectos'))
    expect(screen.getByText('Proyecto 1')).toBeInTheDocument()
    expect(screen.getByText('Proyecto 2')).toBeInTheDocument()
    expect(screen.getByText('Proyecto 3')).toBeInTheDocument()
  })
})
