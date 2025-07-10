import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), vue()],
    site: "https://your-domain.com", // Replace with your actual domain
    build: {
        assets: "assets",
    },
    server: {
        port: 4321,
        host: true,
        allowedHosts: ['cellular-cant-procedures-enabled.trycloudflare.com']
    },
});