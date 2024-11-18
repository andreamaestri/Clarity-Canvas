/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    require("tailwindcss-react-aria-components"),
    require("tailwindcss-animate"),
  ],
  daisyui: {
    themes: [
      {
        muted: {
          primary: "#cdc4cf",
          "primary-focus": "#b3a6b6",
          "primary-content": "#000000",

          secondary: "#f3d3d7",
          "secondary-focus": "#e6aab1",
          "secondary-content": "#000000",

          accent: "#bae3d5",
          "accent-focus": "#a1d3c1",
          "accent-content": "#000000",

          neutral: "#98b7c5",
          "neutral-focus": "#6d9eb4",
          "neutral-content": "#000000",

          "base-100": "#f7f7f7",
          "base-200": "#eceff1",
          "base-300": "#d0d4d9",
          "base-content": "#000000",

          info: "#85aee5",
          success: "#66b2a8",
          warning: "#f2b366",
          error: "#f28d71",

          "--rounded-box": "1rem",
          "--rounded-btn": "1.5rem",
          "--rounded-badge": "1.5rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "capitalize",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
        "focus-light": {
          primary: "#92B3BB",
          "base-content": "#364044",
          secondary: "#96C296",
          "secondary-content": "#364044",
          "primary-content": "#F7FCFB",
          accent: "#FFB74D",
          "base-100": "#E8F5F4",
          "base-300": "#364044",
        },
        "focus-dark": {
          primary: "#92B3BB",
          "base-content": "#DDE4E6",
          secondary: "#648A64",
          "secondary-content": "#DDE4E6",
          "primary-content": "#DDE4E6",
          accent: "#FFB74D",
          "base-100": "#141717",
          "base-300": "#1E2424",
        },
        monochrome: {
          primary: "#7D7D7D",
          "base-content": "#E0E0E0",
          secondary: "#4D4D4D",
          "secondary-content": "#E0E0E0",
          "primary-content": "#E0E0E0",
          accent: "#787878",
          "base-100": "#121212",
          "base-300": "#1E1E1E",
        },
        "flex-light": {
          primary: "#77AEBB",
          "base-content": "#2D3E44",
          secondary: "#79C279",
          "secondary-content": "#2D3E44",
          "primary-content": "#F5FCFB",
          accent: "#FFB74D",
          "base-100": "#E8F5F4",
          "base-300": "#2D3E44",
        },
        "flex-dark": {
          primary: "#77AEBB",
          "base-content": "#D8E4E6",
          secondary: "#4C8A4C",
          "secondary-content": "#D8E4E6",
          "primary-content": "#D8E4E6",
          accent: "#FFB74D",
          "base-100": "#121717",
          "base-300": "#1B2424",
        },
        colourful: {
          primary: "#77AEBB",
          "base-content": "#2D3E44",
          secondary: "#79C279",
          "secondary-content": "#2D3E44",
          "primary-content": "#F9FCFD",
          accent: "#FFB74D",
          "base-100": "#E8F4F7",
          "base-300": "#FF6E6E",
        },
      },
    ],
  },
};
