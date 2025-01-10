import { format } from 'date-fns'
import { getTranslations } from 'next-intl/server'
import type { IPost } from '~/interfaces/post'
import { api } from '~/services/api'
import { useContainer } from '.'

interface IPageProps {
	params: Promise<{ id: string }>
}

// This function generates metadata for the page based on the post ID.
// It fetches the post data and returns an object containing the title and description.
// This metadata is used by Next.js to set the page's <title> and <meta> tags.
export async function generateMetadata({ params }: IPageProps) {
	const id = (await params).id

	// Fetch the specific post based on the provided ID.
	const post = await api.get<IPost>(`https://api.vercel.app/blog/${id}`)

	return {
		// Set the page title to the post title.
		title: post.title,
		// Set the page description to the post content.
		description: post.content,
	}
}

// The Page component is async because it needs to fetch data before rendering.
// This allows Next.js to wait for the data to be fetched before rendering the page.
export default async function Page({ params }: IPageProps) {
	const id = (await params).id

	const t = await getTranslations('BLOG')

	const { post } = await useContainer(id)

	// Render the post content
	return (
		<main className="m-auto flex min-h-screen p-8">
			<article className="mx-auto max-w-3xl rounded-lg p-6 shadow-md">
				<h1 className="mb-4 font-bold text-3xl">{post.title}</h1>
				<p className="mb-6 text-gray-700 text-lg leading-relaxed">
					{post.content}
				</p>

				<strong className="mt-8 block text-right text-gray-500 text-sm">
					{t('RENDERED_AT', {
						date: format(new Date(), 'dd/MM/yyyy HH:mm:ss'),
					})}
				</strong>
			</article>
		</main>
	)
}
