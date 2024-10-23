/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "map-background": "#1A1A1A",
        "map-blue": "#007AFF",
        "map-darkgrey": "#1C1C1F",
        "map-lightgrey": "#858588",
      },
    },
  },
  plugins: [],
};
