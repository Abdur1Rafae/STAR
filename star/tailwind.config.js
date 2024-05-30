// @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{mjs,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Poppins'],
        outfit : ['Outfit' , 'sans-serif']
      },
      colors: {
        'DarkBlue': '#2C6491',
        'LightBlue': '#F4F9FD',
        'DeleteRed' : "#E14942",
        'MonitorYellow' : "#F5B317"
      },
      transitionProperty: {
        'max-height': 'max-height'
      }
    },
  },
  plugins: [
    function({addUtilities}) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: 'none'
        },
        '.no-scrollbar' : {
          '-ms-overflow-style':'none',
          'scrollbar-width': 'none'
        }
      }

      addUtilities(newUtilities)
    }
  ],
}