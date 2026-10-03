import type { Locator, Page } from "@playwright/test";
import { test, expect } from "./mermaid-fixture";

const origin = "http://127.0.0.1:4173";
const renderModule = "/sdk/comic-gen.render.js";
const viewerModule = "/sdk/comic-gen.viewer.js";

function source(count: number, title = `${count}컷 읽기`) {
  return JSON.stringify({
    제목: title,
    등장인물: { 가: { 그림: "서버", 이름표: "설명자" } },
    컷: Array.from({ length: count }, (_, index) => ({
      인물: ["가"],
      대사: Array.from({ length: index === count - 1 ? 5 : 1 }, (_, line) => ({
        화자: "가",
        내용: `${index + 1}번째 컷, ${line + 1}번째 대사입니다.`,
      })),
    })),
  });
}

async function documentForViewer(page: Page) {
  await page.route("**/shared-viewer-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="ko"><head><meta charset="utf-8"></head><body style="margin:0;overflow:clip"><button id="outside">바깥 버튼</button><main></main></body></html>',
    }),
  );
  await page.goto(`${origin}/shared-viewer-test.html`);
}

async function mount(
  page: Page,
  code: string,
  width = 960,
  panelFormat: "compact" | "phone" = "compact",
  asyncRender = false,
) {
  return page.evaluate(
    async ({
      code,
      width,
      panelFormat,
      asyncRender,
      renderModule,
      viewerModule,
    }) => {
      const renderer = await import(renderModule);
      const viewer = await import(viewerModule);
      const result = asyncRender
        ? await renderer.renderPanelsAsync(code, { width, panelFormat })
        : renderer.renderPanels(code, { width, panelFormat });
      if (result.diagnostics.length)
        throw new Error(result.diagnostics.join("\n"));
      window.comicTest?.cleanup();
      const container = document.createElement("section");
      document.querySelector("main").replaceChildren(container);
      const cleanup = viewer.mountComicCard(container, result);
      // Browser SVG geometry is an independent oracle for pointer hit locations.
      const measurement = document.createElement("div");
      measurement.style.cssText =
        "position:absolute;left:-100000px;top:0;visibility:hidden";
      measurement.innerHTML = result.svg;
      document.body.append(measurement);
      const root = measurement.querySelector("svg");
      const rootBox = root.getBoundingClientRect();
      const frames = [...root.querySelectorAll("g[data-panel]")].map(
        (panel) => {
          const box = panel.querySelector("rect").getBoundingClientRect();
          return {
            x: box.x - rootBox.x,
            y: box.y - rootBox.y,
            width: box.width,
            height: box.height,
          };
        },
      );
      measurement.remove();
      window.comicTest = { result, frames, cleanup, container };
      return {
        width: result.width,
        height: result.height,
        panels: result.panels.length,
      };
    },
    { code, width, panelFormat, asyncRender, renderModule, viewerModule },
  );
}

const dialog = (page: Page) => page.getByRole("dialog");
const region = (page: Page) =>
  dialog(page).getByRole("region", { name: "만화 읽기 영역" });
const artwork = (page: Page) => page.locator(".comic-viewer-artwork img");
const position = (page: Page) => page.locator(".comic-position");

