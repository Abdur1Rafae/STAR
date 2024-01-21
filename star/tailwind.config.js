/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{mjs,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins']
      },
      colors: {
        'brand-blue': '#2C6491',
      },
    },
  },
  plugins: [],
}