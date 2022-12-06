/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        Poppins:'Poppins, sans-serif'
      },
      colors: {
        navSecondary: "#111111",
      },
      transitionProperty: {
        height: "height",
      },
    },
  },
  plugins: [require("daisyui")],
};
