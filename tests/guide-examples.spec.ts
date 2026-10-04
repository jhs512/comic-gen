import { test, expect } from "./mermaid-fixture";

test("guide renders its displayed authoring code and reads the complete handoff", async ({
  page,
}) => {
  await page.goto("/guide.html#actions");
  await expect(page.locator("[data-guide-open]:enabled")).toHaveCount(6);
  const examples = await page
    .locator("[data-guide-example]")
    .evaluateAll(async (containers) => {
      const { readComic } = await import("/src/parse.ts");
      return containers.map((container) => {
        const source = container.querySelector("code")!.textContent!;
        const comic = readComic(source);
        const rendered = [
          ...container.querySelectorAll(".gallery-preview > svg"),
        ];
        return {
          id: (container as HTMLElement).dataset.guideExample,
          expected: comic.panels.map((panel) =>
            panel.dialogue.map((line) => line.text.replace(/\n/g, "")),
          ),
          drawn: rendered.map((cut) =>
            [...cut.querySelectorAll("[data-dialogue] text")].map(
              (text) => text.textContent,
            ),
          ),
          visible: rendered.filter((cut) => !cut.hasAttribute("hidden")).length,
        };
      });
    });
  for (const example of examples) {
    expect(example.drawn, example.id).toEqual(example.expected);
    expect(example.visible, example.id).toBe(1);
  }
  const handoff = page.locator('[data-guide-example="handoff"]');
  await expect(
    handoff.locator(
      'svg:not([hidden]) [data-character="sora"] [data-holding="key"]',
    ),
  ).toBeVisible();
  await handoff.getByRole("button", { name: "다음 컷", exact: true }).click();
  await expect(
    handoff.locator('svg:not([hidden]) [data-transfer="sora"][data-to="jun"]'),
  ).toBeVisible();
  await expect(
    handoff.locator('svg:not([hidden]) [data-holding="key"]'),
  ).toHaveCount(0);
  await handoff.getByRole("button", { name: "다음 컷", exact: true }).click();
  await expect(
    handoff.locator(
      'svg:not([hidden]) [data-character="jun"] [data-holding="key"]',
    ),
  ).toBeVisible();
  const trigger = handoff.getByRole("button", {
    name: "크게 보기 · 3컷",
    exact: true,
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toContainText("1 / 3");
  await page.getByRole("button", { name: "닫기", exact: true }).click();
  await expect(trigger).toBeFocused();
  await expect(
    handoff.getByRole("link", { name: "플레이그라운드에서 수정 →" }),
  ).toHaveAttribute("href", "./?example=handoff#workspace");
});

test("mobile guide keeps all six complete previews readable and the page within the viewport", async ({
  page,
}) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/guide.html");
    await expect(page.locator("[data-guide-open]:enabled")).toHaveCount(6);
    const sizes = await page
      .locator(".guide-example .gallery-preview")
      .evaluateAll((previews) =>
        previews.map((preview) => {
          const cut =
            preview.querySelector<SVGSVGElement>("svg:not([hidden])")!;
          const text = cut.querySelector<SVGTextElement>(
            "[data-dialogue] text",
          )!;
          return {
            available: preview.clientWidth,
            width: cut.getBoundingClientRect().width,
            complete:
              preview.clientHeight >= cut.getBoundingClientRect().height - 1,
            textSize:
              Number(text.getAttribute("font-size")) * text.getScreenCTM()!.a,
          };
        }),
      );
    for (const size of sizes) {
      expect(size.width).toBeCloseTo(size.available, 0);
      expect(size.complete).toBe(true);
      expect(size.textSize).toBeGreaterThan(width === 390 ? 11 : 9);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await expect(page.locator('.guide-example [role="alert"]')).toHaveCount(0);
  }
});

test("new narrative examples show direction, changing feelings, and completed ownership", async ({
  page,
}) => {
  await page.goto("/gallery.html#welcome");
  const welcome = page.locator("#welcome");
  await expect(welcome.locator(".gallery-preview > svg")).toHaveCount(2);
  await welcome.getByRole("button", { name: "다음 컷", exact: true }).click();
  await expect(
    welcome.locator(
      'svg:not([hidden]) [data-character="sora"] [data-hand="point"][data-side="right"]',
    ),
  ).toBeVisible();
  await expect(
    welcome.locator(
      'svg:not([hidden]) [data-character="jun"] [data-hand="point"][data-side="left"]',
    ),
  ).toBeVisible();
  const question = page.locator("#question-answer");
  await expect(
    question.locator(
      'svg:not([hidden]) [data-character="sora"] [data-face="confused"]',
    ),
  ).toBeVisible();
  await question.getByRole("button", { name: "다음 컷", exact: true }).click();
  await question.getByRole("button", { name: "다음 컷", exact: true }).click();
  await expect(
    question.locator(
      'svg:not([hidden]) [data-character="sora"] [data-face="happy"]',
    ),
  ).toBeVisible();
  const listening = page.locator("#listening");
  await expect(
    listening.locator(
      'svg:not([hidden]) [data-character="sora"] [data-face="angry"]',
    ),
  ).toBeVisible();
  await expect(
    listening.locator(
      'svg:not([hidden]) [data-character="jun"] [data-face="neutral"]',
    ),
  ).toBeVisible();
  await expect(listening.locator("[data-hand]")).toHaveCount(0);
  const sourceCheck = await page.evaluate(async () => {
    const { examples } = await import("/src/examples.ts");
    const { renderPanelsAsync } = await import("/src/comic.ts");
    const ids = [
      "welcome",
      "question-answer",
      "handoff",
      "listening",
      "reading-order",
    ];
    return Promise.all(
      examples
        .filter((example) => ids.includes(example.id))
        .map(async (example) => {
          const result = await renderPanelsAsync(example.source, {
            width: 480,
            panelFormat: "phone",
          });
          return {
            id: example.id,
            errors: result.diagnostics,
            cuts: result.panels.length,
          };
        }),
    );
  });
  expect(sourceCheck).toHaveLength(5);
  for (const result of sourceCheck) {
    expect(result.errors, result.id).toEqual([]);
    expect(result.cuts).toBeGreaterThan(1);
  }
});
