import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: "#1a202c",
              fontWeight: "700",
              marginBottom: "1rem",
            },
            h2: {
              color: "#2d3748",
              fontWeight: "600",
              marginBottom: "0.75rem",
            },
            p: {
              marginBottom: "1rem",
              lineHeight: "1.75",
            },
            a: {
              color: "#3182ce",
              textDecoration: "underline",
              "&:hover": {
                color: "#2b6cb0",
              },
            },
            // 他のタグのカスタマイズ
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
