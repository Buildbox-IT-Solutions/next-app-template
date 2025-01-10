/* v8 ignore start */

import { getRequestConfig } from 'next-intl/server'
import { getCurrentLocale } from '~/utils/locale'

export default getRequestConfig(async () => {
	const locale = await getCurrentLocale()

	return {
		locale,
		messages: (await import(`./languages/${locale}.json`)).default,
	}
})

/* v8 ignore stop */
