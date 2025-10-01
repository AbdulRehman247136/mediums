/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./mediums/**/*.{js,ts,jsx,tsx,mdx}", // only keep if this folder exists
    "./src/**/*.{css,scss}", // fixed from ".src" → "./src"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
