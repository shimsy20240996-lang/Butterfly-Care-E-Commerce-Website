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
        // Baby Boy Blue
        boy: {
          DEFAULT: "#8EC5E8",
          primary: "#8EC5E8",
          light: "#E5F4FC",
          dark: "#4F7FA0",
        },
        // Baby Girl Pink
        girl: {
          DEFAULT: "#E8A6B8",
          primary: "#E8A6B8",
          light: "#FCE8EE",
          dark: "#B86F84",
        },
        // Clean Theme Neutrals
        butterfly: {
          bg: "#FFFDFB",
          white: "#FFFFFF",
          text: "#454545",
          textMuted: "#7A7A7A",
          border: "#EFEAE6",
          blue: "#8EC5E8",
          blueLight: "#E5F4FC",
          blueDark: "#4F7FA0",
          pink: "#E8A6B8",
          pinkLight: "#FCE8EE",
          pinkDark: "#B86F84",
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 12px -1px rgba(69, 69, 69, 0.05)",
        card: "0 4px 20px -2px rgba(69, 69, 69, 0.06)",
        hover: "0 8px 25px -4px rgba(69, 69, 69, 0.10)",
        boy: "0 6px 20px -2px rgba(142, 197, 232, 0.4)",
        girl: "0 6px 20px -2px rgba(232, 166, 184, 0.4)",
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
