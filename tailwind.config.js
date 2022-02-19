module.exports = {
  content: ['./src/pages/**/*.{js,jsx}', './src/components/**/*.{js,jsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      width: {
        'half-screen': '50vw',
      },
      translate: {
        '9/10': '90%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
