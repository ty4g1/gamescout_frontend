const { heroui } = require("@heroui/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        steam: {
          primary: '#0a1e28',
          secondary: '#051117'
        }
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}

