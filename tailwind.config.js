const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Outfit", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "light",
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#14b8a6",
          "primary-focus": "#0d9488",
          "primary-content": "#fff",
          accent: "#fff",
          "accent-focus": "#f9fafb",
          "accent-content": "#134e4a",
          "base-100": "#f3f4f6",
          neutral: "#fff",
        },
      },
    ],
  },
};
