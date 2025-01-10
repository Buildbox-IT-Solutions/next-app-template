'use client'

import Image from 'next/image'
import { redirect } from 'next/navigation'
import { useGetUser } from '~/services/auth'

export default function Page() {
	const { data, isLoading } = useGetUser()

	if (isLoading) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="loader h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-s-transparent border-t-4 ease-linear" />
			</div>
		)
	}

	if (!data) {
		redirect('/')
		return null
	}

	return (
		<main className="m-auto flex min-h-screen items-center justify-center p-8">
			<div className="max-w-md overflow-hidden rounded-lg bg-white shadow-lg">
				<div className="relative">
					<Image
						id="avatar"
						src={data?.avatar_url}
						alt="User Avatar"
						className="h-48 w-full object-cover"
						width={192}
						height={192}
					/>
				</div>
				<div id="userDetails" className="px-6 py-4 text-center">
					<h3
						id="username"
						className="font-semibold text-gray-800 text-xl"
					>
						{data?.login}
					</h3>
					<p id="bio" className="font-medium text-gray-600 text-sm" />
					<div className="mt-4 flex justify-center">
						<div>
							<p className="text-gray-600 text-sm">Followers</p>
							<p
								id="followers"
								className="font-semibold text-gray-800 text-lg"
							>
								{data?.followers}
							</p>
						</div>
						<div className="ml-6">
							<p className="text-gray-600 text-sm">
								Repositories
							</p>
							<p
								id="repositories"
								className="font-semibold text-gray-800 text-lg"
							>
								{data?.public_repos}
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
