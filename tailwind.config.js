/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        alabaster: '#F4F4F1',
        surface: '#FFFFFF',
        graphite: {
          DEFAULT: '#141414',
          subtle: '#222220',
          muted: '#666663',
          faint: '#8C8C88',
        },
        matcha: {
          DEFAULT: '#2C5E43',
          hover: '#234B35',
          active: '#1A3B2A',
          light: '#EAF1ED',
          badge: '#E3ECE7',
          dark: '#1C3E2C',
        },
        hairline: {
          DEFAULT: '#E4E4E0',
          light: '#EFEFEA',
          dark: '#D2D2CC',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'clean-sm': '0 1px 3px rgba(20, 20, 20, 0.03)',
        'clean': '0 4px 20px rgba(20, 20, 20, 0.04)',
        'clean-lg': '0 12px 32px rgba(20, 20, 20, 0.07)',
      },
      screens: {
        'xs': '390px',
      }
    },
  },
  plugins: [],
}
