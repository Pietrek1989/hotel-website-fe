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
      transparent: "transparent",
      current: "currentColor",
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
    },
  },
  // plugins: [require("daisyui")],
};
