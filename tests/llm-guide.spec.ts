import { test, expect } from "./mermaid-fixture";
import { readFile } from "node:fs/promises";

const guide = await readFile("llm-guide.md", "utf8");
const examples = [...guide.matchAll(/```comic-gen\r?\n([\s\S]*?)```/g)].map(
  (match) => match[1],
);

test("LLM guide examples parse and render in compact and phone formats", async ({
  page,
}) => {
  expect(examples).toHaveLength(5);
  await page.goto("/");
  const outcomes = await page.evaluate(async (sources) => {
    const { readComic } = await import("/src/parse.ts");
    const { renderComicAsync, renderPanelsAsync } =
      await import("/src/index.ts");
    return Promise.all(
      sources.map(async (source) => {
        const comic = readComic(source);
        const compact = await renderComicAsync(source);
        const phone = await renderPanelsAsync(source);
        return {
          panels: comic.panels.length,
          compact: compact.diagnostics,
          phone: phone.diagnostics,
          svg: !!compact.svg,
          phonePanels: phone.panels.length,
        };
      }),
    );
  }, examples);
  expect(outcomes.map((result) => result.panels)).toEqual([1, 1, 1, 4, 1]);
  for (const result of outcomes) {
    expect(result.compact).toEqual([]);
    expect(result.phone).toEqual([]);
    expect(result.svg).toBe(true);
    expect(result.phonePanels).toBe(result.panels);
  }
});

test("production navigation links to the published raw Markdown guide", async ({
  page,
  request,
}) => {
  const response = await request.get("http://127.0.0.1:4173/llm-guide.md");
  expect(response.status()).toBe(200);
  expect(await response.text()).toBe(guide);
  await page.goto("http://127.0.0.1:4173");
  await expect(page.getByRole("link", { name: "LLM 가이드" })).toHaveAttribute(
    "href",
    "./llm-guide.md",
  );
});
