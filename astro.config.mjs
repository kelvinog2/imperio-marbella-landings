import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://apartamentosimperio.com",
  integrations: [react(), sitemap()],
  output: "static",
  vite: {
    build: {
      assetsInlineLimit: 2048
    }
  }
});
