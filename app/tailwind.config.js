module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
			colors: {
				primary: '#1c3144',
				primary_light: '#465a6f',
				primary_dark: '#00081d',
				secondary: '#edb94a',
				secondary_light: '#ffeb7a',
				secondary_dark: '#b78915',
				dark: '#121212',
				light: '#ededed',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
