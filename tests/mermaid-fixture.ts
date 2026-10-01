import { test as base, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { dirname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const mermaidDist = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../node_modules/mermaid/dist",
);
const modulePrefix = "/npm/mermaid@11.17.2/dist/";

/** Exercise the real pinned Mermaid distribution without a CI network dependency. */
export const test = base.extend<{ mermaidModules: void }>({
  mermaidModules: [
    async ({ context }, use) => {
      await context.route(
        "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/**",
        async (route) => {
          const url = new URL(route.request().url());
          const relative = decodeURIComponent(
            url.pathname.slice(modulePrefix.length),
          );
          const path = resolve(mermaidDist, relative);
          if (
            !url.pathname.startsWith(modulePrefix) ||
            !path.startsWith(mermaidDist + sep)
          ) {
            await route.abort();
            return;
          }
          try {
            await route.fulfill({
              body: await readFile(path),
              contentType: "text/javascript",
              headers: { "access-control-allow-origin": "*" },
            });
          } catch {
            await route.abort();
          }
        },
      );
      await use();
    },
    { auto: true },
  ],
});

export { expect };
