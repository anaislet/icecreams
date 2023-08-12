/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundImage: {
        'front-page': "url('./src/assets/front-icecream.jpg')",
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
    },
    backgroundColor: {
      'bubble-pink': '#FDA897',
      'pink-red': 'rgba(185, 1, 0, 0.3)',
      'white': '#ffffff',
      'beige': '#E8E4E1'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

