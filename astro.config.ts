import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	site: "https://your-domain.com", // Replace with your actual domain
	build: {
		assets: "assets",
	},
	server: {
		port: 4321,
		host: true,
	},
});
