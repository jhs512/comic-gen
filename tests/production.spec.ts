import { test, expect } from "@playwright/test";

test("built browser SDK exports a working renderer with bounded and invalidatable cache", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4173");
  const outcome = await page.evaluate(async () => {
    // Exercise the distributed API, not the development module's internals.
    const sdk = await import("/sdk/comic-gen.js");
    const source =
      "cast: {a: {asset: server}}\npanels: [{actors: [a], dialogue: [{from: a, text: hello}]}]";
    const renderer = sdk.createRenderer(100000);
    const first = renderer.render(source);
    const second = renderer.render(source);
    const revised = renderer.render(source, { fontVersion: "new-font" });
    renderer.clearCache();
    const cleared = renderer.render(source);
    return {
      exports: Object.keys(sdk),
      first: first.cache,
      second: second.cache,
      revised: revised.cache,
      cleared: cleared.cache,
      svg: first.svg,
    };
  });
  expect(outcome.exports).toEqual(
    expect.arrayContaining([
      "renderComic",
      "createRenderer",
      "renderCodeBlocks",
      "exportPng",
    ]),
  );
  expect(outcome.svg).toContain("hello");
  expect(outcome.first.misses).toBe(1);
  expect(outcome.second.hits).toBe(1);
  expect(outcome.revised.misses).toBe(1);
  expect(outcome.cleared.misses).toBe(1);
  expect(outcome.cleared.bytes).toBeLessThanOrEqual(100000);
});
