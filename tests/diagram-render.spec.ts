import type { Page } from "@playwright/test";
import { test, expect } from "./mermaid-fixture";

const plain =
  "제목: 일반 만화\n등장인물: {가: {그림: 서버}}\n컷: [{인물: [가], 대사: [{화자: 가, 내용: 기존 대사}]}]";
const classSource =
  "classDiagram\n  class 주문 {\n    +String 상태\n    +접수()\n  }\n  class 상품\n  주문 --> 상품 : 포함";
const sequenceSource =
  "sequenceDiagram\n  participant 손님\n  participant 서버\n  손님->>서버: 주문 요청\n  서버-->>손님: 주문 접수";
function comic(diagrams: string[], title = "다이어그램 수업") {
  return JSON.stringify({
    제목: title,
    등장인물: {
      가: { 그림: "서버", 이름표: "설명자" },
      나: { 그림: "클라이언트", 이름표: "질문자" },
    },
    컷: diagrams.map((원문) => ({
      인물: ["가", "나"],
      대사: [{ 화자: "가", 상대: "나", 내용: "그림과 인물을 함께 봐요." }],
      다이어그램: { 종류: "머메이드", 원문, 제목: "주문 시스템" },
    })),
  });
}

async function openSdkDocument(page: Page) {
  await page.route("**/diagram-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>body{margin:0;font-family:sans-serif}.host-probe{color:rgb(12,34,56);font-size:17px}main svg svg{width:100%;height:auto;max-width:100%}</style></head><body><p class="host-probe">호스트 스타일</p><main></main></body></html>',
    }),
  );
  await page.goto("/diagram-test.html");
}

test("ordinary sync and async SDK APIs keep identical SVG and never load Mermaid", async ({
  page,
}) => {
  const mermaidRequests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("/npm/mermaid@"))
      mermaidRequests.push(request.url());
  });
  await openSdkDocument(page);
  const result = await page.evaluate(
    async ({ plain, diagram }) => {
      const sdk = await import("/src/index.ts");
      const renderer = sdk.createRenderer();
      const sync = renderer.render(plain);
      const asyncResult = await renderer.renderAsync(plain);
      const panels = renderer.renderPanels(plain);
      const panelsAsync = await renderer.renderPanelsAsync(plain);
      const blocked = sdk.renderComic(diagram);
      const blockedPanels = sdk.renderPanels(diagram);
      return {
        isPromise:
          sync instanceof Promise ||
          panels instanceof Promise ||
          blocked instanceof Promise,
        exactSvg: sync.svg === asyncResult.svg,
        exactPanels: panels.svg === panelsAsync.svg,
        diagnostics: [
          sync.diagnostics,
          asyncResult.diagnostics,
          panels.diagnostics,
          panelsAsync.diagnostics,
        ],
        blocked: [blocked, blockedPanels],
      };
    },
    { plain, diagram: comic([classSource]) },
  );
  expect(result.isPromise).toBe(false);
  expect(result.exactSvg).toBe(true);
  expect(result.exactPanels).toBe(true);
  expect(result.diagnostics).toEqual([[], [], [], []]);
  for (const blocked of result.blocked) {
    expect(blocked.svg).toBe("");
    expect(blocked.diagnostics.join("\n")).toContain("renderComicAsync");
    expect(blocked.diagnostics.join("\n")).toContain("컷 1.다이어그램");
  }
  expect(mermaidRequests).toEqual([]);
});

