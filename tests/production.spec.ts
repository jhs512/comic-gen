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
      "renderPanels",
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

test("standalone SDK supplies card and viewer styles without a host stylesheet", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4173");
  await page.evaluate(async () => {
    const sdk = await import("/sdk/comic-gen.js");
    document
      .querySelectorAll('style, link[rel="stylesheet"]')
      .forEach((style) => style.remove());
    document.body.replaceChildren();
    const root = document.createElement("section");
    const block = document.createElement("pre");
    const code = document.createElement("code");
    code.className = "language-comic-gen";
    code.textContent =
      "title: SDK 카드\ncast: {a: {asset: server}}\npanels: [{actors: [a]}]";
    block.append(code);
    root.append(block);
    document.body.append(root);
    sdk.renderCodeBlocks(root);
    sdk.renderCodeBlocks(root);
  });
  await expect(page.locator(".comic-card")).toHaveCount(1);
  await expect(page.locator("#comic-gen-embed-styles")).toHaveCount(1);
  await expect(page.locator("pre")).toBeHidden();
  await page.getByRole("button", { name: "SDK 카드 · 만화 읽기" }).click();
  await expect(page.getByRole("dialog", { name: "SDK 카드" })).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect((await page.getByRole("dialog").boundingBox())!.width).toBe(390);
  expect(
    await page
      .locator(".comic-viewer-artwork svg")
      .evaluate((svg) => getComputedStyle(svg).display),
  ).toBe("block");
});

test("distributed SDK accepts the full Korean authoring contract and legacy English", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:4173");
  const result = await page.evaluate(async () => {
    const sdk = await import("/sdk/comic-gen.js");
    const korean =
      "제목: 한글 만화\n등장인물: {서버: {그림: 서버, 이름표: 웹 서버}, 저장소: {그림: 데이터베이스}}\n컷:\n  - 인물: [{식별자: 서버, 표정: 기쁨, 손모양: 인사손}, 저장소]\n    대사: [{화자: 서버, 상대: 저장소, 내용: 반가워}]\n  - 구성: 이전\n    인물: [{식별자: 서버, 손모양: null, 든소품: 데이터}]\n    전달: [{주는인물: 서버, 받는인물: 저장소, 소품: 데이터}]";
    const english =
      "title: 한글 만화\ncast: {서버: {asset: server, label: 웹 서버}, 저장소: {asset: database}}\npanels:\n  - actors: [{id: 서버, expression: happy, gesture: wave}, 저장소]\n    dialogue: [{from: 서버, to: 저장소, text: 반가워}]\n  - mode: before\n    actors: [{id: 서버, gesture: null, holding: data}]\n    transfer: [{from: 서버, to: 저장소, prop: data}]";
    const ko = sdk.만화그리기(korean, { 너비: 960, 컷비율: "기본" });
    const en = sdk.renderComic(english, { width: 960, panelFormat: "compact" });
    return {
      same: ko.svg === en.svg,
      diagnostics: ko.diagnostics,
      panels: ko.panels.length,
      exports: Object.keys(sdk),
      fields: sdk.문법항목,
      values: sdk.문법값,
    };
  });
  expect(result.same).toBe(true);
  expect(result.diagnostics).toEqual([]);
  expect(result.panels).toBe(2);
  expect(result.exports).toEqual(
    expect.arrayContaining([
      "만화그리기",
      "컷그리기",
      "코드블록그리기",
      "렌더러만들기",
    ]),
  );
  expect(result.fields.comic).toEqual({
    title: "제목",
    cast: "등장인물",
    panels: "컷",
  });
  expect(result.values.gesture.wave).toBe("인사손");
});
