import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import federation from "@originjs/vite-plugin-federation";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [
    react(),
    VitePWA({
      selfDestroying: false,
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "Gerenciador de Refeições",
        short_name: "Gerenciador",
        description: "Gerencie suas receitas, cardápios e listas de compras.",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
    federation({
      name: "host-app",
      remotes: [
        {
          recipes: {
            external: "Promise.resolve(window.recipesUrl)",
            from: "vite",
            externalType: "promise",
          },
          meal_plan: {
            external: "Promise.resolve(window.mealPlanUrl)",
            from: "vite",
            externalType: "promise",
          },
          shopping_list: {
            external: "Promise.resolve(window.shoppingListUrl)",
            from: "vite",
            externalType: "promise",
          },
        },
      ],
      shared: ["react"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  preview: {
    host: "localhost",
    port: 3000,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});
