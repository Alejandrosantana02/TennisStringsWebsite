/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#00A651',
					50: '#E6F5ED',
					100: '#CCEBDC',
					200: '#99D7B9',
					300: '#66C396',
					400: '#33AF73',
					500: '#00A651',
					600: '#008541',
					700: '#006431',
					800: '#004220',
					900: '#002110'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif']
			}
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [
			{
				tennis: {
					primary: '#00A651',
					secondary: '#1F2937',
					accent: '#F59E0B',
					neutral: '#374151',
					'base-100': '#FFFFFF',
					info: '#3B82F6',
					success: '#10B981',
					warning: '#F59E0B',
					error: '#EF4444'
				}
			},
			'light',
			'dark'
		],
		darkTheme: 'dark'
	}
};
