import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getCategoriesEndpoint,
  getCategoryEndpoint,
  saveCategoryEndpoint,
  updateCategoryEndpoint,
  deleteCategoryEndpoint,
} from './category-endpoint'
import { ICategory } from '../entities/category.interface'
import { makeRequest } from '../../common/make-request'

vi.mock('../../common/make-request')

describe('Category endpoints', () => {
  const mockMakeRequest = vi.mocked(makeRequest)

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getCategoriesEndpoint', () => {
    it('fetches categories and returns parsed JSON', async () => {
      const mockCategories = [{ id: 1, name: 'Electronics', status: 1 }]
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      } as Response)

      const result = await getCategoriesEndpoint()

      expect(mockMakeRequest).toHaveBeenCalledWith('Categories', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      expect(result).toEqual(mockCategories)
    })

    it('returns undefined when response is not ok', async () => {
      mockMakeRequest.mockResolvedValueOnce({ ok: false } as Response)

      const result = await getCategoriesEndpoint()

      expect(result).toBeUndefined()
    })
  })

  describe('getCategoryEndpoint', () => {
    it('fetches a single category by id', async () => {
      const mockCategory = { id: 1, name: 'Electronics', status: 1 }
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategory),
      } as Response)

      const result = await getCategoryEndpoint(1)

      expect(mockMakeRequest).toHaveBeenCalledWith('Categories/1', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      expect(result).toEqual(mockCategory)
    })
  })

  describe('saveCategoryEndpoint', () => {
    it('sends POST request with category data', async () => {
      const category: ICategory = { id: 0, name: 'New Category', status: 1 }
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ id: 1, ...category }),
      } as Response)

      const result = await saveCategoryEndpoint(category)

      expect(mockMakeRequest).toHaveBeenCalledWith('Categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: category.name }),
      })
      expect(result).toEqual({ id: 1, ...category })
    })
  })

  describe('updateCategoryEndpoint', () => {
    it('sends PUT request with category data', async () => {
      const category: ICategory = { id: 1, name: 'Updated Category', status: 1 }
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(category),
      } as Response)

      const result = await updateCategoryEndpoint(category)

      expect(mockMakeRequest).toHaveBeenCalledWith('Categories', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      })
      expect(result).toEqual(category)
    })
  })

  describe('deleteCategoryEndpoint', () => {
    it('sends DELETE request for category', async () => {
      mockMakeRequest.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({}),
      } as Response)

      const result = await deleteCategoryEndpoint(1)

      expect(mockMakeRequest).toHaveBeenCalledWith('Categories/1', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      expect(result).toEqual({})
    })
  })
})
