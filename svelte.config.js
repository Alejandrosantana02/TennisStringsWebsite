import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			routes: {
				include: ['/*'],
				exclude: ['<build>', '<files>']
			}
		}),

		// Prerender pages for better performance
		prerender: {
			entries: ['*']
		}
	},

	// Ensure CSS is processed correctly
	vite: {
		css: {
			devSourcemap: true
		},
		build: {
			cssCodeSplit: false, // Bundle all CSS together for better loading
			rollupOptions: {
				output: {
					manualChunks: undefined
				}
			}
		}
	}
};

export default config;
