import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/widgets/index.js"),
      name: "LiigaWidgets",
      fileName: "widgets",
      formats: ["es"]
    },
    minify: false
  }
});