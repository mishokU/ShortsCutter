const {paragraphColor, bgColor, secondaryColor} = require("./src/ui/Themes");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'paragraph': paragraphColor,
      'white': '#FFFFFF',
      'black': "#000000",
      'background': bgColor,
      'border': '#ffb81c',
      'placeholder': '#4b5563',
      'secondary': secondaryColor,
      'transparent': '#00000000',
      'error': '#dc2626'
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')
  ],
}