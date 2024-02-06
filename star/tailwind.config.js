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
        'DarkBlue': '#2C6491',
        'LightBlue': '#F4F9FD',
        'DeleteRed' : "#E0241B",
        'MonitorYellow' : "#FFB224"
      },
    },
  },
  plugins: [],
}