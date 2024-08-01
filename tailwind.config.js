/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  daisyui: {
    themes: ["dark"],
    darkTheme: "dark",
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
