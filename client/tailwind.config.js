/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      letterSpacing: {
        widest: ".2em",
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        ".scrollbar": {
          overflowY: "auto",
          scrollbarColor: `${theme("colors.gray.600")} ${theme(
            "colors.gray.200"
          )}`,
          scrollbarWidth: "thin",
        },
        ".scrollbar::-webkit-scrollbar": {
          height: "2px",
          width: "5px",
        },
        ".scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: theme("colors.gray.300"),
          borderRadius: "6px",
        },
        ".scrollbar::-webkit-scrollbar-track-piece": {
          backgroundColor: theme("colors.gray.100"),
        },
      });
    }),
  ],
};
