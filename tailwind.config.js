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
        '128': '26rem'
      },
      borderRadius: {
        'lgg': '2.9rem',
      },
      screens: {
      'laptop': '1024px',
      'desktop': '1920px',
    },
    },

  },
  variants: {
    extend: {},
  },
  plugins: [],
}