test("Korean class and sequence diagrams share a cut with dialogue and actors in separate visible regions", async ({
  page,
}) => {
  await openSdkDocument(page);
  const result = await page.evaluate(
    async (source) => {
      const sdk = await import("/src/index.ts");
      const outputs = [];
      for (const 컷비율 of ["기본", "모바일"]) {
        const output = await sdk.만화그리기비동기(source, {
          너비: 960,
          컷비율,
        });
        document.querySelector("main").innerHTML = output.svg;
        const cuts = [...document.querySelectorAll("main [data-panel]")].map(
          (panel) => {
            const board = panel
              .querySelector("[data-diagram]")
              .getBoundingClientRect();
            const scene = panel
              .querySelector("[data-scene]")
              .getBoundingClientRect();
            const diagram = panel
              .querySelector("[data-diagram-content]")
              .getBoundingClientRect();
            const texts = [
              ...panel.querySelectorAll("[data-diagram-content] text"),
            ].map((text) => {
              const bounds = text.getBoundingClientRect();
              return {
                text: text.textContent,
                fontSize: parseFloat(getComputedStyle(text).fontSize),
                visibility: getComputedStyle(text).visibility,
                width: bounds.width,
                height: bounds.height,
              };
            });
            return {
              overlap: board.bottom > scene.top + 1,
              contained:
                diagram.left >= board.left &&
                diagram.right <= board.right &&
                diagram.top >= board.top &&
                diagram.bottom <= board.bottom,
              board: { width: board.width, height: board.height },
              actors: panel.querySelectorAll("[data-character]").length,
              dialogue: panel.querySelectorAll("[data-dialogue]").length,
              texts,
            };
          },
        );
        outputs.push({
          diagnostics: output.diagnostics,
          panels: output.panels.length,
          cuts,
        });
      }
      return outputs;
    },
    comic([classSource, sequenceSource]),
  );
  for (const output of result) {
    expect(output.diagnostics).toEqual([]);
    expect(output.panels).toBe(2);
    for (const cut of output.cuts) {
      expect(cut.overlap).toBe(false);
      expect(cut.contained).toBe(true);
      expect(cut.board.width).toBeGreaterThan(0);
      expect(cut.board.height).toBeGreaterThan(160);
      expect(cut.actors).toBe(2);
      expect(cut.dialogue).toBe(1);
      expect(
        cut.texts.some((text) => /주문|상태|손님|서버/.test(text.text)),
      ).toBe(true);
      for (const text of cut.texts.filter((text) => text.text.trim())) {
        expect(text.fontSize).toBeGreaterThanOrEqual(14);
        expect(text.visibility).toBe("visible");
        expect(text.width).toBeGreaterThan(0);
        expect(text.height).toBeGreaterThan(0);
      }
    }
  }
});

test("cached repeated diagrams have unique IDs and local references across full and individual SVGs", async ({
  page,
}) => {
  await openSdkDocument(page);
  const result = await page.evaluate(
    async (source) => {
      const sdk = await import("/src/index.ts");
      const renderer = sdk.createRenderer();
      const probe = document.querySelector(".host-probe");
      const before = {
        color: getComputedStyle(probe).color,
        size: getComputedStyle(probe).fontSize,
      };
      const first = await renderer.renderAsync(source);
      const cached = await renderer.renderAsync(source);
      const main = document.querySelector("main");
      main.innerHTML = [
        first.svg,
        ...first.panels.map((panel) => panel.svg),
        cached.svg,
        ...cached.panels.map((panel) => panel.svg),
      ].join("");
      const ids = [...main.querySelectorAll("[id]")].map((node) => node.id);
      const missing = [],
        external = [],
        events = [];
      let refs = 0;
      for (const node of main.querySelectorAll("*")) {
        for (const attribute of node.attributes) {
          if (/^on/i.test(attribute.name)) events.push(attribute.name);
          if (attribute.localName === "href") {
            refs++;
            if (!attribute.value.startsWith("#"))
              external.push(attribute.value);
            else if (!ids.includes(attribute.value.slice(1)))
              missing.push(attribute.value);
          }
          for (const match of attribute.value.matchAll(
            /url\(\s*["']?([^"')\s]+)["']?\s*\)/gi,
          )) {
            refs++;
            if (!match[1].startsWith("#")) external.push(match[1]);
            else if (!ids.includes(match[1].slice(1))) missing.push(match[1]);
          }
        }
      }
      return {
        diagnostics: [first.diagnostics, cached.diagnostics],
        firstCache: first.cache,
        cachedCache: cached.cache,
        idCount: ids.length,
        uniqueCount: new Set(ids).size,
        refs,
        missing,
        external,
        events,
        forbidden: main.querySelectorAll(
          "style,script,foreignObject,image,iframe,a,animate,animateTransform,animateMotion,set",
        ).length,
        before,
        after: {
          color: getComputedStyle(probe).color,
          size: getComputedStyle(probe).fontSize,
        },
        temporary: document.querySelectorAll("[data-comic-diagram-temporary]")
          .length,
      };
    },
    comic([classSource, classSource, sequenceSource]),
  );
  expect(result.diagnostics).toEqual([[], []]);
  expect(result.firstCache.hits).toBeGreaterThanOrEqual(1);
  expect(result.cachedCache.hits).toBe(3);
  expect(result.idCount).toBeGreaterThan(20);
  expect(result.uniqueCount).toBe(result.idCount);
  expect(result.refs).toBeGreaterThan(0);
  expect(result.missing).toEqual([]);
  expect(result.external).toEqual([]);
  expect(result.events).toEqual([]);
  expect(result.forbidden).toBe(0);
  expect(result.after).toEqual(result.before);
  expect(result.temporary).toBe(0);
});

