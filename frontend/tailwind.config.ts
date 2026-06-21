import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#090807",
        ink: "#15120e",
        ivory: "#fffaf0",
        pearl: "#f7f0df",
        champagne: "#ead7a2",
        gold: "#c99a2e",
        "gold-soft": "#f2d071",
        "gold-deep": "#7a5513"
      },
      boxShadow: {
        glow: "0 20px 70px rgba(201, 154, 46, 0.26)",
        premium: "0 22px 60px rgba(15, 12, 8, 0.18)"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
