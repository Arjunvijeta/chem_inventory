/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#123440",
          200: "#0d2730",
        },
        secondary: {
          100: "#cfd7c7",
          200: "#97a295",
          300: "#626a5e",
          400: "#31352e",
          500: "#181a16",
        },
      },
    },
  },
  plugins: [],
};
