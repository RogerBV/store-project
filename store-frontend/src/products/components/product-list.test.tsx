import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ProductList from './product-list'
import { IProduct } from '../entities/product.interface'

vi.mock('./product-list-item', () => ({
  default: ({ product }: { product: IProduct }) => (
    <tr data-testid={`product-row-${product.id}`}>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  ),
}))

const mockProducts: IProduct[] = [
  { id: 1, name: 'Product A', price: 10, categoryId: 1, category_name: 'Category 1' },
  { id: 2, name: 'Product B', price: 20, categoryId: 2, category_name: 'Category 2' },
]

describe('ProductList', () => {
  const mockOnListProducts = vi.fn()

  it('renders the list title', () => {
    render(<ProductList productsParam={[]} onListProducts={mockOnListProducts} />)
    expect(screen.getByText('List of Products')).toBeInTheDocument()
    expect(screen.getByText('Manage the products registered in the store')).toBeInTheDocument()
  })

  it('displays product count', () => {
    render(<ProductList productsParam={mockProducts} onListProducts={mockOnListProducts} />)
    expect(screen.getByText('2 products')).toBeInTheDocument()
  })

  it('renders all products', () => {
    render(<ProductList productsParam={mockProducts} onListProducts={mockOnListProducts} />)
    expect(screen.getByTestId('product-row-1')).toBeInTheDocument()
    expect(screen.getByTestId('product-row-2')).toBeInTheDocument()
  })

  it('shows 0 products when list is empty', () => {
    render(<ProductList productsParam={[]} onListProducts={mockOnListProducts} />)
    expect(screen.getByText('0 products')).toBeInTheDocument()
  })
})
