const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
      },
      fontFamily: {
        sacramento: ['Sacramento', 'cursive'],
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
      },
      margin: {
        6.5: '1.625rem',
      },
      maxWidth: {
        '1/3': '33.3333%',
      },
      minHeight: {
        48: '12rem',
      },
    },
    screens: {
      xxs: '375px',
      xs: '480px',
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
      backgroundColor: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
