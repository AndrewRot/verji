/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        skia: ['Skia', 'Georgia', 'serif'],
        'skia-title': ['Skia Extended Black', 'Skia', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#FAF7F2',
        ivory: '#F5F0E8',
        wine: {
          50: '#FDF2F4',
          100: '#F9E2E6',
          200: '#F3C5CD',
          300: '#EDA3B0',
          400: '#E07A8E',
          500: '#C9506A',
          600: '#A63D55',
          700: '#832F43',
          800: '#6B2838',
          900: '#4A1C27',
        },
        gold: {
          300: '#D4AF37',
          400: '#C5A028',
          500: '#B8960F',
        },
      },
    },
  },
  plugins: [],
};
