/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FBF7F0',
        charcoal: '#1A1A1A',
        'black-true': '#0A0A0A',
        orange: '#FF6B35',
        'orange-dark': '#E54E20',
        'gray-warm': '#8B8680',
      },
      fontFamily: {
        mono: ['IBM Plex Mono', 'monospace'],
        display: ['Fraunces', 'serif'],
      },
      animation: {
        'stagger-in': 'stagger-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
      },
    },
  },
  plugins: [],
}

