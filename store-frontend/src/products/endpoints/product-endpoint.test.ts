import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getProductsEndpoint,
  getProductEndpoint,
  saveProductEndpoint,
  updateProductEndpoint,
  deleteProductEndpoint,
} from './product-endpoint'
import { IProduct } from '../entities/product.interface'
import { makeRequest } from '../../common/make-request'

vi.mock('../../common/make-request')

describe('Product endpoints', () => {
  const mockMakeRequest = vi.mocked(makeRequest)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getProductsEndpoint', () => {
    it('fetches products and returns parsed JSON', async () => {
      const mockProducts = [{ id: 1, name: 'Product 1', price: 10 }]
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      } as Response)

      const result = await getProductsEndpoint()

      expect(mockMakeRequest).toHaveBeenCalledWith('Products', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      expect(result).toEqual(mockProducts)
    })

    it('returns undefined when response is not ok', async () => {
      mockMakeRequest.mockResolvedValueOnce({ ok: false } as Response)

      const result = await getProductsEndpoint()

      expect(result).toBeUndefined()
    })
  })

  describe('getProductEndpoint', () => {
    it('fetches a single product by id', async () => {
      const mockProduct = { id: 1, name: 'Product 1', price: 10 }
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      } as Response)

      const result = await getProductEndpoint(1)

      expect(mockMakeRequest).toHaveBeenCalledWith('Products/1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      expect(result).toEqual(mockProduct)
    })
  })

  describe('saveProductEndpoint', () => {
    it('sends POST request with product data', async () => {
      const product: IProduct = {
        id: 0,
        name: 'New Product',
        price: 99,
        categoryId: 1,
        category_name: 'Cat1',
      }
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1, ...product }),
      } as Response)

      const result = await saveProductEndpoint(product)

      expect(mockMakeRequest).toHaveBeenCalledWith('Products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          price: product.price,
          categoryId: product.categoryId,
        }),
      })
      expect(result).toEqual({ id: 1, ...product })
    })
  })

  describe('updateProductEndpoint', () => {
    it('sends PUT request with product data', async () => {
      const product: IProduct = {
        id: 1,
        name: 'Updated Product',
        price: 150,
        categoryId: 1,
        category_name: 'Cat1',
      }
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(product),
      } as Response)

      const result = await updateProductEndpoint(product)

      expect(mockMakeRequest).toHaveBeenCalledWith('Products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      })
      expect(result).toEqual(product)
    })
  })

  describe('deleteProductEndpoint', () => {
    it('sends DELETE request for product', async () => {
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)

      const result = await deleteProductEndpoint(1)

      expect(mockMakeRequest).toHaveBeenCalledWith('Products/1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      expect(result).toEqual({})
    })
  })
})
