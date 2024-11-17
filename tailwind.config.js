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
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
      {
        muted: {
          primary: "#cdc4cf", // softer and less saturated
          "primary-focus": "#b3a6b6",
          "primary-content": "#000000",

          secondary: "#f3d3d7", // muted pink with less vibrancy
          "secondary-focus": "#e6aab1",
          "secondary-content": "#ffffff",

          accent: "#bae3d5", // less bright green-blue
          "accent-focus": "#a1d3c1",
          "accent-content": "#ffffff",

          neutral: "#98b7c5", // softer neutral blue
          "neutral-focus": "#6d9eb4",
          "neutral-content": "#ffffff",

          "base-100": "#f7f7f7", // warm white
          "base-200": "#eceff1", // muted light gray
          "base-300": "#d0d4d9", // softer mid-gray
          "base-content": "#80858a", // lighter gray for contrast

          info: "#85aee5", // muted blue
          success: "#66b2a8", // toned down green
          warning: "#f2b366", // muted orange-yellow
          error: "#f28d71", // softer red

          "--rounded-box": "1rem",
          "--rounded-btn": "1.5rem",
          "--rounded-badge": "1.5rem",

          "--animation-btn": ".25s",
          "--animation-input": ".2s",

          "--btn-text-case": "capitalize",
          "--navbar-padding": ".5rem",
          "--border-btn": "1px",
        },
      },
    ],
  },
};
