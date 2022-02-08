module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  
  darkMode: false, // or 'media' or 'class'
  theme: {
    
    extend: {
      colors: {
        primary: "#195C8A"
      },
      borderRadius: {
        'lgg': '4.5rem',
      },
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
