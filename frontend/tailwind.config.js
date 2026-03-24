export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f7f8",
          100: "#d9e5e8",
          500: "#0f766e",
          700: "#134e4a",
          900: "#042f2e"
        },
        accent: "#f59e0b"
      },
      boxShadow: {
        panel: "0 20px 45px rgba(15, 118, 110, 0.18)"
      }
    }
  },
  plugins: []
};
