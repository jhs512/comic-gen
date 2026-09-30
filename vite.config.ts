import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "./",
  build: {
    target: "es2022",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: {
        app: resolve("index.html"),
        document: resolve("embed.html"),
        cdn: resolve("cdn.html"),
        "comic-gen": resolve("src/index.ts"),
      },
      output: {
        entryFileNames: (chunk) =>
          chunk.name === "comic-gen"
            ? "comic-gen.js"
            : "assets/[name]-[hash].js",
      },
    },
  },
});
