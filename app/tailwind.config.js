module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif'],
			},
			colors: {
				myBlue: {
					50: '#EBFDFF',
					100: '#CCF0F5',
					200: '#AFE4EB',
					300: '#95D8E0',
					400: '#7CCCD6',
					500: '#54B5C2',
					600: '#359FAD',
					700: '#208B99',
					800: '#127785',
					900: '#096470',
				},
				myYellow: {
					50: '#FFF9EB',
					100: '#F5E8CC',
					200: '#EBD8AF',
					300: '#E0C995',
					400: '#D6BA7C',
					500: '#C29F54',
					600: '#AD8735',
					700: '#997320',
					800: '#856012',
					900: '#705009',
				},
				myGreen: {
					50: '#EBFFF3',
					100: '#CBF3DB',
					200: '#ADE8C4',
					300: '#92DCAF',
					400: '#79D09C',
					500: '#50B97A',
					600: '#32A15E',
					700: '#1D8A48',
					800: '#0F7237',
					900: '#075B29',
				},
				myLight: '#EDEDED',
				myDark: '#121212',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
	],
};
