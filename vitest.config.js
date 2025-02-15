import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		environment: 'jsdom',

		coverage: {
			exclude: [
				...configDefaults.coverage.exclude,
				'src/components/AddTestData.vue',
				'src/setup',
			],
		},
	},
});