test("host SVG font and paint selectors cannot change Mermaid measurement or exported text", async ({
  page,
}) => {
  await openSdkDocument(page);
  const result = await page.evaluate(
    async (source) => {
      const sdk = await import("/src/index.ts");
      const renderer = sdk.createRenderer();
      const describe = (output) => {
        const doc = new DOMParser().parseFromString(
          output.svg,
          "image/svg+xml",
        );
        return {
          diagnostics: output.diagnostics,
          diagrams: [
            ...doc.querySelectorAll("[data-diagram-content] > svg"),
          ].map((diagram) => ({
            viewBox: diagram.getAttribute("viewBox"),
            text: [...diagram.querySelectorAll("text,tspan")].map((node) => ({
              text: node.textContent,
              font: node.style.getPropertyValue("font-family"),
              size: node.style.getPropertyValue("font-size"),
              fill: node.style.getPropertyValue("fill"),
            })),
          })),
        };
      };
      const normal = describe(await renderer.renderAsync(source));
      renderer.clearCache();
      const style = document.createElement("style");
      style.textContent =
        "svg text,svg tspan {font-size:80px!important;fill:red!important;font-family:monospace!important}";
      document.head.append(style);
      const styled = describe(await renderer.renderAsync(source));
      style.remove();
      return { normal, styled };
    },
    comic([classSource, sequenceSource]),
  );
  expect(result.normal.diagnostics).toEqual([]);
  expect(result.normal.diagrams).toHaveLength(2);
  for (const diagram of result.normal.diagrams)
    expect(diagram.text.length).toBeGreaterThan(0);
  expect(result.styled).toEqual(result.normal);
});

