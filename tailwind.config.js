const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter var"', '"Source Sans Pro"', '"Roboto Mono"', 'Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        htmldark: '#121212',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
