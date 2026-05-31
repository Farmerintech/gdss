/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#111827",
          800: "#1F2937"
        },
        accent: "#6366F1",
        success: "#10B981",
        canvas: "#F9FAFB"
      },
      boxShadow: {
        soft: "0 18px 60px rgba(17, 24, 39, 0.08)",
        glass: "0 20px 50px rgba(17, 24, 39, 0.12)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};
