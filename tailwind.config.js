const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
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
      blue: colors.blue,
      // bg: "#a7bed3",
      bg: "#EFEBE5",
      bgTra: "#efebe599",
      logo: "#FFE677",
      mainText: "#8f7a40",
      red: "red",
      
    },
  },
  // plugins: [require("daisyui")],
}; /* background: #35393c; */ /* background: gold; background: #a7bed3; */
/* background: #397367;  #87ADC2*/
