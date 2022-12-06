/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
