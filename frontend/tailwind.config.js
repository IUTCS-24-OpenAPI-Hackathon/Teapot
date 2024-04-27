/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        bright: "#eee",
        purple: "#7622e2",
        darkish: {
          100: "#7a7a7a",
          200: "#5c5c5c",
          300: "#474747",
          400: "#212121",
          500: "#1f1f1f",
          600: "#141414",
          700: "#111111",
        },
      },
    },
    fontFamily: {
      grotesk: ["Hanken Grotesk", "sans-serif"],
    },
  },
  plugins: [],
};
