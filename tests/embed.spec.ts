import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

async function expectFitsViewport(page: Page) {
  await expect
    .poll(() =>
      page.locator(".comic-viewer-viewport").evaluate((viewport) => {
        const image = viewport.querySelector("svg")!.getBoundingClientRect();
        const bounds = viewport.getBoundingClientRect();
        return (
          image.width > 0 &&
          image.height > 0 &&
          image.left >= bounds.left - 1 &&
          image.right <= bounds.right + 1 &&
          image.top >= bounds.top - 1 &&
          image.bottom <= bounds.bottom + 1 &&
          viewport.scrollWidth <= viewport.clientWidth + 1 &&
          viewport.scrollHeight <= viewport.clientHeight + 1
        );
      }),
    )
    .toBe(true);
}

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
    const preventOverflow = page.getByRole("checkbox", {
      name: "화면 넘침 방지",
    });
    await expect(preventOverflow).toBeChecked();
    await expect(page.getByLabel("보기 크기")).toHaveValue("1");
    await expectFitsViewport(page);
    const desktopSize = await artwork.boundingBox();
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
    await expectFitsViewport(page);
    const mobileSize = await artwork.boundingBox();
    expect(mobileSize!.width).toBeLessThanOrEqual(390);
    expect(mobileSize!.height / mobileSize!.width).toBeCloseTo(
      desktopSize!.height / desktopSize!.width,
    );
    expect(await artwork.evaluate((svg) => svg.outerHTML)).toBe(geometry);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(390);
    await preventOverflow.uncheck();
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
    await preventOverflow.check();
    await expect(page.getByLabel("보기 크기")).toHaveValue("2");
    await expectFitsViewport(page);
    expect(await artwork.evaluate((svg) => svg.outerHTML)).toBe(geometry);
    await preventOverflow.uncheck();
    expect((await artwork.boundingBox())!.width).toBe(3200);
  });
}

test("overflow prevention fits a long comic in both axes after resize and keyboard toggling", async ({
  page,
}) => {
  await page.goto("/embed.html");
  await page.evaluate(async () => {
    const sdk = await import("/src/index.ts");
    document.querySelector("pre code")!.textContent =
      "제목: 긴 만화\n등장인물: {가: {그림: 서버}}\n컷:\n" +
      Array.from({ length: 30 }, () => "  - 인물: [가]\n").join("");
    sdk.renderCodeBlocks(document, { 너비: 960 });
  });
  await page.getByRole("button", { name: "긴 만화 · 만화 읽기" }).click();
  await expectFitsViewport(page);
  const artwork = page.locator(".comic-viewer-artwork svg");
  const original = await artwork.evaluate((svg) => svg.outerHTML);
  await page.getByLabel("보기 크기").selectOption("2");
  await expectFitsViewport(page);
  await page.setViewportSize({ width: 844, height: 390 });
  await expectFitsViewport(page);
  await page.setViewportSize({ width: 320, height: 480 });
  await expectFitsViewport(page);
  const checkbox = page.getByRole("checkbox", { name: "화면 넘침 방지" });
  await checkbox.focus();
  await page.keyboard.press("Space");
  await expect(checkbox).not.toBeChecked();
  expect((await artwork.boundingBox())!.width).toBe(1920);
  const viewport = page.locator(".comic-viewer-viewport");
  expect(
    await viewport.evaluate(
      (element) =>
        element.scrollWidth > element.clientWidth &&
        element.scrollHeight > element.clientHeight,
    ),
  ).toBe(true);
  await page.keyboard.press("Space");
  await expectFitsViewport(page);
  await expect(page.getByLabel("보기 크기")).toHaveValue("2");
  expect(await artwork.evaluate((svg) => svg.outerHTML)).toBe(original);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "긴 만화 · 만화 읽기" }),
  ).toBeFocused();
  await page.getByRole("button", { name: "긴 만화 · 만화 읽기" }).click();
  await expect(checkbox).toBeChecked();
  await expect(page.getByLabel("보기 크기")).toHaveValue("1");
  await expectFitsViewport(page);
});

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
