import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Button } from '../components/button'

export default function Home() {
	const t = useTranslations('HOME')

	async function handleLogOnServer() {
		'use server'
		// biome-ignore lint/suspicious/noConsole: Exemple code
		console.log('Log on server')
	}

	return (
		<div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
			<main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
				<Image
					className="dark:invert"
					src="/next.svg"
					alt=""
					width={180}
					height={38}
					priority
				/>
				<ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
					<li className="mb-2">
						{t('GET_STARTED')}{' '}
						<code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
							src/app/page.tsx
						</code>
						.
					</li>
					<li>{t('SAVE_CHANGES')}</li>
				</ol>

				<div className="flex flex-col items-center gap-4 sm:flex-row">
					<button
						onClick={handleLogOnServer}
						type="button"
						className="flex h-10 items-center justify-center gap-2 rounded-full border border-transparent border-solid bg-foreground px-4 text-background text-sm transition-colors hover:bg-[#383838] sm:h-12 sm:px-5 sm:text-base dark:hover:bg-[#ccc]"
					>
						<Image
							className="dark:invert"
							src="/vercel.svg"
							alt=""
							width={20}
							height={20}
						/>
						{t('SERVER_LOG')}
					</button>

					<Button />
				</div>
			</main>
			<footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/file.svg"
						alt=""
						width={16}
						height={16}
					/>
					{t('LEARN')}
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/window.svg"
						alt=""
						width={16}
						height={16}
					/>
					{t('EXAMPLES')}
				</a>
				<a
					className="flex items-center gap-2 hover:underline hover:underline-offset-4"
					href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Image
						aria-hidden
						src="/globe.svg"
						alt=""
						width={16}
						height={16}
					/>
					{t('NEXT_DOC_LINK')} →
				</a>
			</footer>
		</div>
	)
}
