import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        foreground: "#2A1A1D",
        vipasi: {
          maroon: "#5E1224",
          maroonDark: "#420C19",
          maroonLight: "#7A1830",
          gold: "#C9A96E",
          goldLight: "#DFC99E",
          goldDeep: "#967A43",
          ivory: "#FAF7F2",
          cream: "#F5EFEB",
          sand: "#EFE8DC",
          border: "#E4DCD0",
          ink: "#2A1A1D",
          inkMuted: "#665457",
          inkLight: "#958386",
        },
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Jost'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