async function expectDecoded(image: Locator) {
  await expect
    .poll(() =>
      image.evaluate(
        (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
      ),
    )
    .toBe(true);
}

async function expectOneCutFits(page: Page) {
  await expectDecoded(artwork(page));
  await expect
    .poll(() =>
      region(page).evaluate((viewport) => {
        const image = viewport.querySelector("img").getBoundingClientRect();
        const style = getComputedStyle(viewport);
        const available = {
          width:
            viewport.clientWidth -
            parseFloat(style.paddingLeft) -
            parseFloat(style.paddingRight),
          height:
            viewport.clientHeight -
            parseFloat(style.paddingTop) -
            parseFloat(style.paddingBottom),
        };
        const result = window.comicTest.result;
        return (
          image.width > 0 &&
          image.width <= available.width + 1 &&
          viewport.scrollWidth <= viewport.clientWidth + 1 &&
          result.panels.every(
            (panel) =>
              (panel.height / panel.width) * image.width <=
              available.height + 1,
          )
        );
      }),
    )
    .toBe(true);
}

async function clickPanelHalf(
  page: Page,
  index: number,
  side: "left" | "right",
) {
  const point = await artwork(page).evaluate(
    (image, { index, side }) => {
      const panel = window.comicTest.frames[index];
      const imageBox = image.getBoundingClientRect();
      const viewport = image
        .closest(".comic-viewer-viewport")
        .getBoundingClientRect();
      const scale = imageBox.width / window.comicTest.result.width;
      const top = Math.max(imageBox.y + panel.y * scale, viewport.y + 4);
      const bottom = Math.min(
        imageBox.y + (panel.y + panel.height) * scale,
        viewport.bottom - 4,
      );
      if (bottom <= top) throw new Error("Expected target cut to be visible");
      return {
        x:
          imageBox.x +
          (panel.x + panel.width * (side === "left" ? 0.25 : 0.75)) * scale,
        y: (top + bottom) / 2,
      };
    },
    { index, side },
  );
  await page.mouse.click(point.x, point.y);
}

async function originalPosition(page: Page) {
  return region(page).evaluate((viewport) => {
    const image = viewport.querySelector("img").getBoundingClientRect();
    const bounds = viewport.getBoundingClientRect();
    const style = getComputedStyle(viewport);
    const scale = image.width / window.comicTest.result.width;
    return {
      scale,
      x:
        (bounds.x +
          viewport.clientLeft +
          parseFloat(style.paddingLeft) -
          image.x) /
        scale,
      y:
        (bounds.y +
          viewport.clientTop +
          parseFloat(style.paddingTop) -
          image.y) /
        scale,
    };
  });
}

async function expectSamePosition(
  page: Page,
  previous: { x: number; y: number },
  axis: "x" | "y",
) {
  // Browser scroll offsets round to CSS pixels, especially after mobile scaling.
  await expect
    .poll(async () => {
      const current = await originalPosition(page);
      return Math.abs(current[axis] - previous[axis]) * current.scale;
    })
    .toBeLessThanOrEqual(2);
}

test("distributed renderer and optional viewer import independently without installing UI or loading Mermaid", async ({
  page,
}) => {
  await documentForViewer(page);
  const requests: string[] = [];
  page.on("request", (request) => requests.push(request.url()));
  const result = await page.evaluate(
    async ({ renderModule, viewerModule, code }) => {
      const before = {
        body: document.body.innerHTML,
        head: document.head.innerHTML,
      };
      const renderer = await import(renderModule);
      const rendered = renderer.renderPanels(code);
      const afterRenderer = {
        body: document.body.innerHTML,
        head: document.head.innerHTML,
      };
      const viewer = await import(viewerModule);
      const unusedViewer = viewer.createComicViewer();
      const afterViewer = {
        body: document.body.innerHTML,
        head: document.head.innerHTML,
      };
      unusedViewer.destroy();
      return {
        before,
        afterRenderer,
        afterViewer,
        rendererExports: Object.keys(renderer),
        viewerExports: Object.keys(viewer),
        diagnostics: rendered.diagnostics,
        panels: rendered.panels.length,
      };
    },
    { renderModule, viewerModule, code: source(2) },
  );
  expect(result.afterRenderer).toEqual(result.before);
  expect(result.afterViewer).toEqual(result.before);
  expect(result.diagnostics).toEqual([]);
  expect(result.panels).toBe(2);
  for (const name of [
    "renderComic",
    "renderPanels",
    "renderComicAsync",
    "renderPanelsAsync",
    "createRenderer",
    "exportPng",
    "만화그리기",
    "컷그리기비동기",
  ])
    expect(result.rendererExports).toContain(name);
  expect(result.rendererExports).not.toContain("mountComicCard");
  expect(result.rendererExports).not.toContain("renderCodeBlocks");
  for (const name of [
    "createComicViewer",
    "mountComicCard",
    "만화뷰어만들기",
    "만화카드붙이기",
  ])
    expect(result.viewerExports).toContain(name);
  expect(result.viewerExports).not.toContain("renderPanels");
  expect(result.viewerExports).not.toContain("renderPanelsAsync");
  expect(requests.filter((url) => !url.startsWith(origin))).toEqual([]);
  expect(requests.filter((url) => /mermaid|yaml|embed/.test(url))).toEqual([]);
});

for (const viewportWidth of [1440, 390]) {
  test(`one-cut fit at ${viewportWidth}px uses actual 1, 2, 7 and 30 cuts and preserves the whole composition`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: viewportWidth, height: 844 });
    await documentForViewer(page);
    for (const [count, width, format] of [
      [1, 480, "phone"],
      [2, 960, "compact"],
      [7, 1600, "compact"],
      [30, 720, "phone"],
    ] as const) {
      await mount(page, source(count), width, format);
      const card = page.getByRole("button", {
        name: `${count}컷 읽기 · 만화 읽기`,
        exact: true,
      });
      await expect(card).toContainText(`${count}컷`);
      await card.click();
      await expect(position(page)).toHaveText(`1 / ${count}컷`);
      await expectOneCutFits(page);
      const preserved = await artwork(page).evaluate(
        async (image: HTMLImageElement) => {
          const svg = await (await fetch(image.src)).text();
          return {
            exact: svg === window.comicTest.result.svg,
            width: image.naturalWidth,
            height: image.naturalHeight,
            indices: [
              ...new DOMParser()
                .parseFromString(svg, "image/svg+xml")
                .querySelectorAll("g[data-panel]"),
            ].map((panel) => Number(panel.getAttribute("data-panel"))),
          };
        },
      );
      expect(preserved.exact).toBe(true);
      expect(preserved.width).toBe(width);
      expect(preserved.indices).toEqual(
        Array.from({ length: count }, (_, index) => index),
      );
      await expect(
        dialog(page).getByRole("button", { name: "이전 컷", exact: true }),
      ).toBeDisabled();
      if (count === 1)
        await expect(
          dialog(page).getByRole("button", { name: "다음 컷", exact: true }),
        ).toBeDisabled();
      if (count >= 7) {
        expect(
          await region(page).evaluate(
            (element) => element.scrollHeight > element.clientHeight,
          ),
        ).toBe(true);
        await region(page).evaluate((element) =>
          element.scrollTo(0, element.scrollHeight),
        );
        await expect
          .poll(() =>
            region(page).evaluate((element) => ({
              position: element
                .closest("dialog")
                .querySelector(".comic-position").textContent,
              atEnd:
                element.scrollTop + element.clientHeight >=
                element.scrollHeight - 1,
              scrollTop: element.scrollTop,
              clientHeight: element.clientHeight,
              scrollHeight: element.scrollHeight,
            })),
          )
          .toMatchObject({ position: `${count} / ${count}컷`, atEnd: true });
      }
      await page.keyboard.press("Escape");
      await expect(card).toBeFocused();
    }
  });
}