test("full and individual standalone SVGs decode into PNG with visible diagram and Korean text pixels", async ({
  page,
}) => {
  await openSdkDocument(page);
  const result = await page.evaluate(
    async (source) => {
      const sdk = await import("/src/index.ts");
      const output = await sdk.renderComicAsync(source, { 너비: 960 });
      const images = [];
      for (const result of [output, ...output.panels]) {
        const main = document.querySelector("main");
        main.innerHTML = result.svg;
        const rootBounds = main.querySelector("svg").getBoundingClientRect();
        const region = (node) => {
          const bounds = node.getBoundingClientRect();
          return {
            x: Math.floor(bounds.x - rootBounds.x),
            y: Math.floor(bounds.y - rootBounds.y),
            width: Math.ceil(bounds.width),
            height: Math.ceil(bounds.height),
          };
        };
        const diagramRegions = [
          ...main.querySelectorAll("[data-diagram-content]"),
        ].map(region);
        const koreanRegions = [
          ...main.querySelectorAll("[data-diagram-content] text"),
        ]
          .filter((node) => /주문|손님/.test(node.textContent))
          .map(region);
        const blob = await sdk.exportPng(result);
        const url = URL.createObjectURL(blob);
        try {
          const image = new Image();
          image.src = url;
          await image.decode();
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0);
          const pixels = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height,
          ).data;
          let dark = 0,
            opaque = 0;
          for (let i = 0; i < pixels.length; i += 4) {
            if (pixels[i + 3] === 255) opaque++;
            if (
              pixels[i] < 180 &&
              pixels[i + 1] < 180 &&
              pixels[i + 2] < 180 &&
              pixels[i + 3] > 0
            )
              dark++;
          }
          const regionInk = ({ x, y, width, height }) => {
            const pixels = context.getImageData(x, y, width, height).data;
            let ink = 0;
            for (let index = 0; index < pixels.length; index += 4)
              if (
                pixels[index] < 180 &&
                pixels[index + 1] < 180 &&
                pixels[index + 2] < 180 &&
                pixels[index + 3] > 0
              )
                ink++;
            return ink;
          };
          images.push({
            type: blob.type,
            bytes: blob.size,
            width: image.naturalWidth,
            height: image.naturalHeight,
            expectedHeight: result.height,
            dark,
            opaque,
            diagramInk: diagramRegions.map(regionInk),
            koreanInk: koreanRegions.map(regionInk),
          });
        } finally {
          URL.revokeObjectURL(url);
        }
      }
      return { diagnostics: output.diagnostics, images };
    },
    comic([classSource, sequenceSource]),
  );
  expect(result.diagnostics).toEqual([]);
  expect(result.images).toHaveLength(3);
  for (const image of result.images) {
    expect(image.type).toBe("image/png");
    expect(image.bytes).toBeGreaterThan(5000);
    expect(image.width).toBe(960);
    expect(image.height).toBe(Math.round(image.expectedHeight));
    expect(image.dark).toBeGreaterThan(1000);
    expect(image.opaque).toBe(image.width * image.height);
    expect(image.diagramInk.length).toBeGreaterThan(0);
    expect(image.koreanInk.length).toBeGreaterThan(0);
    for (const ink of image.diagramInk) expect(ink).toBeGreaterThan(50);
    for (const ink of image.koreanInk) expect(ink).toBeGreaterThan(5);
  }
});

