import { test, expect } from "@playwright/test";

test("comic blocks stay collapsed and each card opens its own accessible viewer", async ({
  page,
}) => {
  await page.goto("/embed.html");
  const cards = page.locator(".comic-card");
  await expect(cards).toHaveCount(2);
  await expect(page.locator('figure [role="alert"]')).toContainText(
    "없는 에셋",
  );
  await expect(page.locator("pre:visible")).toHaveCount(0);
  await expect(page.locator(".comic-viewer-artwork svg")).toHaveCount(0);
  await expect(cards.first()).toContainText("문서에 넣은 대화");
  await expect(cards.first().locator(".comic-card-thumbnail svg")).toHaveCount(
    1,
  );

  await cards.first().focus();
  await page.keyboard.press("Enter");
  const viewer = page.getByRole("dialog", { name: "문서에 넣은 대화" });
  await expect(viewer).toBeVisible();
  await expect(viewer.locator("svg")).toContainText("문서 안에서도 대화해요!");
  await expect(viewer.getByRole("button", { name: "닫기" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(viewer).not.toBeVisible();
  await expect(cards.first()).toBeFocused();
  await expect(page.locator(".comic-viewer-artwork svg")).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("");

  await cards.nth(1).click();
  await expect(page.getByRole("dialog")).toHaveAccessibleName("요청을 보내요");
  await expect(page.getByRole("dialog").locator("svg")).toContainText(
    "Hello, server!",
  );
  await page.getByRole("button", { name: "닫기", exact: true }).click();
  await page.getByRole("button", { name: "문서 다시 그리기" }).click();
  await expect(cards).toHaveCount(2);
  await expect(page.locator("figure")).toHaveCount(3);
  await expect(page.locator("dialog")).toHaveCount(1);
  await expect(page.locator("svg [id]")).toHaveCount(0);
});

for (const panelFormat of ["compact", "phone"] as const) {
  test(`${panelFormat} composition preserves coordinates and order on desktop, mobile and zoom`, async ({
    page,
  }) => {
    await page.goto("/embed.html");
    const original = await page.evaluate(async (format) => {
      const sdk = await import("/src/index.ts");
      const block = document.querySelector("pre")!;
      block.querySelector("code")!.textContent =
        "title: 넓은 두 컷\ncast: {a: {asset: server}, b: {asset: database}}\npanels:\n  - actors: [{id: a, x: 0.2}, {id: b, x: 0.8}]\n    dialogue: [{from: a, text: 첫 번째}]\n  - actors: [b]\n    dialogue: [{from: b, text: 두 번째}]";
      return sdk.renderCodeBlocks(document, {
        width: 1600,
        panelFormat: format,
      })[0].svg;
    }, panelFormat);
    await page.getByRole("button", { name: "넓은 두 컷 · 만화 읽기" }).click();
    const artwork = page.locator(".comic-viewer-artwork svg");
    const desktopSize = await artwork.boundingBox();
    expect(desktopSize!.width).toBeGreaterThan(1000);
    const geometry = await artwork.evaluate((svg) => svg.outerHTML);
    expect(await artwork.getAttribute("viewBox")).toBe(
      "0 0 1600 " + (await artwork.getAttribute("height")),
    );
    await expect(artwork.locator("[data-panel]")).toHaveCount(2);
    expect(
      await artwork
        .locator("[data-panel]")
        .evaluateAll((panels) =>
          panels.map((panel) => panel.getAttribute("data-panel")),
        ),
    ).toEqual(["0", "1"]);
    // Browser serialization changes self-closing tags, so compare parsed SVG nodes.
    expect(
      await artwork.evaluate(
        (svg, source) =>
          svg.isEqualNode(
            new DOMParser().parseFromString(source, "image/svg+xml")
              .documentElement,
          ),
        original,
      ),
    ).toBe(true);

    await page.setViewportSize({ width: 390, height: 844 });
    const mobileSize = await artwork.boundingBox();
    expect(mobileSize!.width).toBeLessThanOrEqual(390);
    expect(mobileSize!.height / mobileSize!.width).toBeCloseTo(
      desktopSize!.height / desktopSize!.width,
    );
    expect(await artwork.evaluate((svg) => svg.outerHTML)).toBe(geometry);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    await page.getByLabel("보기 크기").selectOption("1");
    expect((await artwork.boundingBox())!.width).toBe(1600);
    await page.getByLabel("보기 크기").selectOption("2");
    expect((await artwork.boundingBox())!.width).toBe(3200);
    const viewport = page.locator(".comic-viewer-viewport");
    expect(
      await viewport.evaluate(
        (element) => element.scrollWidth > element.clientWidth,
      ),
    ).toBe(true);
    await viewport.evaluate((element) => {
      element.scrollLeft = 500;
      element.scrollTop = 200;
    });
    expect(await viewport.evaluate((element) => element.scrollLeft)).toBe(500);
    expect(await artwork.evaluate((svg) => svg.outerHTML)).toBe(geometry);
    await page.getByLabel("보기 크기").selectOption("fit");
    expect((await artwork.boundingBox())!.width).toBeLessThanOrEqual(390);
  });
}

test("rerender updates an open comic and hides invalid source without duplicating cards", async ({
  page,
}) => {
  await page.goto("/embed.html");
  await page.locator(".comic-card").first().click();
  await page.evaluate(async () => {
    const sdk = await import("/src/index.ts");
    const code = document.querySelector("pre code")!;
    code.textContent = code.textContent!.replace(
      "문서에 넣은 대화",
      "바뀐 제목",
    );
    sdk.renderCodeBlocks();
  });
  await expect(page.getByRole("dialog")).toHaveAccessibleName("바뀐 제목");
  await page.evaluate(async () => {
    const sdk = await import("/src/index.ts");
    document.querySelector("pre code")!.textContent =
      "cast: {missing: {asset: unknown}}\npanels: [{actors: [missing]}]";
    sdk.renderCodeBlocks();
  });
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator("pre:visible")).toHaveCount(0);
  await expect(page.locator(".comic-card")).toHaveCount(1);
});
