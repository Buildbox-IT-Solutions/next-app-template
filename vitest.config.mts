import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		watch: false,
		environment: 'jsdom',
		include: ['src/**/*.spec.ts'],
		coverage: {
			include: ['src/**/*.ts', 'src/**/container.tsx'],
			exclude: [
				'**/*.spec.*',
				'**/*.d.ts',
				'**/node_modules/**',
				'**/enums/**',
				'**/interfaces/**',
				'**/styles.ts/**',
				'**/types.ts/**',
				'**/i18n/**',
			],
			reporter: ['html', 'json-summary', 'clover'],
		},
	},
})
