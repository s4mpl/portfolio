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
      typography: {
        DEFAULT: {
          css: {
            code: {
              'border-radius': '0.25rem',
              'padding': '0.125rem 0.1875rem',
              'background-color': 'rgb(125 211 252/.25)',
            }
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
