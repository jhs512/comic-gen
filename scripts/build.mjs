import { build } from "vite";
import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";

await build({ configFile: "vite.sdk.config.ts" });
const { version } = JSON.parse(await readFile("package.json", "utf8"));
const license = await readFile("node_modules/yaml/LICENSE", "utf8");
const sdk = await readFile("cdn/comic-gen.js", "utf8");
// Preserve the native CDN import when consumers bundle this browser SDK with Webpack.
// Vite/esbuild strips magic comments during minification; add it to the final module.
const browserSdk = sdk.replace(
  /\bimport\(/g,
  "import(/* webpackIgnore: true */ ",
);
await writeFile(
  "cdn/comic-gen.js",
  `/*! Comic Gen browser SDK v${version}\nBundled yaml license:\n${license}\n*/\n${browserSdk}`,
);
await build({ configFile: "vite.config.ts" });
await mkdir("dist/sdk", { recursive: true });
await copyFile("cdn/comic-gen.js", "dist/sdk/comic-gen.js");
await copyFile("llm-guide.md", "dist/llm-guide.md");
