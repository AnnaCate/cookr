const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sacramento: ['Sacramento', 'cursive'],
        'source-sans-pro': ['Source Sans Pro', 'sans-serif'],
      },
      maxWidth: {
        '1/3': '33.3333%',
      },
    },
    screens: {
      xxs: '375px',
      xs: '480px',
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: { display: ['group-hover'] },
  },
  plugins: [],
}
