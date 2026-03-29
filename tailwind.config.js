/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./content/**/*.md",
    "./assets/**/*.js",
    "./static/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          DEFAULT: "#e8956d",
          50:  "#fff8f5",
          100: "#fce7d6",
          200: "#f8d4bc",
          300: "#f4bfa0",
          400: "#eeaa84",
          500: "#e8956d",
          600: "#d97355",
          700: "#c4572a",
          800: "#9a3d1a",
          900: "#7c2e0f",
        },
        lotus: {
          pink:  "#f9c8d0",
          cream: "#fff8f5",
          gold:  "#f0c070",
          peach: "#fce7d6",
        },
        zen: {
          stone:  "#b09080",
          wisdom: "#fff8f5",
          text:   "#4a2c1a",
          muted:  "#8c6040",
        },
      },
      fontFamily: {
        sans: [
          "Noto Sans SC",
          "Noto Sans JP",
          "PingFang SC",
          "Microsoft YaHei",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "Noto Serif SC",
          "Noto Serif JP",
          "Georgia",
          "serif",
        ],
        mono: ["ui-monospace", "monospace"],
      },
      fontSize: {
        xs:   ["0.75rem",  { lineHeight: "1.5" }],
        sm:   ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem",     { lineHeight: "1.75" }],
        lg:   ["1.125rem", { lineHeight: "1.75" }],
        xl:   ["1.25rem",  { lineHeight: "1.75" }],
        "2xl": ["1.5rem",  { lineHeight: "1.6" }],
        "3xl": ["1.875rem",{ lineHeight: "1.4" }],
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-in",
        bloom:     "bloom 0.6s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        bloom:  { "0%": { opacity: "0", transform: "scale(0.97)" }, "100%": { opacity: "1", transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};
