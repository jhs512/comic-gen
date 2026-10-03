import type { Page } from "@playwright/test";
import { test, expect } from "./mermaid-fixture";

const runtimeUrl =
  "https://cdn.jsdelivr.net/gh/jhs512/comic-gen@v0.6.0/cdn/comic-gen.mermaid.js";
const moduleUrl =
  "https://cdn.jsdelivr.net/npm/mermaid@11.17.2/dist/mermaid.esm.min.mjs";
const classSource =
  'classDiagram\ndirection LR\nclass Member["회원"]\nclass Order["주문"]\nMember --> Order: 주문';
const sequenceSource =
  "sequenceDiagram\nparticipant A as 손님\nparticipant B as 서버\nA->>B: 주문 요청\nB-->>A: 주문 접수";

function comic(diagrams: string[]) {
  return JSON.stringify({
    제목: "AMD 환경의 UML",
    등장인물: { 설명자: { 그림: "서버" } },
    컷: diagrams.map((원문) => ({
      인물: ["설명자"],
      대사: [{ 화자: "설명자", 내용: "다이어그램을 함께 읽어요." }],
      다이어그램: { 종류: "머메이드", 원문 },
    })),
  });
}

async function openAmdDocument(page: Page) {
  await page.route("**/mermaid-amd-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="ko"><head><meta charset="utf-8"></head><body></body></html>',
      headers: {
        "Content-Security-Policy":
          "default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; style-src 'unsafe-inline'; frame-src 'self' data:; font-src 'self'; img-src blob:",
      },
    }),
  );
  await page.goto("http://127.0.0.1:4173/mermaid-amd-test.html");
  await page.evaluate(() => {
    let registrations = 0,
      setterCalls = 0,
      getterCalls = 0;
    // The actual failure occurs when two bundled UMD dependencies register
    // anonymously with Monaco's AMD loader. The getter also catches attempts
    // to temporarily inspect/replace that loader while imports are pending.
    const define = () => {
      if (++registrations > 1)
        throw new Error(
          "Can only have one anonymous define call per script file",
        );
    };
    define.amd = {};
    Object.defineProperty(window, "define", {
      configurable: false,
      get: () => {
        getterCalls++;
        return define;
      },
      set: () => {
        setterCalls++;
        throw new Error("The host AMD loader must not be changed");
      },
    });
    const original = Object.getOwnPropertyDescriptor(window, "define")!;
    Object.defineProperty(window, "__comicAmdProbe", {
      value: () => {
        const current = Object.getOwnPropertyDescriptor(window, "define")!;
        return {
          registrations,
          setterCalls,
          getterCalls,
          descriptorUnchanged:
            current.get === original.get &&
            current.set === original.set &&
            current.configurable === original.configurable &&
            current.enumerable === original.enumerable,
          temporary: document.querySelectorAll(
            "iframe,[data-comic-diagram-temporary]",
          ).length,
        };
      },
    });
  });
}

test("public renderer draws Korean class and sequence diagrams without touching a readonly AMD loader", async ({
  page,
}) => {
  const requests: string[] = [],
    pageErrors: string[] = [];
  page.on("request", (request) => {
    if (
      request.url() === runtimeUrl ||
      request.url().includes("/npm/mermaid@11.17.2/")
    )
      requests.push(request.url());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await openAmdDocument(page);
  const plain = await page.evaluate(async () => {
    const sdk = await import("/sdk/comic-gen.render.js");
    const source = "등장인물: {가: {그림: 서버}}\n컷: [{인물: [가]}]";
    const result = sdk.renderPanels(source);
    return { diagnostics: result.diagnostics, panels: result.panels.length };
  });
  expect(plain).toEqual({ diagnostics: [], panels: 1 });
  expect(requests).toEqual([]);
  const result = await page.evaluate(
    async (source) => {
      const sdk = await import("/sdk/comic-gen.render.js");
      const output = await sdk.renderPanelsAsync(source);
      const xml = new DOMParser().parseFromString(output.svg, "image/svg+xml");
      return {
        diagnostics: output.diagnostics,
        panels: output.panels.map((panel) => ({
          width: panel.width,
          height: panel.height,
          valid: !new DOMParser()
            .parseFromString(panel.svg, "image/svg+xml")
            .querySelector("parsererror"),
        })),
        valid: !xml.querySelector("parsererror"),
        diagrams: xml.querySelectorAll('[data-diagram="mermaid"]').length,
        text: xml.documentElement.textContent,
        probe: window.__comicAmdProbe(),
      };
    },
    comic([classSource, sequenceSource]),
  );
  expect(result.diagnostics).toEqual([]);
  expect(result.valid).toBe(true);
  expect(result.diagrams).toBe(2);
  expect(result.panels).toHaveLength(2);
  for (const panel of result.panels) {
    expect(panel.valid).toBe(true);
    expect(panel.width).toBeGreaterThan(0);
    expect(panel.height).toBeGreaterThan(0);
  }
  for (const text of ["회원", "주문", "손님", "서버", "주문 요청", "주문 접수"])
    expect(result.text).toContain(text);
  expect(result.probe).toEqual({
    registrations: 0,
    setterCalls: 0,
    getterCalls: 0,
    descriptorUnchanged: true,
    temporary: 0,
  });
  expect(requests).toContain(runtimeUrl);
  expect(requests).toContain(moduleUrl);
  expect(pageErrors).toEqual([]);
});

for (const [failure, url] of [
  ["external bridge", runtimeUrl],
  ["Mermaid module import", moduleUrl],
] as const) {
  test(`${failure} failure and syntax errors recover under the same readonly AMD loader`, async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await openAmdDocument(page);
    await page.route(url, (route) => route.abort());
    const failed = await page.evaluate(
      async (source) => {
        const sdk = await import("/sdk/comic-gen.render.js");
        const output = await sdk.renderPanelsAsync(source);
        return { output, probe: window.__comicAmdProbe() };
      },
      comic([classSource]),
    );
    expect(failed.output.svg).toBe("");
    expect(failed.output.diagnostics.join("\n")).toContain("컷 1.다이어그램");
    expect(failed.probe.temporary).toBe(0);
    await page.unroute(url);
    const recovered = await page.evaluate(
      async ({ valid, invalid }) => {
        const sdk = await import("/sdk/comic-gen.render.js");
        const first = await sdk.renderPanelsAsync(valid);
        const malformed = await sdk.renderComicAsync(invalid);
        const second = await sdk.renderPanelsAsync(valid);
        return {
          first: {
            diagnostics: first.diagnostics,
            panels: first.panels.length,
            svg: !!first.svg,
          },
          malformed,
          second: {
            diagnostics: second.diagnostics,
            panels: second.panels.length,
            svg: !!second.svg,
          },
          probe: window.__comicAmdProbe(),
        };
      },
      {
        valid: comic([classSource, sequenceSource]),
        invalid: comic(["classDiagram\nclass {"]),
      },
    );
    for (const output of [recovered.first, recovered.second])
      expect(output).toEqual({ diagnostics: [], panels: 2, svg: true });
    expect(recovered.malformed.svg).toBe("");
    expect(recovered.malformed.diagnostics.join("\n")).toContain(
      "컷 1.다이어그램",
    );
    expect(recovered.probe).toEqual({
      registrations: 0,
      setterCalls: 0,
      getterCalls: 0,
      descriptorUnchanged: true,
      temporary: 0,
    });
    expect(pageErrors).toEqual([]);
  });
}
