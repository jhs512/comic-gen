import { build } from "vite";
import { mkdir, copyFile, readFile, writeFile } from "node:fs/promises";

await build({ configFile: "vite.sdk.config.ts" });
await build({ configFile: "vite.browser.config.ts" });
const { version } = JSON.parse(await readFile("package.json", "utf8"));
const license = await readFile("node_modules/yaml/LICENSE", "utf8");
for (const name of ["comic-gen.js", "comic-gen.auto.js"]) {
  const sdk = await readFile(`cdn/${name}`, "utf8");
  await writeFile(`cdn/${name}`, `/*! Comic Gen browser SDK v${version}\nBundled yaml license:\n${license}\n*/\n${sdk}`);
}
await build({ configFile: "vite.config.ts" });
await mkdir("dist/sdk", { recursive: true });
await copyFile("cdn/comic-gen.js", "dist/sdk/comic-gen.js");
await copyFile("cdn/comic-gen.auto.js", "dist/sdk/comic-gen.auto.js");
