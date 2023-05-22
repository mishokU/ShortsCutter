/** @type {import('tailwindcss').Config} */



module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'paragraph': '#8fadc0',
      'white': '#FFFFFF',
      'black': "#000000",
      'background': '#0E1420',
      'border': '#29303A',
      'placeholder': '#4b5563',
      'secondary': '#ffb81c',
      'hover': '#49494c',
      'transparent': '#00000000',
      'error': '#dc2626'
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')
  ],
}