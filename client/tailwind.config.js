/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'textLeft': 'pulses 2s',
        'textRight': 'pulses 3s'
      },
      keyframes: {
        pulses: {
          '0%': { opacity: '0' },
          '75%': {opacity: '0'},
          '100%': { opacity: '1' },
        }
      }
    },
    fontFamily: {
      'space': 'Space',
      'inter': 'Inter',
    }
  },
  plugins: [require("daisyui")],
}