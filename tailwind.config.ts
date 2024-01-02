import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e77874",
        secondary: "#8994a6",
        green_btn: "#12b76a",
      },
      boxShadow: {
        card: "0px 2px 10px rgb(0 0 0 / 12%)",
      },
    },
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
} satisfies Config;
