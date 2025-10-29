/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Category colors
        important: "#10b981", // green
        promotions: "#fbbf24", // yellow
        social: "#3b82f6", // blue
        marketing: "#f97316", // orange
        spam: "#ef4444", // red
        general: "#6b7280", // gray
      },
    },
  },
  plugins: [],
};
