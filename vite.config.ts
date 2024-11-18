import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({ open: true }), // Visualize the bundle after build
  ],
  base: "/Clarity-Canvas/",
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    minify: "terser", // Use terser for minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs
      },
    },
  },
  css: {
    postcss: {
      // Existing PostCSS configuration
    },
    // Include only your source CSS files
    include: ["src/**/*.css"],
  },
  optimizeDeps: {
    exclude: ["@fontsource-variable/lexend-deca"],
  },
});
