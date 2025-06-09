/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        wave: 'waveAnim 10s ease-in-out infinite',
      },
      keyframes: {
        waveAnim: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-50px)' },
        },
      },
    },
  },
  plugins: [],
}
