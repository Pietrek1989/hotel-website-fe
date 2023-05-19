const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    container: {
      padding: "2rem",
    },
    colors: {
      selected: "rgb(24, 218, 69)",
      lightcoral: "#f08080",
      lightgreen: "lightgreen",
      disabled: "#aba5a574",
      currentDay: "#14a5bf",
      currentDayDarker: "#117b8e;",
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      blue: "#14a5bf",
      // bg: "#a7bed3",
      bg: "#EFEBE5",
      bgTra: "#efebe5de",
      logo: "#FFE677",
      mainText: "#8f7a40",
      red: "#e14f34",
      lightBlue: "#4887e1",
      socialGrey: "#333,",
      charcoal: "#122620",
      green: "rgb(9 190 51)",
    },
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      fontSize: {
        14: "14px",
      },
      backgroundColor: {
        "main-bg": "#FAFBFB",
        "main-dark-bg": "#20232A",
        "secondary-dark-bg": "#33373E",
        "light-gray": "#F7F7F7",
        "half-transparent": "rgba(0, 0, 0, 0.5)",
      },
      borderWidth: {
        1: "1px",
      },
      borderColor: {
        color: "rgba(0, 0, 0, 0.1)",
      },
      width: {
        400: "400px",
        760: "760px",
        780: "780px",
        800: "800px",
        1000: "1000px",
        1200: "1200px",
        1400: "1400px",
      },
      height: {
        80: "80px",
      },
      minHeight: {
        590: "590px",
      },
      backgroundImage: {
        "hero-pattern": "url('https://i.ibb.co/MkvLDfb/Rectangle-4389.png')",
      },
    },
  },
  plugins: [],
};
