module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#2B7FA0",
        background: "#F4F4F4",
        secondary: "#E1E4E5",
        border: "#C1CFD6",
        steel: "#BDD0D7"
      },
      width: {
        '128': '26rem',
        '100': '20rem',
        '160': '160px',
        '100px': '100px'
      },
      height: {
        '160': '610px'
      },
      fontSize: {
        '1.5xl': '1.28rem'
      },
      borderRadius: {
        'lgg': '1.5rem',
      },
      screens: {
      'laptop': '1280px',
      'desktop': '1600px',
      'max': '1920px'
    },
    },

  },
  variants: {
    extend: {},
    scrollbar: ['rounded']
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
