import { build } from "vite";
import { mkdir, copyFile } from "node:fs/promises";

await build({ configFile: "vite.sdk.config.ts" });
await build({ configFile: "vite.config.ts" });
await mkdir("dist/sdk", { recursive: true });
await copyFile("cdn/comic-gen.js", "dist/sdk/comic-gen.js");
