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
        butterfly: {
          bg: "#F8F3EF",
          soft: "#F1E2DC",
          secondary: "#E8D5CE",
          accent: "#DDB9AE",
          primary: "#B98276",
          primaryHover: "#A76F64",
          text: "#5A4945",
          textMuted: "#8A7771",
          border: "#EADBD5",
          card: "#FFFFFF",
          cream: "#FAF6F3",
          roseLight: "#FBF3F0"
        }
      },
      fontFamily: {
        serif: ["Playfair Display", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(90, 73, 69, 0.05)",
        card: "0 10px 30px -4px rgba(90, 73, 69, 0.08)",
        floating: "0 20px 40px -6px rgba(90, 73, 69, 0.12)",
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};

export default config;