test("mobile diagram cards fit both axes and stale or deleted async cards cannot return", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openSdkDocument(page);
  await page.evaluate(
    async (source) => {
      const sdk = await import("/src/index.ts");
      const pre = document.createElement("pre");
      pre.dataset.comic = "";
      pre.textContent = source;
      document.querySelector("main").append(pre);
      await sdk.renderCodeBlocksAsync(document, { 너비: 960 });
    },
    comic([classSource], "한 컷 UML"),
  );
  await page.getByRole("button", { name: "한 컷 UML · 만화 읽기" }).click();
  const viewer = page.getByRole("dialog");
  await expect(viewer).toBeVisible();
  expect(
    await viewer.locator("img").evaluate(async (image: HTMLImageElement) => {
      const svg = await (await fetch(image.src)).text();
      return new DOMParser()
        .parseFromString(svg, "image/svg+xml")
        .querySelectorAll("[data-diagram]").length;
    }),
  ).toBe(1);
  const fit = async () => {
    await expect
      .poll(() =>
        page.locator(".comic-viewer-viewport").evaluate((viewport) => {
          const image = viewport.querySelector("img").getBoundingClientRect(),
            bounds = viewport.getBoundingClientRect();
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
  };
  await fit();
  await page.setViewportSize({ width: 320, height: 480 });
  await fit();
  await page.keyboard.press("Escape");
  const revisions = await page.evaluate(
    async ({ old, plain, deleted }) => {
      const sdk = await import("/src/index.ts");
      const pre = document.querySelector("pre");
      pre.textContent = old;
      const stale = sdk.renderCodeBlocksAsync();
      pre.textContent = plain;
      await sdk.renderCodeBlocksAsync();
      await stale;
      const visibleTitle =
        document.querySelector(".comic-card strong").textContent;
      pre.textContent = old;
      const changedWithoutRendering = sdk.renderCodeBlocksAsync();
      pre.textContent = plain;
      await changedWithoutRendering;
      const staleWarning = document.querySelector(
        ".comic-figure [role='status']",
      ).textContent;
      pre.textContent = deleted;
      const removing = sdk.renderCodeBlocksAsync();
      pre.remove();
      await removing;
      return {
        visibleTitle,
        staleWarning,
        cards: document.querySelectorAll(".comic-card").length,
        figures: document.querySelectorAll(".comic-figure").length,
        rawVisible: [...document.querySelectorAll("pre")].filter(
          (node) => !node.hidden,
        ).length,
      };
    },
    {
      old: comic([sequenceSource], "늦게 끝난 만화"),
      plain,
      deleted: comic(["flowchart LR; A-->B"], "삭제된 만화"),
    },
  );
  expect(revisions.visibleTitle).toBe("일반 만화");
  expect(revisions.staleWarning).toContain("코드가 바뀌었어요");
  expect(revisions.cards).toBe(0);
  expect(revisions.figures).toBe(0);
  expect(revisions.rawVisible).toBe(0);
});

test("unsafe source and font declarations fail without external requests and Mermaid syntax errors recover", async ({
  page,
}) => {
  await openSdkDocument(page);
  const external: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (
      !url.startsWith("http://127.0.0.1:") &&
      url !==
        "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.5.0/cdn/comic-gen.mermaid.js" &&
      !url.startsWith("https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/")
    )
      external.push(url);
  });
  const sources = [
    'flowchart LR; A["<script>alert(1)</script>"]',
    'flowchart LR; A["<img src=https://evil.invalid/a onerror=alert(1)>"]',
    'flowchart LR; A["&lt;iframe src=https://evil.invalid/a&gt;"]',
    "%%{init: {'securityLevel': 'loose', 'themeCSS': '@import url(https://evil.invalid/a)'}}%%\nflowchart LR; A-->B",
    "---\nconfig:\n  theme: dark\n---\nflowchart LR; A-->B",
    'flowchart LR\nA-->B\nclick A href "https://evil.invalid/"',
    "flowchart LR\nA-->B\nclassDef danger fill:url(https://evil.invalid/a)",
    "flowchart LR\nA-->B\nstyle A fill:red",
    'flowchart LR\nA@{ img: "https://evil.invalid/a" }',
    'flowchart LR\nA@{ "img": "https://evil.invalid/quoted.png" }',
    'flowchart LR\nA@{ "\\u0069mg": "https://evil.invalid/escaped.png" }',
    'flowchart LR; A["word<script>alert(1)</script>"]',
  ];
  const result = await page.evaluate(
    async ({ sources, valid, fontSource }) => {
      const sdk = await import("/src/index.ts");
      const invalid = [];
      for (const source of sources)
        invalid.push(await sdk.renderComicAsync(source));
      const font = await sdk.renderComicAsync(fontSource, {
        글꼴: "Arial; background:url(https://evil.invalid/a)",
      });
      const malformed = await sdk.renderComicAsync(
        JSON.stringify({
          cast: { a: { asset: "server" } },
          panels: [
            {
              actors: ["a"],
              diagram: { type: "mermaid", source: "classDiagram\nclass {" },
            },
          ],
        }),
      );
      const recovered = await sdk.renderPanelsAsync(valid, { 컷비율: "기본" });
      return {
        invalid,
        font,
        malformed,
        recovered: {
          diagnostics: recovered.diagnostics,
          panels: recovered.panels.length,
          svg: !!recovered.svg,
        },
        temporary: document.querySelectorAll("[data-comic-diagram-temporary]")
          .length,
      };
    },
    {
      sources: sources.map((source) => comic([source])),
      valid: comic([sequenceSource]),
      fontSource: comic([classSource]),
    },
  );
  for (const invalid of [...result.invalid, result.font]) {
    expect(invalid.svg).toBe("");
    expect(invalid.diagnostics.join("\n")).toContain("컷 1.다이어그램");
  }
  expect(result.malformed.svg).toBe("");
  expect(result.malformed.diagnostics.join("\n")).toContain("컷 1.다이어그램");
  expect(result.recovered).toEqual({ diagnostics: [], panels: 1, svg: true });
  expect(result.temporary).toBe(0);
  expect(external).toEqual([]);
});
