import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { ReactNode } from 'react'
import QueryProvider from '~/providers/query-provider'
import { getCurrentLocale } from '~/utils/locale'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	const [locale, messages] = await Promise.all([
		getCurrentLocale(),
		getMessages(),
	])

	return (
		<html lang={locale}>
			<body className={`${geistSans.variable} antialiased`}>
				<NextIntlClientProvider messages={messages}>
					<QueryProvider>{children}</QueryProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
