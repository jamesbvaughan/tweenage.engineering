/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      red: "#cc241d",
      "light-red": "#fb4934",
      green: "#98971a",
      "light-green": "#b8bb26",
      yellow: "#d79921",
      "light-yellow": "#fabd2d",
      blue: "#458588",
      "light-blue": "#83a598",
      magenta: "#b16286",
      "light-magenta": "#d3869b",
      cyan: "#689d6a",
      "light-cyan": "#8ec07c",
      gray: {
        100: "#fbf1c7",
        200: "#ebdbb2",
        300: "#d5c4a1",
        400: "#bdae93",
        500: "#a89984",
        600: "#928374",
        700: "#665c54",
        800: "#504945",
        900: "#3c3836",
      },
      black: "#282828",
      dark: "#1d2021",
      white: "#ebdbb2",
      transparent: "transparent",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        mono: ["var(--font-berkeley-mono)"],
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss"), require("@tailwindcss/forms")],
};
