import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductListItem from './product-list-item'
import { IProduct } from '../entities/product.interface'

vi.mock('./product-update', () => ({
  default: () => <button data-testid="edit-button">Edit</button>,
}))

vi.mock('./product-delete', () => ({
  default: () => <button data-testid="delete-button">Delete</button>,
}))

const mockProduct: IProduct = {
  id: 1,
  name: 'Test Product',
  price: 99.99,
  categoryId: 1,
  category_name: 'Electronics',
}

describe('ProductListItem', () => {
  const mockOnListProducts = vi.fn()

  it('renders product information', () => {
    render(
      <table>
        <tbody>
          <ProductListItem product={mockProduct} index={0} onListProducts={mockOnListProducts} />
        </tbody>
      </table>
    )
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('99.99')).toBeInTheDocument()
    expect(screen.getByText('Electronics')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders initials from product name', () => {
    render(
      <table>
        <tbody>
          <ProductListItem product={mockProduct} index={0} onListProducts={mockOnListProducts} />
        </tbody>
      </table>
    )
    expect(screen.getByText('TP')).toBeInTheDocument()
  })

  it('renders Edit and Delete buttons', () => {
    render(
      <table>
        <tbody>
          <ProductListItem product={mockProduct} index={0} onListProducts={mockOnListProducts} />
        </tbody>
      </table>
    )
    expect(screen.getByTestId('edit-button')).toBeInTheDocument()
    expect(screen.getByTestId('delete-button')).toBeInTheDocument()
  })

  it('handles single word product name for initials', () => {
    const singleWordProduct: IProduct = {
      ...mockProduct,
      name: 'Laptop',
    }
    render(
      <table>
        <tbody>
          <ProductListItem product={singleWordProduct} index={0} onListProducts={mockOnListProducts} />
        </tbody>
      </table>
    )
    expect(screen.getByText('L')).toBeInTheDocument()
  })
})
