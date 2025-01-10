import { type Mocked, describe, expect, it, vi } from 'vitest'
import { ECacheKeys } from '~/enums/keys'
import type { IPost } from '~/interfaces/post'
import { api as rawApi } from '~/services/api'
import { useContainer } from './index'

// Mock the api service
vi.mock('~/services/api', () => ({
	api: {
		get: vi.fn(),
	},
}))

const api = rawApi as Mocked<typeof rawApi>

describe('useContainer', () => {
	it('should fetch the post with the correct ID and cache settings', async () => {
		const mockPost: IPost = {
			id: '1',
			title: 'Test Post',
			content: 'This is a test post.',
		}
		const id = '1'

		// Mock the API response
		api.get.mockResolvedValue(mockPost)

		const result = await useContainer(id)

		expect(api.get).toHaveBeenCalledWith(
			`https://api.vercel.app/blog/${id}`,
			{
				cache: 'force-cache',
				next: { tags: [`${ECacheKeys.POST}-${id}`] },
			},
		)
		expect(result).toEqual({ post: mockPost })
	})

	it('should handle errors when fetching the post', async () => {
		const id = '2'
		const errorMessage = 'Failed to fetch post'

		// Mock the API to throw an error
		api.get.mockRejectedValue(new Error(errorMessage))

		await expect(useContainer(id)).rejects.toThrow(errorMessage)
	})
})
