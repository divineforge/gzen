import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Lotus colors
        lotus: {
          pink: '#FFC0CB',
          cream: '#FFF8E7',
          gold: '#FFD700',
        },
        // Saffron (monk robes)
        saffron: {
          light: '#FFCC99',
          DEFAULT: '#FF9933',
          dark: '#CC6600',
        },
        // Zen colors
        zen: {
          stone: '#8B8680',
          bamboo: '#3D5A41',
          water: '#4A90A4',
        },
        // Wisdom colors
        wisdom: {
          bg: '#FFF9F0',
          text: '#2C2416',
          accent: '#C19A6B',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-geist-sans)',
          'Noto Sans SC',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          'monospace',
        ],
        serif: [
          'Noto Serif SC',
          'Georgia',
          'serif',
        ],
      },
      animation: {
        'lotus-grow': 'grow 2s ease-in-out',
        'fade-in': 'fadeIn 1s ease-in',
      },
      keyframes: {
        grow: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
