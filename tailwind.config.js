module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease-in-out",
      },

      keyframes: (theme) => ({
        fadeIn: {
          "100%": { opacity: 1 },
          "0%": { opacity: 0 },
        },
      }),
    },
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
