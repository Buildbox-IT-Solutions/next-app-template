import {
	type MockedFunction,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from 'vitest'
import { api } from '../api'

global.fetch = vi.fn()

vi.mock('~/utils/env', () => ({
	env: {
		BASE_URL: 'http://localhost:3000',
		NEXT_PUBLIC_BASE_URL: 'http://localhost:3000',
		DEV: true,
		NEXT_PUBLIC_DEV: true,
	},
}))

describe('ApiClient', () => {
	const fetch = global.fetch as MockedFunction<typeof global.fetch>

	const mockResponse = (status: number, body: unknown): Response => {
		return {
			ok: status >= 200 && status < 300,
			status,
			json: async () => body,
		} as unknown as Response
	}

	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('should make a GET request and return data', async () => {
		const data = { message: 'success' }
		fetch.mockResolvedValueOnce(mockResponse(200, data))

		const response = await api.get('/test')

		expect(fetch).toHaveBeenCalledWith(`${api.baseUrl}/test`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: undefined,
		})
		expect(response).toEqual(data)
	})

	it('should make a POST request and return data', async () => {
		const data = { message: 'created' }
		fetch.mockResolvedValueOnce(mockResponse(201, data))

		const response = await api.post('/test', { name: 'test' })

		expect(fetch).toHaveBeenCalledWith(`${api.baseUrl}/test`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: 'test' }),
		})
		expect(response).toEqual(data)
	})

	it('should make a PUT request and return data', async () => {
		const data = { message: 'updated' }
		fetch.mockResolvedValueOnce(mockResponse(200, data))

		const response = await api.put('/test', { name: 'updated test' })

		expect(fetch).toHaveBeenCalledWith(`${api.baseUrl}/test`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: 'updated test' }),
		})
		expect(response).toEqual(data)
	})

	it('should make a DELETE request and return data', async () => {
		const data = { message: 'deleted' }
		fetch.mockResolvedValueOnce(mockResponse(200, data))

		const response = await api.delete('/test')

		expect(fetch).toHaveBeenCalledWith(`${api.baseUrl}/test`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: undefined,
		})
		expect(response).toEqual(data)
	})

	it('should handle errors with message correctly', async () => {
		const errorData = { message: 'error' }
		fetch.mockResolvedValueOnce(mockResponse(400, errorData))

		await expect(api.get('/test')).rejects.toThrow('error')

		expect(fetch).toHaveBeenCalledWith(`${api.baseUrl}/test`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: undefined,
		})
	})

	it('should handle errors without message correctly', async () => {
		fetch.mockResolvedValueOnce(mockResponse(500, {}))
		await expect(api.get('/test')).rejects.toThrow('Something went wrong')

		expect(fetch).toHaveBeenCalledWith(`${api.baseUrl}/test`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			body: undefined,
		})
	})

	it('should log the response details', async () => {
		const data = { message: 'success' }
		fetch.mockResolvedValueOnce(mockResponse(200, data))
		const logSpy = vi.spyOn(console, 'log')

		await api.get('/test')

		expect(logSpy).toHaveBeenCalled()
		logSpy.mockRestore()
	})
})
