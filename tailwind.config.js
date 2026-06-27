import typography from "@tailwindcss/typography"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Playfair Display'", "ui-serif", "Georgia", "serif"],
        mono: ["'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      colors: {
        bg: "#080808",
        text: "#e8e4dc",
        muted: "#737373",
        border: "#1f1f1f",
      },
    },
  },
  plugins: [typography],
}
