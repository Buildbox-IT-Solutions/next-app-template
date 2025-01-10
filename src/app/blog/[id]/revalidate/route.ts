import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { ECacheKeys } from '~/enums/keys'

// This function handles GET requests to the revalidate route.
// It takes a request object and a params object containing the ID of the post to revalidate.
export async function GET(
	_request: Request,
	{
		params,
	}: {
		params: Promise<{ id: string }>
	},
) {
	const id = (await params).id

	if (!id) {
		// If the ID is not provided, return a 400 Bad Request response.
		return NextResponse.json(
			{
				error: 'ID is required',
			},
			{
				status: 400,
			},
		)
	}

	// Invalidate the cache for the specific post using the tag.
	// This ensures that the next request for this post will fetch fresh data.
	revalidateTag(`${ECacheKeys.POST}-${id}`)

	// Return a JSON response indicating that the cache for the post has been revalidated.
	return NextResponse.json({
		id,
		status: 'revalidated',
	})
}
