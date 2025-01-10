/* v8 ignore start */

import { type Locale, enUS, ptBR } from 'date-fns/locale'
import { cookies, headers } from 'next/headers'
import { LOCALES } from '~/utils/constants'

type Language = (typeof LOCALES)[number]

export async function getCurrentLocale(): Promise<string> {
	const [headersList, cookiesList] = await Promise.all([headers(), cookies()])

	const acceptedLanguage = headersList.get('accept-language') || ''
	const cookieLanguage = cookiesList.get('preferredLanguage')?.value

	if (cookieLanguage && LOCALES.includes(cookieLanguage as Language)) {
		return cookieLanguage
	}

	const preferredLanguages = acceptedLanguage
		.split(',')
		.map((lang) => lang.split(';')[0]) as Language[]

	let locale = LOCALES[0] as string

	for (const lang of preferredLanguages) {
		if (LOCALES.includes(lang)) {
			locale = lang
			break
		}
	}

	return locale
}

export async function getDateFnsLocale(): Promise<Locale> {
	const locale = await getCurrentLocale()

	switch (locale) {
		case 'pt-BR':
			return ptBR
		case 'en':
			return enUS
		default:
			return ptBR
	}
}

/* v8 ignore stop */
