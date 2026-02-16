import { describe, it, expect, vi, beforeEach } from 'vitest'
import { makeRequest } from './make-request'

describe('makeRequest', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  it('makes a fetch request to the correct URL', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve({}),
    } as Response)

    await makeRequest('api/test', { method: 'GET' })

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('api/test'),
      expect.any(Object)
    )
  })

  it('returns the response when successful', async () => {
    const mockResponse = { ok: true, status: 200 } as Response
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce(mockResponse)

    const result = await makeRequest('api/test', { method: 'GET' })

    expect(result).toBe(mockResponse)
  })

  it('passes request options to fetch', async () => {
    const mockFetch = vi.mocked(fetch)
    mockFetch.mockResolvedValueOnce({ ok: true, status: 200 } as Response)

    const requestOptions = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }
    await makeRequest('api/test', requestOptions)

    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      requestOptions
    )
  })
})
