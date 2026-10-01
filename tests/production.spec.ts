import { test, expect } from "./mermaid-fixture";

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
      "renderComicAsync",
      "renderPanelsAsync",
      "renderCodeBlocksAsync",
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

test("distributed SDK lazily renders diagrams through its async API and exports standalone PNG", async ({
  page,
  request,
}) => {
  const response = await request.get(
    "http://127.0.0.1:4173/sdk/comic-gen.mermaid.js",
  );
  expect(
    /import\(\/\* webpackIgnore: true \*\/\s/.test(await response.text()),
  ).toBe(true);
  await page.goto("http://127.0.0.1:4173");
  const mermaidRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/npm/mermaid@"))
      mermaidRequests.push(request.url());
  });
  const result = await page.evaluate(async () => {
    const sdk = await import("/sdk/comic-gen.js");
    const source = JSON.stringify({
      제목: "배포 SDK UML",
      등장인물: { 서버: { 그림: "서버" } },
      컷: [
        {
          인물: ["서버"],
          다이어그램: {
            종류: "머메이드",
            원문: "sequenceDiagram\nparticipant A as 사용자\nparticipant B as 서버\nA->>B: 요청\nB-->>A: 응답",
          },
        },
      ],
    });
    const sync = sdk.만화그리기(source);
    const renderer = sdk.렌더러만들기();
    const output = await renderer.renderPanelsAsync(source, { 컷비율: "기본" });
    const cached = await renderer.renderPanelsAsync(source, { 컷비율: "기본" });
    const png = await sdk.exportPng(output.panels[0]);
    const image = await createImageBitmap(png);
    return {
      sync: sync.diagnostics,
      diagnostics: output.diagnostics,
      cached: cached.cache,
      panels: output.panels.length,
      svg: output.svg.includes("사용자"),
      png: { type: png.type, width: image.width, height: image.height },
      size: {
        width: output.panels[0].width,
        height: Math.round(output.panels[0].height),
      },
      aliases: [
        sdk.만화그리기비동기 === sdk.renderComicAsync,
        sdk.컷그리기비동기 === sdk.renderPanelsAsync,
        sdk.코드블록그리기비동기 === sdk.renderCodeBlocksAsync,
      ],
    };
  });
  expect(result.sync.join("\n")).toContain("renderComicAsync");
  expect(result.diagnostics).toEqual([]);
  expect(result.cached.hits).toBe(1);
  expect(result.panels).toBe(1);
  expect(result.svg).toBe(true);
  expect(result.aliases).toEqual([true, true, true]);
  expect(result.png).toEqual({ type: "image/png", ...result.size });
  expect(mermaidRequests.length).toBeGreaterThan(0);
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
      .locator(".comic-viewer-artwork img")
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