test("buttons, cut halves, scrolling and reading-region arrow keys navigate the actual cuts without stealing control keys or drags", async ({
  page,
}) => {
  await documentForViewer(page);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await mount(page, source(7), 960);
    await page.locator(".comic-card").click();
    await expectOneCutFits(page);
    const next = dialog(page).getByRole("button", {
      name: "다음 컷",
      exact: true,
    });
    const previous = dialog(page).getByRole("button", {
      name: "이전 컷",
      exact: true,
    });
    await next.click();
    await expect(position(page)).toHaveText("2 / 7컷");
    await clickPanelHalf(page, 1, "right");
    await expect(position(page)).toHaveText("3 / 7컷");
    await clickPanelHalf(page, 2, "left");
    await expect(position(page)).toHaveText("2 / 7컷");
    await previous.click();
    await expect(position(page)).toHaveText("1 / 7컷");
    await region(page).focus();
    await page.keyboard.press("ArrowRight");
    await expect(position(page)).toHaveText("2 / 7컷");
    await page.keyboard.press("ArrowLeft");
    await expect(position(page)).toHaveText("1 / 7컷");
    await page.keyboard.press("Shift+ArrowRight");
    await expect(position(page)).toHaveText("1 / 7컷");
    await dialog(page).getByLabel("보기 크기").focus();
    await page.keyboard.press("ArrowDown");
    await expect(position(page)).toHaveText("1 / 7컷");
    const point = await artwork(page).boundingBox();
    await page.mouse.move(point.x + point.width * 0.7, point.y + 120);
    await page.mouse.down();
    await page.mouse.move(point.x + point.width * 0.7, point.y + 170, {
      steps: 5,
    });
    await page.mouse.up();
    await expect(position(page)).toHaveText("1 / 7컷");
    await region(page).evaluate((element) =>
      element.scrollTo(0, element.scrollHeight),
    );
    await expect(position(page)).toHaveText("7 / 7컷");
    await expect(next).toBeDisabled();
    await expect(previous).toBeEnabled();
    await page.keyboard.press("Escape");
  }
});

