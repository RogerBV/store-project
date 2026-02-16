import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CategoryList from './category-list'
import { ICategory } from '../entities/category.interface'

vi.mock('./category-list-item', () => ({
  default: ({ category }: { category: ICategory }) => (
    <tr data-testid={`category-row-${category.id}`}>
      <td>{category.name}</td>
    </tr>
  ),
}))

const mockCategories: ICategory[] = [
  { id: 1, name: 'Electronics', status: 1 },
  { id: 2, name: 'Clothing', status: 1 },
]

describe('CategoryList', () => {
  const mockOnListCategories = vi.fn()

  it('renders the list title', () => {
    render(<CategoryList categoriesParam={[]} onListCategories={mockOnListCategories} />)
    expect(screen.getByText('List of Categories')).toBeInTheDocument()
    expect(screen.getByText('Manage the categories registered in the store')).toBeInTheDocument()
  })

  it('displays category count', () => {
    render(<CategoryList categoriesParam={mockCategories} onListCategories={mockOnListCategories} />)
    expect(screen.getByText('2 categories')).toBeInTheDocument()
  })

  it('renders all categories', () => {
    render(<CategoryList categoriesParam={mockCategories} onListCategories={mockOnListCategories} />)
    expect(screen.getByTestId('category-row-1')).toBeInTheDocument()
    expect(screen.getByTestId('category-row-2')).toBeInTheDocument()
  })

  it('shows 0 categories when list is empty', () => {
    render(<CategoryList categoriesParam={[]} onListCategories={mockOnListCategories} />)
    expect(screen.getByText('0 categories')).toBeInTheDocument()
  })
})
