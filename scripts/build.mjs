import { build } from "vite";
import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";

await build({ configFile: "vite.sdk.config.ts" });
const { version } = JSON.parse(await readFile("package.json", "utf8"));
const license = await readFile("node_modules/yaml/LICENSE", "utf8");
const sdk = await readFile("cdn/comic-gen.js", "utf8");
await writeFile(
  "cdn/comic-gen.js",
  `/*! Comic Gen browser SDK v${version}\nBundled yaml license:\n${license}\n*/\n${sdk}`,
);
await build({ configFile: "vite.config.ts" });
await mkdir("dist/sdk", { recursive: true });
await copyFile("cdn/comic-gen.js", "dist/sdk/comic-gen.js");
