/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        header: "4rem",
      },
      width: {
        sidebar: "16rem",
      },
      inset: {
        header: "4rem 0 0 0",
        sidebar: "0 0 0 16rem",
        page: "4rem 0 0 16rem",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
        auto: "repeat(auto-fit, minmax(200px, auto))", 
      },
    },
  },
  plugins: [],
}
