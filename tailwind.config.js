/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        degustar: {
          green: "#285848",
          orange: "#e76a3e",
          beige: "#ffebb5",
        },
      },
    },
  },
  plugins: [],
}