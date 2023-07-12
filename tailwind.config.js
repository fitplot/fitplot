const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/pages/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      width: {
        'half-screen': '50vw',
      },
      translate: {
        '9/10': '90%',
      },
      colors: {
        primary: colors.emerald,
        secondary: colors.violet,
        success: colors.emerald,
        destructive: colors.rose,
        info: colors.indigo,
        warn: colors.amber,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
