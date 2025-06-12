/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      mono: ["'JetBrains Mono'", "monospace"],
    },
    colors: {
      goth: {
        bg: "#0f0f0f",
        text: "#c0c0c0",
        red: "#a11313",
      },
    },
  },
},
  plugins: [],
}