test("zoom can scroll both axes, and zoom, fit and viewport resize preserve the reader's position", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 844 });
  await documentForViewer(page);
  await mount(page, source(7), 1600);
  await page.locator(".comic-card").click();
  await expectOneCutFits(page);
  for (let index = 0; index < 3; index++)
    await dialog(page)
      .getByRole("button", { name: "다음 컷", exact: true })
      .click();
  await expect(position(page)).toHaveText("4 / 7컷");
  const fit = dialog(page).getByRole("checkbox", { name: "화면 넘침 방지" });
  const zoom = dialog(page).getByLabel("보기 크기");
  const original = await originalPosition(page);
  await fit.uncheck();
  await zoom.selectOption("2");
  await expect
    .poll(async () => (await artwork(page).boundingBox()).width)
    .toBe(3200);
  const overflow = await region(page).evaluate((element) => ({
    horizontal: element.scrollWidth > element.clientWidth,
    vertical: element.scrollHeight > element.clientHeight,
  }));
  expect(overflow).toEqual({ horizontal: true, vertical: true });
  await expectSamePosition(page, original, "y");
  await region(page).evaluate((element) => {
    element.scrollLeft = 400;
    element.scrollTop += 200;
  });
  const scrolled = await originalPosition(page);
  await zoom.selectOption("1.5");
  await expect
    .poll(async () => (await artwork(page).boundingBox()).width)
    .toBe(2400);
  await expectSamePosition(page, scrolled, "x");
  await expectSamePosition(page, scrolled, "y");
  await fit.check();
  await expect(zoom).toHaveValue("1.5");
  await expectOneCutFits(page);
  const fittedPosition = await originalPosition(page);
  await page.setViewportSize({ width: 390, height: 600 });
  await expectOneCutFits(page);
  await expectSamePosition(page, fittedPosition, "y");
  await page.setViewportSize({ width: 844, height: 390 });
  await expectOneCutFits(page);
  await expectSamePosition(page, fittedPosition, "y");
  await page.keyboard.press("Escape");
  await page.locator(".comic-card").click();
  await expect(fit).toBeChecked();
  await expect(zoom).toHaveValue("1");
  expect(await region(page).evaluate((element) => element.scrollTop)).toBe(0);
});

test("native modal focus stays inside, titles are text, and Escape and close restore the triggering card", async ({
  page,
}) => {
  await documentForViewer(page);
  const executions: string[] = [];
  page.on("dialog", async (event) => {
    executions.push(event.message());
    await event.dismiss();
  });
  const title = '<img src=x onerror="alert(1)"> 한글 제목';
  await mount(page, source(2, title));
  const card = page.locator(".comic-card");
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(dialog(page)).toHaveAccessibleName(title);
  const close = dialog(page).getByRole("button", { name: "닫기", exact: true });
  const fit = dialog(page).getByRole("checkbox", { name: "화면 넘침 방지" });
  const zoom = dialog(page).getByLabel("보기 크기");
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(fit).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(zoom).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog(page).getByRole("button", { name: "다음 컷", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(region(page)).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(region(page)).toBeFocused();
  await page
    .locator("#outside")
    .evaluate((button: HTMLElement) => button.focus());
  await expect(region(page)).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.keyboard.press("Escape");
  await expect(dialog(page)).toBeHidden();
  await expect(card).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("clip");
  await card.click();
  await close.click();
  await expect(card).toBeFocused();
  expect(executions).toEqual([]);
  await expect(
    page.locator(".comic-card-copy img, .comic-viewer-title img"),
  ).toHaveCount(0);
});

test("card cleanup and viewer destruction are idempotent and release Blob URLs, observers, modal and scroll lock", async ({
  page,
}) => {
  const unsafeRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("viewer-unsafe.invalid"))
      unsafeRequests.push(request.url());
  });
  await page.addInitScript(() => {
    const create = URL.createObjectURL.bind(URL);
    const revoke = URL.revokeObjectURL.bind(URL);
    const urls = new Set<string>();
    let observers = 0;
    URL.createObjectURL = (blob) => {
      const url = create(blob);
      urls.add(url);
      return url;
    };
    URL.revokeObjectURL = (url) => {
      urls.delete(url);
      revoke(url);
    };
    const NativeObserver = ResizeObserver;
    window.ResizeObserver = class extends NativeObserver {
      active = false;
      observe(target: Element, options?: ResizeObserverOptions) {
        if (!this.active) {
          this.active = true;
          observers++;
        }
        return super.observe(target, options);
      }
      disconnect() {
        if (this.active) {
          this.active = false;
          observers--;
        }
        super.disconnect();
      }
    };
    window.comicResources = () => ({ urls: urls.size, observers });
  });
  await documentForViewer(page);
  for (let index = 0; index < 5; index++) {
    await mount(page, source(2));
    await page.locator(".comic-card").click();
    await expectDecoded(artwork(page));
    const state = await page.evaluate(() => {
      const staleButton =
        document.querySelector<HTMLButtonElement>(".comic-card");
      window.comicTest.cleanup();
      window.comicTest.cleanup();
      staleButton.click();
      return {
        ...window.comicResources(),
        dialogs: document.querySelectorAll("dialog").length,
        cards: document.querySelectorAll(".comic-card").length,
        overflow: document.body.style.overflow,
      };
    });
    expect(state).toEqual({
      urls: 0,
      observers: 0,
      dialogs: 0,
      cards: 0,
      overflow: "clip",
    });
  }
  const direct = await page.evaluate(
    async ({ viewerModule, renderModule, code }) => {
      const ui = await import(viewerModule);
      const renderer = await import(renderModule);
      const viewer = ui.createComicViewer();
      const completed = renderer.renderPanels(code);
      const before = {
        body: document.body.innerHTML,
        head: document.head.innerHTML,
        ...window.comicResources(),
      };
      let rejectedBeforeOpen = false;
      try {
        viewer.open({
          ...completed,
          svg: completed.svg.replace(
            /<\/svg>$/,
            '<image href="https://viewer-unsafe.invalid/picture.svg" width="10" height="10"/></svg>',
          ),
        });
      } catch (error) {
        rejectedBeforeOpen = error instanceof TypeError;
      }
      const unallocated =
        JSON.stringify(before) ===
        JSON.stringify({
          body: document.body.innerHTML,
          head: document.head.innerHTML,
          ...window.comicResources(),
        });
      const { diagnostics: _diagnostics, ...minimal } = completed;
      minimal.panels = completed.panels.map(
        ({ diagnostics: _diagnostics, ...panel }) => panel,
      );
      viewer.open(minimal);
      const imageBefore = document.querySelector<HTMLImageElement>(
        ".comic-viewer-artwork img",
      ).src;
      let rejectedReplacement = false;
      try {
        viewer.open({ ...completed, diagnostics: ["렌더링 실패"] });
      } catch (error) {
        rejectedReplacement = error instanceof TypeError;
      }
      const keptSession =
        viewer.isOpen &&
        imageBefore ===
          document.querySelector<HTMLImageElement>(".comic-viewer-artwork img")
            .src;
      viewer.close();
      viewer.close();
      viewer.destroy();
      viewer.destroy();
      return {
        ...window.comicResources(),
        dialogs: document.querySelectorAll("dialog").length,
        overflow: document.body.style.overflow,
        rejectedBeforeOpen,
        unallocated,
        rejectedReplacement,
        keptSession,
      };
    },
    { viewerModule, renderModule, code: source(1) },
  );
  expect(direct).toEqual({
    urls: 0,
    observers: 0,
    dialogs: 0,
    overflow: "clip",
    rejectedBeforeOpen: true,
    unallocated: true,
    rejectedReplacement: true,
    keptSession: true,
  });
  expect(unsafeRequests).toEqual([]);
});

