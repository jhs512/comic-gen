import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const { version } = JSON.parse(readFileSync(resolve("package.json"), "utf8"));

export default defineConfig({
  build: {
    target: "es2022",
    outDir: "cdn",
    lib: {
      entry: resolve("src/index.ts"),
      formats: ["es"],
      fileName: () => "comic-gen.js",
    },
    rollupOptions: {
      output: {
        banner: `/*! Comic Gen browser SDK v${version}\nBundled yaml license:\n${readFileSync(resolve("node_modules/yaml/LICENSE"), "utf8")}\n*/`,
      },
    },
  },
});
