/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'lightgray': '#CCCCCC', // Light Gray Background
        'darkgray': '#1A237E', // Dark Gray Text
      },
      fontFamily:{
        roboto: ['Roboto', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      backgroundImage:{
        'bg' : "url(/assests/bg.png)"
      }
    },
  },
  plugins: [],
};