test("multiple cards and replacing an open result preserve independent modal and body lock ownership", async ({
  page,
}) => {
  await documentForViewer(page);
  await page.evaluate(
    async ({ renderModule, viewerModule, first, second }) => {
      const renderer = await import(renderModule);
      const viewer = await import(viewerModule);
      const main = document.querySelector("main");
      const containers = [
        document.createElement("section"),
        document.createElement("section"),
      ];
      main.append(...containers);
      const results = [
        renderer.renderPanels(first),
        renderer.renderPanels(second),
      ];
      window.comicCards = containers.map((container, index) =>
        viewer.mountComicCard(container, results[index]),
      );
      window.directViewer = viewer.createComicViewer();
      window.directResults = results;
    },
    {
      renderModule,
      viewerModule,
      first: source(2, "첫 만화"),
      second: source(7, "다른 만화"),
    },
  );
  await page.locator(".comic-card").first().click();
  await expect(dialog(page)).toHaveAccessibleName("첫 만화");
  await page
    .locator(".comic-card")
    .nth(1)
    .evaluate((button: HTMLButtonElement) => button.click());
  await expect(page.locator("dialog[open]")).toHaveCount(2);
  await expect(
    page
      .getByRole("dialog", { name: "다른 만화", exact: true })
      .getByRole("button", { name: "닫기", exact: true }),
  ).toBeFocused();
  await page.evaluate(() => window.comicCards[0]());
  await expect(page.locator("dialog[open]")).toHaveAccessibleName("다른 만화");
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.evaluate(() => window.directViewer.open(window.directResults[0]));
  const directDialog = page.locator("dialog").last();
  await expect(directDialog).toHaveAccessibleName("첫 만화");
  await directDialog.getByLabel("보기 크기").selectOption("2");
  await page.evaluate(() => window.directViewer.open(window.directResults[1]));
  await expect(directDialog).toHaveAccessibleName("다른 만화");
  await expect(directDialog.getByLabel("보기 크기")).toHaveValue("1");
  await expect(directDialog.locator(".comic-position")).toHaveText("1 / 7컷");
  await page.evaluate(() => window.comicCards[1]());
  expect(await page.evaluate(() => document.body.style.overflow)).toBe(
    "hidden",
  );
  await page.evaluate(() => window.directViewer.destroy());
  await expect(page.locator("dialog")).toHaveCount(0);
  expect(await page.evaluate(() => document.body.style.overflow)).toBe("clip");
});

