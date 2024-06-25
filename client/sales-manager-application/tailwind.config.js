/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        light: "var(--light)",
        "light-warm": "var(--light-warm)",
      },
    },
  },
  plugins: [],
};
