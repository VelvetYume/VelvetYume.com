// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'pink-500': 'var(--pink-500)',
        'pink-600': 'var(--pink-600)',  // DÜZELTİLDİ
        'gray-900': 'var(--gray-900)',
        'black': 'var(--black)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};