test("optional viewer displays completed async Korean Mermaid panels without changing SVG or loading its own renderer", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await documentForViewer(page);
  const code = JSON.stringify({
    제목: "한글 UML 수업",
    등장인물: { 가: { 그림: "서버" } },
    컷: [
      {
        인물: ["가"],
        대사: [{ 화자: "가", 내용: "회원과 주문을 봐요." }],
        다이어그램: {
          종류: "머메이드",
          원문: 'classDiagram\ndirection LR\nclass Member["회원"]\nclass Order["주문"]\nMember --> Order : 접수',
        },
      },
      {
        인물: ["가"],
        대사: [{ 화자: "가", 내용: "요청과 응답이에요." }],
        다이어그램: {
          종류: "머메이드",
          원문: "sequenceDiagram\nparticipant 회원\nparticipant 서버\n회원->>서버: 주문 요청\n서버-->>회원: 주문 접수",
        },
      },
    ],
  });
  await mount(page, code, 960, "compact", true);
  const viewerRequests: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("blob:")) viewerRequests.push(request.url());
  });
  await page.locator(".comic-card").click();
  await expectOneCutFits(page);
  const retained = await artwork(page).evaluate(
    async (image: HTMLImageElement) => {
      const svg = await (await fetch(image.src)).text();
      const xml = new DOMParser().parseFromString(svg, "image/svg+xml");
      return {
        exact: svg === window.comicTest.result.svg,
        diagrams: xml.querySelectorAll("[data-diagram]").length,
        text: xml.documentElement.textContent,
      };
    },
  );
  expect(retained.exact).toBe(true);
  expect(retained.diagrams).toBe(2);
  expect(retained.text).toContain("회원");
  expect(retained.text).toContain("주문 요청");
  await dialog(page)
    .getByRole("button", { name: "다음 컷", exact: true })
    .click();
  await expect(position(page)).toHaveText("2 / 2컷");
  await page.setViewportSize({ width: 844, height: 390 });
  await expectOneCutFits(page);
  expect(viewerRequests).toEqual([]);
  await page.keyboard.press("Escape");
});

test("public viewer navigates a horizontal composite with transformed cuts and independent panel widths", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await documentForViewer(page);
  const expected = await page.evaluate(
    async ({ renderModule, viewerModule, code }) => {
      const renderer = await import(renderModule);
      const ui = await import(viewerModule);
      const result = renderer.renderPanels(code, {
        width: 720,
        panelFormat: "compact",
      });
      const xml = new DOMParser().parseFromString(result.svg, "image/svg+xml");
      const root = xml.documentElement;
      const groups = [...root.querySelectorAll("g[data-panel]")];
      groups[0].setAttribute("transform", "translate(0 68)");
      groups[1].setAttribute("transform", "matrix(1 0 0 1 720 68)");
      const height = Math.max(...result.panels.map((panel) => panel.height));
      root.setAttribute("width", "1440");
      root.setAttribute("height", String(height));
      root.setAttribute("viewBox", `0 0 1440 ${height}`);
      const horizontal = {
        ...result,
        width: 1440,
        height,
        svg: new XMLSerializer().serializeToString(root),
      };
      const viewer = ui.createComicViewer();
      viewer.open(horizontal, { trigger: document.getElementById("outside") });
      window.comicTest = {
        result: horizontal,
        frames: [],
        cleanup: () => viewer.destroy(),
      };
      return {
        svg: horizontal.svg,
        widths: horizontal.panels.map((panel) => panel.width),
        firstFrameX: Number(groups[0].querySelector("rect").getAttribute("x")),
      };
    },
    { renderModule, viewerModule, code: source(2, "가로 배치") },
  );
  expect(expected.widths).toEqual([720, 720]);
  await expectDecoded(artwork(page));
  await dialog(page)
    .getByRole("checkbox", { name: "화면 넘침 방지" })
    .uncheck();
  await dialog(page).getByLabel("보기 크기").selectOption("2");
  await expect
    .poll(async () => (await artwork(page).boundingBox()).width)
    .toBe(2880);
  await dialog(page)
    .getByRole("button", { name: "다음 컷", exact: true })
    .click();
  await expect(position(page)).toHaveText("2 / 2컷");
  await expect
    .poll(() => region(page).evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(1300);
  await region(page).focus();
  await page.keyboard.press("ArrowLeft");
  await expect(position(page)).toHaveText("1 / 2컷");
  expect(await region(page).evaluate((element) => element.scrollLeft)).toBe(
    expected.firstFrameX * 2,
  );
  const svg = await artwork(page).evaluate(async (image: HTMLImageElement) =>
    (await fetch(image.src)).text(),
  );
  expect(svg).toBe(expected.svg);
  await page.keyboard.press("Escape");
  await expect(page.locator("#outside")).toBeFocused();
});

