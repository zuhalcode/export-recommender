const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#603813", // Replace with your desired primary color
        secondary: "#F4EBE4", // Replace with your desired secondary color
        neutral: "#F4EBE4", // Replace with your desired accent color
        accent: "#eaba2a", // Replace with your desired accent color
      },
    },
  },
  plugins: [],
};
export default config;
