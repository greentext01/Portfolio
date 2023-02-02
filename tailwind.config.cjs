/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      'mono': ['JetBrains Mono'] 
    },
    extend: {
      colors: {
        coffee: {
          100: "#FDD0A7",
          200: "#EDBE92",
          300: "#D5A172",
          400: "#CA8C52",
          500: "#EA8E39",
          600: "#442E1C",
          700: "#5E3C1C",
          800: "#2C2117",
          900: "#231508",
        },
      },
    },
  },
  plugins: [],
};
