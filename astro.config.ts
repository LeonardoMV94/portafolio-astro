import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), vue(), icon()],
    site: "https://portafolio.pctester.cl", // Replace with your actual domain
    build: {
        assets: "assets",
        
    },
    outDir: "docs",
    server: {
        port: 4321,
        host: true,
        allowedHosts: ['cellular-cant-procedures-enabled.trycloudflare.com']
    },
});