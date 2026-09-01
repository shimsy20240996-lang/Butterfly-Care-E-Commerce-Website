import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Baby Boy Blue Palette
        boy: {
          primary: "#8EC5E8",
          light: "#DFF2FC",
          veryLight: "#F3FAFE",
          accent: "#5BA7D1",
          hover: "#78B6DD",
        },
        // Baby Girl Pink Palette
        girl: {
          primary: "#E8A6B8",
          light: "#F9DDE5",
          veryLight: "#FFF5F7",
          accent: "#D77F99",
          hover: "#DF93A7",
        },
        // Common / Neutral / Brand Colors
        butterfly: {
          cream: "#FFFDF9",
          white: "#FFFFFF",
          bg: "#FFFDF9",
          soft: "#F8F9FA",
          text: "#3F4650",
          textMuted: "#747A82",
          border: "#E9E9E9",
          primary: "#8EC5E8",
          primaryHover: "#78B6DD",
          secondary: "#E8A6B8",
          secondaryHover: "#DF93A7",
          accent: "#5BA7D1",
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(63, 70, 80, 0.05)",
        card: "0 10px 30px -4px rgba(63, 70, 80, 0.08)",
        floating: "0 20px 40px -6px rgba(63, 70, 80, 0.12)",
        boy: "0 8px 25px -4px rgba(142, 197, 232, 0.35)",
        girl: "0 8px 25px -4px rgba(232, 166, 184, 0.35)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
};

export default config;
