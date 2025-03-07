'use client'

export function Button() {
	function handleLogOnClient() {
		// biome-ignore lint/suspicious/noConsole: Exemple code
		console.log('Log on client')
	}

	return (
		<button
			onClick={handleLogOnClient}
			type="button"
			className="flex h-10 items-center justify-center rounded-full border border-black/[.08] border-solid px-4 text-sm transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-12 sm:min-w-44 sm:px-5 sm:text-base dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
		>
			Log on client
		</button>
	)
}
