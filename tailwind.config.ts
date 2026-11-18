import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#060913",
          card: "rgba(16, 23, 42, 0.65)",
          border: "rgba(0, 240, 255, 0.2)",
          cyan: "#00f0ff",
          magenta: "#ff007f",
          purple: "#9d4edd",
          yellow: "#fcee0a",
          green: "#00ff66",
        },
      },
      boxShadow: {
        "neon-cyan": "0 0 10px #00f0ff, 0 0 25px rgba(0, 240, 255, 0.4)",
        "neon-magenta": "0 0 10px #ff007f, 0 0 25px rgba(255, 0, 127, 0.4)",
        "neon-led": "0 0 15px #00f0ff, 0 0 35px #ff007f, 0 0 50px rgba(0, 240, 255, 0.5)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.5)",
        "glass-glow": "0 0 20px rgba(0, 240, 255, 0.15), inset 0 0 15px rgba(0, 240, 255, 0.05)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "led-glow": "ledGlow 3s ease-in-out infinite alternate",
        "cyber-grid": "gridMove 20s linear infinite",
      },
      keyframes: {
        ledGlow: {
          "0%": {
            boxShadow: "0 0 15px #00f0ff, 0 0 30px rgba(0, 240, 255, 0.4), inset 0 0 15px #00f0ff",
            borderColor: "#00f0ff",
          },
          "100%": {
            boxShadow: "0 0 20px #ff007f, 0 0 40px rgba(255, 0, 127, 0.5), inset 0 0 20px #ff007f",
            borderColor: "#ff007f",
          },
        },
        gridMove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "50px 50px" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
