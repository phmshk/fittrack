import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";
  return {
    plugins: [
      tanstackRouter({
        target: "react",
        autoCodeSplitting: true,
        routesDirectory: "./src/app/routes",
        generatedRouteTree: "./src/routeTree.gen.ts",
      }),
      react(),
      tailwindcss(),
      visualizer({
        open: false,
        filename: "dist/stats.html",
        gzipSize: true,
        brotliSize: true,
      }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["/pwa/favicon.ico", "/pwa/apple-touch-icon.png"],
        manifest: {
          name: "FitTrack",
          short_name: "FitTrack",
          description: "Your personal fitness tracking app",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/pwa/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/pwa/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "/pwa/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
    server: {
      host: true,
      allowedHosts: ["aria-unbookish-supportingly.ngrok-free.dev"],
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    esbuild: {
      drop: isProduction ? ["console", "debugger"] : [],
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./src/tests/setupTests.ts",
      css: true,
      env: {
        VITE_USE_MOCKS: "true",
      },
    },
  };
});
