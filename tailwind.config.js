module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
      },

      // that is actual animation
      keyframes: (theme) => ({
        fadeIn: {
          "100%": { opacity: 1 },
          "0%": { opacity: 0 },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
  