/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class", // or false or "class"
  theme: {
    extend: {
      "transitionDuration": {
        "400": "400ms",
      },
      "fontFamily": {
        "sora": ["Sora", "sans-serif"],
        // "space": ["Space Grotesk", "sans-serif"],
        "krona": ["Krona One", "sans-serif"],
      },
      scale: {
        115: '1.15',
      },
    },
  },
  plugins: [
    require("tailwindcss-writing-mode")({
      variants: ["responsive", "hover"]
  }),
  ],
}