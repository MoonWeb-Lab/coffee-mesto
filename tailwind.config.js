/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#121212',
          card: '#18181b',
          surface: '#27272a',
          accent: '#d97706',
          accentHover: '#b45309',
          cream: '#fafaf9',
          muted: '#71717a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      screens: {
        'xs': '390px',
      }
    },
  },
  plugins: [],
}
