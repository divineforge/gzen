/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'game-dark': '#0a0e27',
        'game-accent': '#00d9ff',
        'game-secondary': '#ff00ff',
      },
    },
  },
  plugins: [],
}
