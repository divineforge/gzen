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
        // Buddhist / saffron accent palette
        saffron: {
          DEFAULT: '#d97706', // amber-600 — warm saffron
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        lotus: {
          pink:  '#f9a8d4', // pink-300
          cream: '#fff8e7',
          gold:  '#fbbf24', // amber-400
        },
        zen: {
          stone: '#8b8680',
          wisdom: '#fffbeb', // warm cream page background
          text:   '#2c2416', // warm dark brown for body text
        },
      },
      fontFamily: {
        // CJK-aware sans stack: Geist first, then system CJK fonts
        sans: [
          'var(--font-geist-sans)',
          'PingFang SC',
          'Noto Sans SC',
          'Microsoft YaHei',
          '微软雅黑',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'var(--font-geist-mono)',
          'monospace',
        ],
        serif: [
          'Georgia',
          'serif',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in',
      },
      keyframes: {
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
