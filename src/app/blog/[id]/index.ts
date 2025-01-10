import { ECacheKeys } from '~/enums/keys'
import type { IPost } from '~/interfaces/post'
import { api } from '~/services/api'

export async function useContainer(id: string) {
	// Fetch the specific post based on the provided ID.
	// Fetching inside the component ensures that the data is always up-to-date
	// and allows for server-side rendering (SSR) or static site generation (SSG).
	const post = await api.get<IPost>(`https://api.vercel.app/blog/${id}`, {
		// The 'force-cache' option ensures that the fetched data is cached and reused
		// for subsequent requests, improving performance by reducing the number of API calls.
		cache: 'force-cache',
		// Adding a 'next' tag to the request to control caching behavior.
		// you can use `revalidateTag` come from 'next/cache' to control the cache behavior.
		next: { tags: [`${ECacheKeys.POST}-${id}`] },
	})

	return { post }
}
