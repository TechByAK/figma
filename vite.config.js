import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Rennes School App",
        short_name: "Rennes",
        description: "Student dashboard and calendar app",
        theme_color: "#00337a",
        background_color: "#00337a",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/images/Frame-desktop.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/images/Frame-desktop.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ]
});