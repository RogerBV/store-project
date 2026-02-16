import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CategoryListItem from './category-list-item'
import { ICategory } from '../entities/category.interface'

vi.mock('./category-update', () => ({
  default: () => <button data-testid="edit-category-button">Edit</button>,
}))

vi.mock('./category-delete', () => ({
  default: () => <button data-testid="delete-category-button">Delete</button>,
}))

const mockCategory: ICategory = {
  id: 1,
  name: 'Electronics',
  status: 1,
}

describe('CategoryListItem', () => {
  const mockOnListCategories = vi.fn()

  it('renders category information', () => {
    render(
      <table>
        <tbody>
          <CategoryListItem category={mockCategory} index={0} onListCategories={mockOnListCategories} />
        </tbody>
      </table>
    )
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders initials from category name', () => {
    render(
      <table>
        <tbody>
          <CategoryListItem category={mockCategory} index={0} onListCategories={mockOnListCategories} />
        </tbody>
      </table>
    )
    expect(screen.getByText('E')).toBeInTheDocument()
  })

  it('renders Edit and Delete buttons', () => {
    render(
      <table>
        <tbody>
          <CategoryListItem category={mockCategory} index={0} onListCategories={mockOnListCategories} />
        </tbody>
      </table>
    )
    expect(screen.getByTestId('edit-category-button')).toBeInTheDocument()
    expect(screen.getByTestId('delete-category-button')).toBeInTheDocument()
  })

  it('handles multi-word category name for initials', () => {
    const multiWordCategory: ICategory = {
      ...mockCategory,
      name: 'Home Garden',
    }
    render(
      <table>
        <tbody>
          <CategoryListItem category={multiWordCategory} index={0} onListCategories={mockOnListCategories} />
        </tbody>
      </table>
    )
    expect(screen.getByText('HG')).toBeInTheDocument()
  })
})
