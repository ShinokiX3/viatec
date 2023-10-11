import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
			'@assets': resolve(__dirname, './src/assets'),
			'@components': resolve(__dirname, './src/components/'),
			'@types': resolve(__dirname, './src/types/'),
			'@pages': resolve(__dirname, './src/pages/'),
			'@store': resolve(__dirname, './src/store/'),
			'@hooks': resolve(__dirname, './src/hooks/'),
			'@utils': resolve(__dirname, './src/utils/'),
		},
	},
});
