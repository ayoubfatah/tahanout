module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: {
          0: "#fff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        blue: {
          100: "#e0f2fe",
          700: "#0369a1",
        },
        green: {
          100: "#dcfce7",
          700: "#15803d",
        },
        yellow: {
          100: "#fef9c3",
          700: "#a16207",
        },
        silver: {
          100: "#e5e7eb",
          700: "#374151",
        },
        indigo: {
          100: "#e0e7ff",
          700: "#4338ca",
        },
        red: {
          100: "#fee2e2",
          700: "#b91c1c",
          800: "#991b1b",
        },
      },
    },
  },
  plugins: [],
};
