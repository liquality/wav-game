/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#9d4cfa",
      docsGrey: "#1b1b1d",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      dark: 'rgb(var(--dark) / <alpha-value>)',
      activePinkStroke: "#BC2B8B", 
      activePink: "#EF22A9",
      completedStroke: "#BF3948", 
      completed: "#4B1F3E", 
      lockedGray: "#333333",
      lockedGrayStroke: "#828282"
    },
    extend: {
    },
  },
  plugins: [require("flowbite/plugin")],
};
