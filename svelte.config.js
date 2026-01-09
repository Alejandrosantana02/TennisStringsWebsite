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
			},
			platformProxy: {
				configPath: 'wrangler.toml',
				environment: 'production',
				experimentalJsonConfig: false
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
					manualChunks: undefined,
					assetFileNames: 'assets/[name].[ext]'
				}
			}
		}
	}
};

export default config;
