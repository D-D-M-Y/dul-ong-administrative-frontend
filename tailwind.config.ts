import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
      },
      colors: {
        'purple': '#6F42C1',
        'textC': '#212121',
        'highlight': '#E6E6FA',
        'lgray': '#808080',
      },
    },
  },
  plugins: [],
};
export default config;
