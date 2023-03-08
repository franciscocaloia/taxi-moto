/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        bebas: ["Bebas Neue", "cursive"],
        monserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "footer-background": "url('/assets/footerBackground2.jpg')",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=corporate]"],
          primary: "#0B5087",
          "primary-focus": "#063154",
          "primary-content": "#fff",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