test("compatibility and optional entries share unique accessible IDs, body lock ownership and one scoped stylesheet", async ({
  page,
}) => {
  await documentForViewer(page);
  await page.evaluate(
    async ({ viewerModule, first, second }) => {
      document.body.style.setProperty("overflow", "scroll", "important");
      const compatible = await import("/sdk/comic-gen.js");
      const optional = await import(viewerModule);
      const main = document.querySelector("main");
      const containers = [
        document.createElement("section"),
        document.createElement("section"),
      ];
      containers[0].id = "compatible-card";
      containers[1].id = "optional-card";
      main.append(...containers);
      window.mixedCleanup = [
        compatible.mountComicCard(
          containers[0],
          compatible.renderPanels(first),
        ),
        optional.mountComicCard(containers[1], compatible.renderPanels(second)),
      ];
    },
    {
      viewerModule,
      first: source(2, "호환 SDK 만화"),
      second: source(7, "선택 뷰어 만화"),
    },
  );
  await page.locator("#compatible-card .comic-card").click();
  await page
    .locator("#optional-card .comic-card")
    .evaluate((button: HTMLButtonElement) => button.click());
  const viewers = page.locator("dialog[data-comic-gen-viewer]");
  await expect(viewers).toHaveCount(2);
  await expect(viewers.nth(0)).toHaveAccessibleName("호환 SDK 만화");
  await expect(viewers.nth(1)).toHaveAccessibleName("선택 뷰어 만화");
  const ids = await page
    .locator("[id]")
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
  await expect(page.locator("style[data-comic-gen-viewer-styles]")).toHaveCount(
    1,
  );
  const secondImage = viewers.nth(1).locator(".comic-viewer-artwork img");
  await expectDecoded(secondImage);
  const secondUrl = await secondImage.getAttribute("src");

  // The first bundle must release only its own lock while the other is open.
  await viewers
    .nth(0)
    .evaluate((element: HTMLDialogElement) => element.close());
  await expect(viewers.nth(0)).toBeHidden();
  await expect(viewers.nth(1)).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => ({
        value: document.body.style.getPropertyValue("overflow"),
        priority: document.body.style.getPropertyPriority("overflow"),
      })),
    )
    .toEqual({ value: "hidden", priority: "important" });
  await page.evaluate(() => window.mixedCleanup[0]());
  await expect(viewers).toHaveCount(1);
  await expect(viewers).toHaveAccessibleName("선택 뷰어 만화");
  await expect(page.locator("#optional-card .comic-card")).toHaveCount(1);
  await expect(page.locator("style[data-comic-gen-viewer-styles]")).toHaveCount(
    1,
  );
  expect(
    await viewers.locator(".comic-viewer-artwork img").getAttribute("src"),
  ).toBe(secondUrl);
  await viewers.getByRole("button", { name: "닫기", exact: true }).click();
  await expect
    .poll(() =>
      page.evaluate(() => ({
        value: document.body.style.getPropertyValue("overflow"),
        priority: document.body.style.getPropertyPriority("overflow"),
      })),
    )
    .toEqual({ value: "scroll", priority: "important" });
  await page.evaluate(() => {
    window.mixedCleanup[1]();
    window.mixedCleanup[1]();
  });
  await expect(viewers).toHaveCount(0);
  await expect(page.locator("style[data-comic-gen-viewer-styles]")).toHaveCount(
    0,
  );
  await expect(page.locator("#outside")).toHaveText("바깥 버튼");
  await expect(page.locator("main > section")).toHaveCount(2);
});

test("viewer defaults retain the v0.6 reading and dismissal behavior", async ({
  page,
}) => {
  await documentForViewer(page);
  await mount(page, source(3));
  await page.getByRole("button", { name: /만화 읽기/ }).click();
  await expect(dialog(page)).toBeVisible();
  await expect(
    dialog(page).getByRole("button", { name: "닫기", exact: true }),
  ).toBeVisible();
  await expect(dialog(page).getByRole("checkbox")).toBeChecked();
  await expect(dialog(page).getByRole("combobox")).toHaveValue("1");
  await expect(position(page)).toHaveText("1 / 3컷");
  await page.mouse.click(2, 2);
  await expect(dialog(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog(page)).not.toBeVisible();
});

test("dismissal options are independent and can be overridden per open", async ({
  page,
}) => {
  await documentForViewer(page);
  await mount(page, source(3));
  await page.evaluate(async () => {
    const { createComicViewer } = await import("/sdk/comic-gen.viewer.js");
    window.optionsViewer = createComicViewer({
      closeOnBackdrop: true,
      closeOnEscape: false,
      showCloseButton: false,
    });
    window.optionsViewer.open(window.comicTest.result);
  });
  await expect(
    dialog(page).getByRole("button", { name: "닫기", exact: true }),
  ).not.toBeVisible();
  await expect(region(page)).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog(page)).toBeVisible();
  // Interior whitespace and a drag starting inside must not dismiss the viewer.
  await dialog(page).locator("h2").click();
  await expect(dialog(page)).toBeVisible();
  await page.mouse.move(200, 200);
  await page.mouse.down();
  await page.mouse.move(2, 2);
  await page.mouse.up();
  await expect(dialog(page)).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(dialog(page)).not.toBeVisible();
  await page.evaluate(() =>
    window.optionsViewer.open(window.comicTest.result, {
      closeOnBackdrop: false,
      closeOnEscape: true,
      showCloseButton: true,
    }),
  );
  await expect(
    dialog(page).getByRole("button", { name: "닫기", exact: true }),
  ).toBeVisible();
  await page.mouse.click(2, 2);
  await expect(dialog(page)).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog(page)).not.toBeVisible();
  await page.evaluate(() => window.optionsViewer.destroy());
});

