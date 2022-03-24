module.exports = {
  purge: {
    // Some transition animations not working when purging
    enabled: false,
    content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#2B7FA0",
        background: "#F4F4F4",
        secondary: "#E1E4E5",
        border: "#C1CFD6",
        "border-hover": "#b0bfc7",
        "border-focus": "#99acb9",
        steel: "#BDD0D7",
        settingsgray: "#CFD2D3",
      },
      width: {
        128: "26rem",
        100: "20rem",
        160: "160px",
        "100px": "100px",
      },
      height: {
        160: "610px",
      },
      fontSize: {
        "1.5xl": "1.28rem",
      },
      borderRadius: {
        lgg: "1.5rem",
      },
      screens: {
        laptop: { raw: "(min-width: 1280px) and (min-height: 500px)" },
        desktop: { raw: "(min-width: 1600px) and (min-height: 800px)" },
        max: { raw: "(min-width: 1920px) and (min-height: 1080px)" },
      },
    },
  },
  variants: {
    extend: {},
    scrollbar: ["rounded"],
  },
  plugins: [require("tailwind-scrollbar")],
};
