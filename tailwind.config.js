/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        page: '#FAF7F2',
        surface: '#FFFFFF',
        sand: '#F7F3EC',
        caramel: {
          DEFAULT: '#C86428',
          hover: '#B0531C',
          active: '#984414',
          light: '#FBF1EB',
          peach: '#F3E8DC',
        },
        coffee: {
          dark: '#1E1916',
          title: '#241E1A',
          body: '#6B625B',
          muted: '#9E958C',
          border: '#E8E0D5',
          borderLight: '#F0EAE1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(30, 25, 22, 0.04)',
        'warm': '0 8px 30px rgba(30, 25, 22, 0.05)',
        'warm-lg': '0 16px 40px rgba(30, 25, 22, 0.08)',
      },
      screens: {
        'xs': '390px',
      }
    },
  },
  plugins: [],
}
