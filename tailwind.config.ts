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
        // Buddhist / saffron accent palette — softened pastel tones
        saffron: {
          DEFAULT: '#e8956d', // soft peach-saffron
          50:  '#fff8f5',
          100: '#fce7d6',
          200: '#f8d4bc',
          300: '#f4bfa0',
          400: '#eeaa84',
          500: '#e8956d',
          600: '#d97355',
          700: '#c4572a',  // warm dark saffron
          800: '#9a3d1a',
          900: '#7c2e0f',
        },
        lotus: {
          pink:  '#f9c8d0', // soft rose-pink
          cream: '#fff8f5', // warm peach cream
          gold:  '#f0c070', // soft golden
          peach: '#fce7d6', // soft peach
        },
        zen: {
          stone:  '#b09080',
          wisdom: '#fff8f5', // warm peach cream page background
          text:   '#4a2c1a', // warm dark brown for body text
          muted:  '#8c6040', // soft muted brown
        },
      },
      fontFamily: {
        // CJK-aware sans stack: Noto Sans SC (loaded via Google Fonts CDN), then Geist, then system CJK fonts
        sans: [
          'Noto Sans SC',
          'var(--font-geist-sans)',
          'PingFang SC',
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
      fontSize: {
        // Fluid responsive typography, all in rem
        'xs':   ['0.75rem',  { lineHeight: '1.5' }],
        'sm':   ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem',     { lineHeight: '1.75' }],
        'lg':   ['1.125rem', { lineHeight: '1.75' }],
        'xl':   ['1.25rem',  { lineHeight: '1.75' }],
        '2xl':  ['1.5rem',   { lineHeight: '1.6' }],
        '3xl':  ['1.875rem', { lineHeight: '1.4' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-in',
        'bloom':   'bloom 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bloom: {
          '0%':   { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
