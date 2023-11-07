/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        'front-page': "url('/front-icecream.jpg')",
      },
      fontFamily: {
        'vibur': ['Vibur', 'cursive'],
        'sacramento': ['Sacramento', 'cursive'],
        'montserrat': ['Montserrat', 'sans-serif']
      }
    },
    textColor: {
      'bubble-pink': '#FDA897',
      'pink-red': '#B90100',
      'white': '#ffffff',
      'raspberry': 'rgba(231, 65, 77, 0.7)',
    },
    backgroundColor: {
      'bubble-pink': '#FDA897',
      'pink-red': 'rgba(185, 1, 0, 0.3)',
      'white': '#ffffff',
      'beige': '#fcfbfb',
      'raspberry': 'rgba(231, 65, 77, 0.7)',
      'raspberry-light': 'rgba(231, 65, 77, 0.5)'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

