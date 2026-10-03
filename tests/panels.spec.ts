import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("before resolves to the same four independent panels as full definitions without mutating earlier state", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const sdk = await import("/src/index.ts");
    const prefix =
      "title: test\ncast: {a: {asset: server}, b: {asset: database}}\npanels:\n";
    const first =
      "  - actors: [{id: a, expression: sad, gesture: wave, holding: key, x: 0.25, scale: 0.8}, b]\n    dialogue: [{from: a, to: b, text: first}]\n";
    const before =
      prefix +
      first +
      "  - mode: before\n    actors: [{id: a, expression: happy, gesture: null, holding: null}]\n    dialogue: [{from: b, to: a, text: second}]\n  - mode: before\n    dialogue: []\n    transfer: [{from: b, to: a, prop: data}]\n  - mode: before\n    removeActors: [b]\n    actors: [{id: a, x: null, scale: null, expression: null}]\n";
    const full =
      prefix +
      first +
      "  - actors: [{id: a, expression: happy, x: 0.25, scale: 0.8}, b]\n    dialogue: [{from: b, to: a, text: second}]\n  - actors: [{id: a, expression: happy, x: 0.25, scale: 0.8}, b]\n    transfer: [{from: b, to: a, prop: data}]\n  - actors: [a]\n";
    const inherited = sdk.renderPanels(before);
    const explicit = sdk.renderPanels(full);
    const solo = sdk.renderPanels(prefix + first);
    const compact = sdk.renderPanels(prefix + first, {
      panelFormat: "compact",
    });
    const sizes = await Promise.all(
      inherited.panels.map(async (panel) => {
        const image = await createImageBitmap(await sdk.exportPng(panel));
        return [image.width, image.height];
      }),
    );
    const renderer = sdk.createRenderer();
    renderer.renderPanels(before);
    const edited = renderer.renderPanels(
      before.replace("text: second", "text: revised"),
    );
    const errors = [
      prefix + "  - mode: before\n",
      prefix + first + "  - mode: before\n    actors: []\n",
      prefix + first + "  - mode: before\n    removeActors: [absent]\n",
      prefix + first + "  - mode: before\n    actors: [{id: a}, {id: a}]\n",
    ].map((source) => sdk.renderPanels(source).diagnostics.join("\n"));
    return {
      diagnostics: inherited.diagnostics,
      same: inherited.panels.every(
        (panel, index) => panel.svg === explicit.panels[index].svg,
      ),
      panels: inherited.panels,
      first: solo.panels[0].svg,
      compactHeight: compact.panels[0].height,
      cached: edited.cache,
      errors,
      legacySvg: sdk.renderComic(full).svg,
      sizes,
    };
  });
  expect(result.diagnostics).toEqual([]);
  expect(result.same).toBe(true);
  expect(result.panels).toHaveLength(4);
  expect(result.sizes).toEqual(
    result.panels.map((panel) => [panel.width, panel.height]),
  );
  // The title's total count differs, so compare only the independent illustration after the title.
  expect(result.panels[0].svg.split("<g data-panel=")[1]).toBe(
    result.first.split("<g data-panel=")[1],
  );
  expect(result.panels[0].height).toBe(result.compactHeight * 2);
  expect(result.panels[3].svg).not.toContain("data-dialogue");
  expect(result.panels[3].svg).not.toContain("data-transfer");
  expect(result.panels[3].svg).not.toContain('data-character="b"');
  expect(result.cached?.hits).toBe(3);
  expect(result.errors[0]).toContain("첫 컷");
  expect(result.errors[1]).toContain("1~3명");
  expect(result.errors[2]).toContain("제거할 인물");
  expect(result.errors[3]).toContain("중복");
  expect(result.legacySvg.match(/<svg /g)).toHaveLength(1);
});

test("gallery examples open in the phone playground and one panel downloads independently", async ({
  page,
}) => {
  await page.goto("/gallery.html");
  await expect(page.locator(".gallery-card")).toHaveCount(17);
  await expect(page.locator(".gallery-preview[role=alert]")).toHaveCount(0);
  for (const card of await page.locator(".gallery-card").all())
    await expect(card.locator("svg").first()).toBeVisible();
  await page.locator("#before summary").click();
  await expect(page.locator("#before pre")).toContainText("mode: before");
  await page.locator("#before .primary-link").click();
  await expect(page.getByLabel("시작 예제")).toHaveValue("before");
  await expect(page.locator("#preview svg")).toHaveCount(4);
  const first = page.locator("#preview svg").first();
  const size = await first.evaluate((svg) => ({
    width: Number(svg.getAttribute("width")),
    height: Number(svg.getAttribute("height")),
  }));
  const event = page.waitForEvent("download");
  await page
    .locator(".panel-preview")
    .first()
    .getByRole("button", { name: "이 컷 PNG 받기" })
    .click();
  const download = await event;
  expect(download.suggestedFilename()).toBe("comic-panel-1.png");
  const bytes = await readFile((await download.path())!);
  expect(bytes.readUInt32BE(16)).toBe(size.width);
  expect(bytes.readUInt32BE(20)).toBe(size.height);
  await page
    .getByLabel("만화 코드")
    .fill("cast: {a: {asset: client}}\npanels: [{actors: [a]}]");
  await expect(page.locator("#preview svg")).toHaveCount(1);
  await page.getByRole("button", { name: "예제 복원" }).click();
  await expect(page.locator("#preview svg")).toHaveCount(4);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await page.goto("/guide.html");
  await expect(
    page.getByRole("heading", { name: "2. 문법과 기본값" }),
  ).toBeVisible();
});

