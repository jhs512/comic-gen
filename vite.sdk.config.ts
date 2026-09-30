import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    target: "es2022",
    outDir: "cdn",
    lib: {
      entry: resolve("src/index.ts"),
      formats: ["es"],
      fileName: () => "comic-gen.js",
    },
  },
});
