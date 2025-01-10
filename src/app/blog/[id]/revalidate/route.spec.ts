import { revalidateTag } from 'next/cache'
import { describe, expect, it, vi } from 'vitest'
import { ECacheKeys } from '~/enums/keys'
import { GET } from './route'

vi.mock('next/cache', () => ({
	revalidateTag: vi.fn(),
}))

vi.mock('next/server', () => ({
	NextResponse: {
		json: vi.fn((body, init) => ({ body, init })),
	},
}))

describe('GET /revalidate', () => {
	it('should return 400 if ID is not provided', async () => {
		const request = new Request('http://localhost')
		const params = Promise.resolve({ id: '' })

		const response = await GET(request, { params })

		expect(response).toEqual({
			body: { error: 'ID is required' },
			init: { status: 400 },
		})
	})

	it('should revalidate the cache and return the revalidated status', async () => {
		const id = '123'

		const request = new Request('http://localhost')
		const params = Promise.resolve({ id })

		const response = await GET(request, { params })

		expect(revalidateTag).toHaveBeenCalledWith(`${ECacheKeys.POST}-123`)
		expect(response).toEqual({
			body: { id, status: 'revalidated' },
		})
	})
})
