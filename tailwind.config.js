/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary1 : "#1E328B",
        primary2 : "#121E54",
        primary3 : "#D5DBF6",
        secondry1: "#000000",
        secondry2: "#323135",
        secondry3: "#646369",

        red1   : "#CC2131",
        green1 : "#00762D",
        gray1  : "#E5E5E6"
      }
    },
    container: {
      center: true,
      padding: "2rem",
      
      screens: {

        "2xl": "1400px",
      },
      extend: {
        colors : {
          primary : "#1E328B"
        }
      }
    },
  },
  

  mode: 'jit',
}