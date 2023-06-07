/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1792px',
        '4xl': '2048px',
      },
      colors: {
        folly: '#FF4961',
        lime: '#BCFF49',
        cyan: '#49FFE7',
        veronica: ' #9747ff',
        tangerine: '#ff8c49',
        royal: '#4961ff',
      },
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    },
  },
  plugins: [],
}
