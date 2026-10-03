import { test, expect } from "./mermaid-fixture";

test("gallery shows a complete cut, switches expressions, and opens all cuts in its reader", async ({
  page,
}) => {
  await page.goto("/gallery.html#expressions");
  const card = page.locator("#expressions");
  const cuts = card.locator(".gallery-preview > svg");
  await expect(cuts).toHaveCount(5);
  await expect(
    card.locator(".gallery-preview > svg:not([hidden])"),
  ).toHaveCount(1);
  await expect(card.locator('[data-face="neutral"]')).toBeVisible();
  await card.getByRole("button", { name: "다음 컷", exact: true }).click();
  await expect(card.locator('[data-face="happy"]')).toBeVisible();
  await expect(card.locator('[data-face="neutral"]')).toBeHidden();
  await expect(card.locator(".gallery-cut-nav span")).toHaveText("2 / 5");
  const complete = await card
    .locator(".gallery-preview")
    .evaluate((preview) => {
      const cut = preview.querySelector<SVGSVGElement>("svg:not([hidden])")!;
      return preview.clientHeight >= cut.getBoundingClientRect().height - 1;
    });
  expect(complete).toBe(true);
  await card
    .getByRole("button", { name: "크게 보기 · 5컷", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("1 / 5");
  await page.getByRole("button", { name: "닫기", exact: true }).click();
  await expect(
    card.getByRole("button", { name: "크게 보기 · 5컷", exact: true }),
  ).toBeFocused();
});

test("mobile gallery uses the available width for legible dialogue without overflow", async ({
  page,
}) => {
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/gallery.html#gestures");
    await expect(page.locator('#gestures [data-hand="wave"]')).toBeVisible();
    const sizes = await page
      .locator("#gestures .gallery-preview")
      .evaluate((preview) => {
        const cut = preview.querySelector<SVGSVGElement>("svg")!;
        const text = cut.querySelector<SVGTextElement>("[data-dialogue] text")!;
        return {
          available: preview.clientWidth,
          shown: cut.getBoundingClientRect().width,
          textSize:
            Number(text.getAttribute("font-size")) * text.getScreenCTM()!.a,
          pageWidth: document.documentElement.scrollWidth,
        };
      });
    expect(sizes.shown).toBeCloseTo(sizes.available, 0);
    expect(sizes.textSize).toBeGreaterThan(width === 390 ? 11 : 9);
    expect(sizes.pageWidth).toBeLessThanOrEqual(width);
    await expect(page.locator('.gallery-preview[role="alert"]')).toHaveCount(0);
  }
});
