/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily :{
        "open-san" : [ 'Open Sans', "sans-serif"],
        "roboto" : ['Roboto', 'sans-serif'],
      },
    },
    screens : {
      "mobile" : "480px",
      "sm" : "640px",
      "md" : "768px",
      "lg" : "1024px",
      "xl" : "1170px",
      "2xl" : "1480px",
    }
  },
  plugins: [require('flowbite/plugin')],
}

