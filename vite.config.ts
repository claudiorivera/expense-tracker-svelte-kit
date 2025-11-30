import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfig from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [sveltekit(), tailwindcss(), tsconfig()],
});
