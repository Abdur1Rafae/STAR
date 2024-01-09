/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{mjs,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins']
      }
    },
  },
  plugins: [],
}