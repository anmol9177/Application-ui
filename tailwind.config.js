/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        brand:
          "linear-gradient(90deg, var(--color-primary-start), var(--color-primary-end))",
      },
      colors: {
        base: "#2D6B59",
        primary: "#40977E",
        secondary: "#FFEF75",
        tertiary: "#FFFDF0",
        surface: "#F0FFFB",
        muted: "#8C8340",
        inverse: "#F1F5F9",
        brandPrimary: {
          50: "#F0FFFB",
          100: "#EFF6F4",
          200: "#A7CFC4",
          300: "#7FB49A",
          400: "#66AC98",
          500: "#40977E",
          600: "#288065",
          700: "#2D6B59",
          800: "#235345",
          900: "#1B3F35",
        },
        brandSecondary: {
          50: "#FFFDF0",
          100: "#FEFCE8",
          200: "#FFF8C0",
          300: "#FFF4A3",
          400: "#FFF291",
          500: "#FFEF75",
          600: "#EBD96A",
          700: "#B5AA53",
          800: "#8C8340",
          900: "#6B6431",
        },
        brandNeutral: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1A1A1A",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
