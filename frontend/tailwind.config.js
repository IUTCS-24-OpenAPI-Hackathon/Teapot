/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#121212",
        bright: "#eee",
        purple: "#7622e2",
      },
    },
    fontFamily: {
      grotesk: ["Hanken Grotesk", "sans-serif"],
    },
  },
  plugins: [],
};
