import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { 
		adapter: adapter(),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore missing links
				if (message.includes('Not Found')) {
					return;
				}
				throw new Error(message);
			}
		},
		env: {
			dir: process.cwd()
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