test("view state supports initial values, host control, reader changes and cleanup", async ({
  page,
}) => {
  await documentForViewer(page);
  await mount(page, source(5));
  await page.evaluate(async () => {
    const { createComicViewer } = await import("/sdk/comic-gen.viewer.js");
    window.viewChanges = [];
    window.optionsViewer = createComicViewer({
      zoom: 1.25,
      preventOverflow: false,
      panelIndex: 2,
      onChange: (state) => window.viewChanges.push(state),
    });
    window.optionsViewer.open(window.comicTest.result);
  });
  await expect(position(page)).toHaveText("3 / 5컷");
  expect(await page.evaluate(() => window.viewChanges.length)).toBe(1);
  expect(await page.evaluate(() => window.optionsViewer.state)).toEqual({
    zoom: 1.25,
    preventOverflow: false,
    panelIndex: 2,
  });
  await page.evaluate(() =>
    window.optionsViewer.setView({
      zoom: 2.25,
      preventOverflow: true,
      panelIndex: 3,
    }),
  );
  await expect(position(page)).toHaveText("4 / 5컷");
  expect(await page.evaluate(() => window.viewChanges.length)).toBe(2);
  await expect(dialog(page).getByRole("combobox")).toHaveValue("2.25");
  await expect(dialog(page).getByRole("checkbox")).toBeChecked();
  await dialog(page).getByRole("button", { name: "이전 컷" }).click();
  await expect(position(page)).toHaveText("3 / 5컷");
  await dialog(page).getByRole("combobox").selectOption("1.5");
  expect(await page.evaluate(() => window.viewChanges.at(-1))).toEqual({
    zoom: 1.5,
    preventOverflow: true,
    panelIndex: 2,
  });
  expect(
    await page.evaluate(() => {
      const before = window.optionsViewer.state;
      try {
        window.optionsViewer.setView({ zoom: 0, panelIndex: 99 });
      } catch {}
      return (
        JSON.stringify(before) === JSON.stringify(window.optionsViewer.state)
      );
    }),
  ).toBe(true);
  await page.evaluate(() => window.optionsViewer.close());
  expect(await page.evaluate(() => window.optionsViewer.state)).toBeNull();
  expect(await page.evaluate(() => window.viewChanges.at(-1))).toBeNull();
  await page.evaluate(() => window.optionsViewer.open(window.comicTest.result));
  await expect(position(page)).toHaveText("3 / 5컷");
  await page.evaluate(() => {
    window.optionsViewer.destroy();
    window.optionsViewer.destroy();
    window.comicTest.cleanup();
  });
  await expect(page.locator("dialog")).toHaveCount(0);
  await expect(page.locator("style[data-comic-gen-viewer-styles]")).toHaveCount(
    0,
  );
});

test("card forwards viewer options while keeping its cleanup return value", async ({
  page,
}) => {
  await documentForViewer(page);
  await mount(page, source(3));
  await page.evaluate(async () => {
    const { mountComicCard } = await import("/sdk/comic-gen.viewer.js");
    window.comicTest.cleanup();
    window.comicTest.cleanup = mountComicCard(
      window.comicTest.container,
      window.comicTest.result,
      { showCloseButton: false, closeOnBackdrop: true, panelIndex: 1 },
    );
  });
  await page.getByRole("button", { name: /만화 읽기/ }).click();
  await expect(position(page)).toHaveText("2 / 3컷");
  await expect(
    dialog(page).getByRole("button", { name: "닫기", exact: true }),
  ).not.toBeVisible();
  await page.mouse.click(2, 2);
  await expect(dialog(page)).not.toBeVisible();
  await page.evaluate(() => window.comicTest.cleanup());
  await expect(page.locator("dialog")).toHaveCount(0);
});
