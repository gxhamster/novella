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
      screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1920px',
      // => @media (min-width: 1280px) { ... }
    },
    },
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
