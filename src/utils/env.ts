/* v8 ignore start */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		BASE_URL: z.string().url().optional(),
		DEV: z.boolean(),
	},

	client: {},

	runtimeEnv: {
		BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
		DEV: process.env.NODE_ENV !== 'production',
	},
})
/* v8 ignore stop */
