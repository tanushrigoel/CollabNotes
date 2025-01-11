/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primary: "#1E40AF", // Example: Blue 800
        secondary: "#64748B", // Example: Slate 500
        // Dark mode colors
        "primary-dark": "#0f172a", 
        "secondary-dark": "#1e293b", 
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
