import type { Page } from "@playwright/test";
import type { Comic } from "../src/model";
import { test, expect } from "./mermaid-fixture";

const rendererModule = "/cdn/comic-gen.render.js";
const viewerModule = "/cdn/comic-gen.viewer.js";
const profiles = {
  planner: {
    role: "기획자",
    personality: "목적과 범위를 먼저 정리한다.",
    speechStyle: "고객의 관점에서 간결하게 묻는다.",
  },
  developer: {
    role: "개발자",
    personality: "근거와 구현 조건을 확인한다.",
    speechStyle: "구현 가능한 예를 들어 설명한다.",
  },
  reviewer: {
    role: "검증자",
    personality: "실패 조건을 빠짐없이 확인한다.",
    speechStyle: "확인할 조건을 짧게 나열한다.",
  },
};
const cast = {
  planner: {
    asset: "human",
    label: "기획자",
    persona: "planner",
    appearance: {
      skinColor: "#edc5a7",
      hairStyle: "bob",
      hairColor: "#463630",
      outfit: "jacket",
      outfitColor: "#ba6679",
      glasses: false,
    },
  },
  developer: {
    asset: "human",
    label: "개발자",
    persona: "developer",
    appearance: {
      skinColor: "#d6a780",
      hairStyle: "short",
      hairColor: "#2f343d",
      outfit: "hoodie",
      outfitColor: "#648ac0",
      glasses: true,
    },
  },
  reviewer: {
    asset: "human",
    label: "검증자",
    persona: "reviewer",
    appearance: {
      skinColor: "#f0d2b4",
      hairStyle: "long",
      hairColor: "#735640",
      outfit: "shirt",
      outfitColor: "#709568",
      glasses: false,
    },
  },
};
function meeting(title = "세 사람의 가입 기능 회의") {
  return {
    title,
    personas: profiles,
    cast,
    panels: [
      {
        actors: [
          { id: "planner", gesture: "point", holding: "request" },
          { id: "developer", expression: "confused" },
          "reviewer",
        ],
        dialogue: [
          {
            from: "planner",
            to: "developer",
            text: "회원 가입을 간단하게 만들어요.",
          },
        ],
      },
      {
        mode: "before",
        actors: [
          { id: "planner", gesture: null, holding: null },
          { id: "developer", expression: "happy", holding: "key" },
        ],
        dialogue: [
          {
            from: "developer",
            to: "reviewer",
            text: "중복 요청은 같은 결과를 돌려줄게요.",
          },
        ],
      },
      {
        mode: "before",
        actors: [
          { id: "developer", holding: null, gesture: "point" },
          { id: "reviewer", expression: "confused" },
        ],
        dialogue: [
          {
            from: "reviewer",
            to: "developer",
            text: "중복 요청과 시간 초과를 함께 확인해요.",
          },
        ],
      },
      {
        mode: "before",
        actors: [
          { id: "developer", gesture: null },
          { id: "reviewer", expression: "happy", gesture: "wave" },
        ],
        dialogue: [
          {
            from: "planner",
            to: "reviewer",
            text: "정상과 실패 조건을 합의했으니 구현해요.",
          },
        ],
        transfer: [{ from: "planner", to: "developer", prop: "request" }],
      },
    ],
  };
}
const source = (value: unknown) => JSON.stringify(value);
// Source, dimensions and historical digests captured from the fixed v0.5.0 SDK.
// The semantic regression below keeps this fixture independent of the CDN and scratch files,
// while allowing intentional artwork and canvas sizing redesigns. Historical heights and
// digests remain archival references rather than assertions.
const legacyBaseline = {
  version: "v0.5.0",
  source:
    '{"title":"Compatibility","cast":{"a":{"asset":"client","label":"A"},"b":{"asset":"server","label":"B"},"c":{"asset":"database","label":"C"}},"panels":[{"actors":[{"id":"a","expression":"happy"},{"id":"b","expression":"confused","holding":"data"},"c"],"dialogue":[{"from":"a","to":"b","text":"Hello!"},{"from":"b","to":"c","text":"Look at the data."}],"transfer":[{"from":"b","to":"c","prop":"data"}]},{"mode":"before","actors":[{"id":"a","expression":"sad","gesture":null},{"id":"b","expression":"angry","holding":null},{"id":"c","expression":"happy"}],"dialogue":[{"from":"c","to":"a","text":"Ready."}]}]}',
  cases: [
    {
      options: {
        width: 480,
        panelFormat: "compact",
      },
      svgHash:
        "e4156960d9c59fdaf165f7c13d8cd17b90cf80e3df6325e9070104bb8acb002c",
      panels: [
        {
          svgHash:
            "39e739f53d6193ec0bc38fc770abcdc5770d7d18a736203386594750bd28b532",
          width: 480,
          height: 540,
        },
        {
          svgHash:
            "a4963efcd19866185f54797daeb21c9ff80a1d45c977b076e97fef1a015f8773",
          width: 480,
          height: 453,
        },
      ],
    },
    {
      options: {
        width: 480,
        panelFormat: "phone",
      },
      svgHash:
        "16ae2d02f40c54e4950d243e834e50bc9330fb015d4fd4a36dbce1485647431c",
      panels: [
        {
          svgHash:
            "0a4a1030b9e365d182f24910de288850f6c80cebe4df3196e03c3aae61cb9c5b",
          width: 480,
          height: 1080,
        },
        {
          svgHash:
            "57633d93eab55a2d45c4bc50c1a658f555d7218b2ff42d58ceb82922894c4a73",
          width: 480,
          height: 906,
        },
      ],
    },
    {
      options: {
        width: 720,
        panelFormat: "compact",
      },
      svgHash:
        "4381e7d3bf749091868d6310f25ed7de05a125f92be07b08ccc61eb18cc3e8e6",
      panels: [
        {
          svgHash:
            "d9fbbad129d815cb4a9ebdf467b795a44973e9d31df8d5f82eb5754edd546c73",
          width: 720,
          height: 540,
        },
        {
          svgHash:
            "4d1881c2c12a562de7b9263894c75bd01b0d65ed716ebc3bbd8f521e46ed4098",
          width: 720,
          height: 453,
        },
      ],
    },
    {
      options: {
        width: 720,
        panelFormat: "phone",
      },
      svgHash:
        "6ffd0059fe8380c8b3c2cf0d8c326265fb76a8dd5437eab81c5090cae1d5b0a7",
      panels: [
        {
          svgHash:
            "a33beb914599521ebaa1d7cc96e3ceff7a76473f069472289439aabae0739b8c",
          width: 720,
          height: 1080,
        },
        {
          svgHash:
            "6fb19f0d2b9506e3f2a91887bae5f64b3a655f26bc977891d75f38d2ac8810e4",
          width: 720,
          height: 906,
        },
      ],
    },
    {
      options: {
        width: 960,
        panelFormat: "compact",
      },
      svgHash:
        "ff9f676de28cccff8c76616e0210beae816edbd745b3b385ebc06094454abed9",
      panels: [
        {
          svgHash:
            "a1e9c68f98b62d20fc4df6185de81bb73f166d1b91c205b9a64a658b0d422af1",
          width: 960,
          height: 540,
        },
        {
          svgHash:
            "b7cd488a9c15fb6842003c22d3408393519f5044667c783b3475f70b5feb5c68",
          width: 960,
          height: 453,
        },
      ],
    },
    {
      options: {
        width: 960,
        panelFormat: "phone",
      },
      svgHash:
        "6cd947b708ad031cafd4ab7af5d2a4b8e719c0254915c435d39cebff9bead5fe",
      panels: [
        {
          svgHash:
            "155c0597c24e8bb66c72725c17a36ccf3267afad1cd64be6748f49e01c102b2e",
          width: 960,
          height: 1080,
        },
        {
          svgHash:
            "b6f55ddd8119bea5103352d367ea19d682dcefa1242340bf43e9c59d8492c4d1",
          width: 960,
          height: 906,
        },
      ],
    },
  ],
};
async function openDocument(page: Page) {
  await page.route("**/persona-characters-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>body{margin:0}main{width:max-content}main>svg{display:block}</style></head><body><main></main></body></html>',
    }),
  );
  await page.goto("/persona-characters-test.html");
}

test("Korean and English definitions resolve reusable persona metadata separately from fully defaulted human appearance", async ({
  page,
}) => {
  await openDocument(page);
  const english = {
    title: "정의 확인",
    personas: { planner: profiles.planner },
    cast: {
      a: {
        asset: "human",
        label: "기획자",
        persona: "planner",
        appearance: {
          skinColor: "#F0C",
          hairStyle: "bob",
          hairColor: "#4a3530",
          outfit: "jacket",
          outfitColor: "#5577AA",
          glasses: true,
        },
      },
      b: {
        asset: "human",
        label: "개발자",
        persona: { role: "개발자", speechStyle: "검증 결과를 짧게 설명한다." },
      },
      c: { asset: "human", persona: { personality: "차분하다." } },
    },
    panels: [{ actors: ["a", "b", "c"] }],
  };
  const korean = {
    제목: "정의 확인",
    페르소나: {
      planner: {
        직무: profiles.planner.role,
        성격: profiles.planner.personality,
        말투: profiles.planner.speechStyle,
      },
    },
    등장인물: {
      a: {
        그림: "사람",
        이름표: "기획자",
        페르소나: "planner",
        외형: {
          피부색: "#F0C",
          머리모양: "단발",
          머리색: "#4a3530",
          옷: "재킷",
          옷색: "#5577AA",
          안경: true,
        },
      },
      b: {
        그림: "사람",
        이름표: "개발자",
        페르소나: { 직무: "개발자", 말투: "검증 결과를 짧게 설명한다." },
      },
      c: { 그림: "사람", 페르소나: { 성격: "차분하다." } },
    },
    컷: [{ 인물: ["a", "b", "c"] }],
  };
  const result = await page.evaluate(
    async ({ english, korean, rendererModule }) => {
      const { readComic } = await import("/src/parse.ts");
      const sdk = await import(rendererModule);
      const en = readComic(english),
        ko = readComic(korean);
      const outputs = [
        sdk.renderPanels(english),
        await sdk.renderPanelsAsync(korean),
      ];
      return {
        en,
        ko,
        sameSvg: outputs[0].svg === outputs[1].svg,
        diagnostics: outputs.map((output) => output.diagnostics),
      };
    },
    { english: source(english), korean: source(korean), rendererModule },
  );
  expect(result.ko).toEqual(result.en);
  expect(result.en.cast.a.persona).toEqual(profiles.planner);
  expect(result.en.cast.b.persona).toEqual({
    role: "개발자",
    speechStyle: "검증 결과를 짧게 설명한다.",
  });
  expect(result.en.cast.b.appearance).toEqual({
    skinColor: "#f0c8a6",
    hairStyle: "short",
    hairColor: "#47362f",
    outfit: "shirt",
    outfitColor: "#647bd6",
    glasses: false,
  });
  expect(result.en.cast.c.persona).toEqual({ personality: "차분하다." });
  expect(result.sameSvg).toBe(true);
  expect(result.diagnostics).toEqual([[], []]);
});

test("public rendering rejects invalid profiles, references, appearance and conflicting aliases while accepting documented limits", async ({
  page,
}) => {
  await openDocument(page);
  const base = { cast: { a: { asset: "human" } }, panels: [{ actors: ["a"] }] };
  const member = (patch: Record<string, unknown>) => ({
    ...base,
    cast: { a: { ...base.cast.a, ...patch } },
  });
  const invalid = [
    member({ persona: {} }),
    member({ persona: null }),
    member({ persona: 1 }),
    member({ persona: [] }),
    member({ persona: "missing" }),
    member({ persona: { role: " " } }),
    member({ persona: { role: "역".repeat(101) } }),
    member({ persona: { personality: "성".repeat(301) } }),
    member({ persona: { speechStyle: "말".repeat(301) } }),
    member({ persona: { role: true } }),
    member({ persona: { role: "기획자", appearance: { hairStyle: "bob" } } }),
    member({ persona: { role: "기획자", 직무: "개발자" } }),
    { ...base, personas: { a: "b", b: "a" } },
    { ...base, personas: { a: { role: "기획자", extends: "b" } } },
    { ...base, personas: { a: [] } },
    { cast: { a: { persona: { role: "기획자" } } }, panels: base.panels },
    member({ appearance: null }),
    member({ appearance: [] }),
    member({ appearance: "short" }),
    member({ appearance: { glasses: "true" } }),
    member({ appearance: { hairStyle: "curly" } }),
    member({ appearance: { outfit: "coat" } }),
    member({ appearance: { skinColor: "red" } }),
    member({ appearance: { hairColor: "#12" } }),
    member({ appearance: { outfitColor: "#gggggg" } }),
    ...["skinColor", "hairColor", "outfitColor"].flatMap((field) =>
      ["#fff\n", "#ffffff\n"].map((value) =>
        member({ appearance: { [field]: value } }),
      ),
    ),
    member({
      appearance: { skinColor: "url(https://persona-unsafe.invalid/skin.svg)" },
    }),
    member({ appearance: { hairStyle: "short", 머리모양: "단발" } }),
    member({ appearance: { role: "검증자" } }),
    { cast: { a: { asset: "server", appearance: {} } }, panels: base.panels },
    {
      ...base,
      panels: [{ actors: [{ id: "a", persona: { role: "기획자" } }] }],
    },
  ].map(source);
  const requests: string[] = [];
  page.on("request", (request) => {
    if (request.url().includes("persona-unsafe.invalid"))
      requests.push(request.url());
  });
  const result = await page.evaluate(
    async ({ invalid, rendererModule, valid }) => {
      const sdk = await import(rendererModule);
      const { readComic } = await import("/src/parse.ts");
      return {
        rejected: invalid.map((code) => {
          try {
            readComic(code);
            return false;
          } catch {
            return true;
          }
        }),
        invalid: invalid.map((code) => sdk.renderPanels(code)),
        valid: sdk.renderPanels(valid),
      };
    },
    {
      invalid,
      rendererModule,
      valid: source(
        member({
          persona: {
            role: "역".repeat(100),
            personality: "성".repeat(300),
            speechStyle: "말".repeat(300),
          },
          appearance: {
            skinColor: "#ABC",
            hairColor: "#000000",
            outfitColor: "#123456",
            hairStyle: "bald",
            outfit: "shirt",
            glasses: false,
          },
        }),
      ),
    },
  );
  expect(result.rejected.every(Boolean)).toBe(true);
  for (const output of result.invalid) {
    expect(output.svg).toBe("");
    expect(output.panels).toEqual([]);
    expect(output.diagnostics.length).toBeGreaterThan(0);
  }
  expect(result.valid.diagnostics).toEqual([]);
  expect(result.valid.panels).toHaveLength(1);
  expect(requests).toEqual([]);
});

test("one cast can be reused across stories without sharing mutable catalog profiles or appearance defaults", async ({
  page,
}) => {
  await openDocument(page);
  const result = await page.evaluate(
    async ({ cast, profiles, rendererModule }) => {
      const sdk = await import(rendererModule);
      const { readComic } = await import("/src/parse.ts");
      const freeze = (value) => {
        for (const item of Object.values(value))
          if (item && typeof item === "object") freeze(item);
        return Object.freeze(value);
      };
      const reusable = freeze(structuredClone({ cast, personas: profiles }));
      const before = JSON.stringify(reusable);
      const comic = (text) =>
        JSON.stringify({
          ...reusable,
          title: "같은 등장인물",
          panels: [
            {
              actors: ["planner", "developer"],
              dialogue: [{ from: "planner", to: "developer", text }],
            },
          ],
        });
      const firstSource = comic("회원 가입을 검토해요."),
        secondSource = comic("장바구니를 검토해요.");
      const outputs = [
        sdk.renderPanels(firstSource),
        sdk.renderPanels(secondSource),
      ];
      const portraits = outputs.map((output) =>
        [
          ...new DOMParser()
            .parseFromString(output.svg, "image/svg+xml")
            .querySelectorAll("[data-human]"),
        ].map((node) => new XMLSerializer().serializeToString(node)),
      );
      const sameReferenceSource = JSON.stringify({
        personas: profiles,
        cast: {
          a: { asset: "human", persona: "planner" },
          b: { asset: "human", persona: "planner" },
        },
        panels: [{ actors: ["a", "b"] }],
      });
      const parsed = readComic(sameReferenceSource);
      parsed.cast.a.persona.role = "바뀐 직무";
      parsed.cast.a.appearance.hairColor = "#ffffff";
      const independent = readComic(sameReferenceSource);
      return {
        diagnostics: outputs.map((output) => output.diagnostics),
        portraits,
        storiesDiffer: outputs[0].svg !== outputs[1].svg,
        presetsUnchanged: before === JSON.stringify(reusable),
        catalog: parsed.personas.planner,
        otherMember: parsed.cast.b,
        independent: independent.cast.a,
      };
    },
    { cast, profiles, rendererModule },
  );
  expect(result.diagnostics).toEqual([[], []]);
  expect(result.portraits[0]).toHaveLength(2);
  expect(result.portraits[1]).toEqual(result.portraits[0]);
  expect(result.storiesDiffer).toBe(true);
  expect(result.presetsUnchanged).toBe(true);
  expect(result.catalog).toEqual(profiles.planner);
  expect(result.otherMember.persona).toEqual(profiles.planner);
  expect(result.independent.persona).toEqual(profiles.planner);
  expect(result.otherMember.appearance.hairColor).toBe("#47362f");
  expect(result.independent.appearance.hairColor).toBe("#47362f");
});

test("persona-only edits preserve SVG and cache, while appearance edits refresh only cuts that use that cast member", async ({
  page,
}) => {
  await openDocument(page);
  const value = {
    title: "등장인물 캐시",
    personas: profiles,
    cast: { ...cast, spare: { asset: "human", persona: "planner" } },
    panels: [
      {
        actors: ["planner"],
        dialogue: [{ from: "planner", text: "범위를 정해요." }],
      },
      {
        actors: ["developer"],
        dialogue: [{ from: "developer", text: "조건을 구현해요." }],
      },
      {
        actors: ["planner", "reviewer"],
        dialogue: [{ from: "reviewer", text: "조건을 검증해요." }],
      },
    ],
  };
  const result = await page.evaluate(
    async ({ value, rendererModule }) => {
      const sdk = await import(rendererModule),
        renderer = sdk.createRenderer();
      const first = renderer.renderPanels(JSON.stringify(value), {
        panelFormat: "compact",
      });
      const metadata = structuredClone(value);
      metadata.personas.planner.role = "프로덕트 기획자";
      metadata.personas.planner.personality = "목표를 확인하고 근거를 남긴다.";
      metadata.personas.planner.speechStyle = "합의한 범위를 짧게 설명한다.";
      const changedMetadata = renderer.renderPanels(JSON.stringify(metadata), {
        panelFormat: "compact",
      });
      const appearance = structuredClone(metadata);
      appearance.cast.planner.appearance.hairColor = "#995522";
      const changedAppearance = renderer.renderPanels(
        JSON.stringify(appearance),
        { panelFormat: "compact" },
      );
      const unused = structuredClone(appearance);
      unused.cast.spare.appearance = { outfitColor: "#ffffff" };
      const changedUnused = renderer.renderPanels(JSON.stringify(unused), {
        panelFormat: "compact",
      });
      return {
        diagnostics: [
          first,
          changedMetadata,
          changedAppearance,
          changedUnused,
        ].map((output) => output.diagnostics),
        caches: [first, changedMetadata, changedAppearance, changedUnused].map(
          (output) => output.cache,
        ),
        sameMetadata: first.svg === changedMetadata.svg,
        sameUnused: changedAppearance.svg === changedUnused.svg,
        changedPanels: first.panels.map(
          (panel, index) => panel.svg !== changedAppearance.panels[index].svg,
        ),
      };
    },
    { value, rendererModule },
  );
  expect(result.diagnostics).toEqual([[], [], [], []]);
  expect(result.caches.map(({ hits, misses }) => ({ hits, misses }))).toEqual([
    { hits: 0, misses: 3 },
    { hits: 3, misses: 0 },
    { hits: 1, misses: 2 },
    { hits: 3, misses: 0 },
  ]);
  expect(result.sameMetadata).toBe(true);
  expect(result.sameUnused).toBe(true);
  expect(result.changedPanels).toEqual([true, false, true]);
});

test("released icon stories preserve cut order, dimensions, identities, expressions, dialogue and prop transfer through artwork redesigns", async ({
  page,
}) => {
  await openDocument(page);
  const rendered = await page.evaluate(
    async ({ rendererModule, baseline }) => {
      const sdk = await import(rendererModule);
      const parserModule = "/src/parse.ts";
      const { readComic } = await import(parserModule);
      const parsed: Comic = readComic(baseline.source);
      await document.fonts.ready;
      const inspect = (svg: string) => {
        document.querySelector("main")!.innerHTML = svg;
        const root = document.querySelector("main>svg")!;
        const contains = (outer: DOMRect, inner: DOMRect) =>
          inner.width > 0 &&
          inner.height > 0 &&
          inner.left >= outer.left - 1 &&
          inner.right <= outer.right + 1 &&
          inner.top >= outer.top - 1 &&
          inner.bottom <= outer.bottom + 1;
        const cuts = [...root.querySelectorAll("g[data-panel]")].map((cut) => {
          const frameNode = cut.querySelector("rect")!;
          const frame = frameNode.getBoundingClientRect();
          const actors = [...cut.querySelectorAll("[data-character]")].map(
            (actor) => {
              const face = actor.querySelector("[data-face]")!;
              const label = actor.querySelector(":scope > text")!;
              const body = [...actor.children]
                .filter(
                  (node) =>
                    node.localName !== "text" &&
                    ![
                      "data-face",
                      "data-arm",
                      "data-hand",
                      "data-gesture",
                      "data-holding",
                    ].some((attribute) => node.hasAttribute(attribute)),
                )
                .map((node) => node.outerHTML)
                .join("");
              return {
                id: actor.getAttribute("data-character"),
                label: label.textContent,
                expression: face.getAttribute("data-face"),
                face: face.innerHTML,
                body,
                gestures: [...actor.querySelectorAll("[data-gesture]")].map(
                  (node) => node.getAttribute("data-gesture"),
                ),
                holding: [...actor.querySelectorAll("[data-holding]")].map(
                  (node) => node.getAttribute("data-holding"),
                ),
                contained: contains(frame, actor.getBoundingClientRect()),
                visibleFace: contains(frame, face.getBoundingClientRect()),
                visibleLabel: contains(frame, label.getBoundingClientRect()),
              };
            },
          );
          const hands = [...cut.querySelectorAll("[data-hand]")].map((hand) => {
            const palm = hand.querySelector(
              "path[data-palm], [data-palm] path",
            );
            return {
              id: hand
                .closest("[data-character]")
                ?.getAttribute("data-character"),
              kind: hand.getAttribute("data-hand"),
              side: hand.getAttribute("data-side"),
              fill: palm?.getAttribute("fill"),
              visiblePalm:
                !!palm && contains(frame, palm.getBoundingClientRect()),
            };
          });
          const transfers = [...cut.querySelectorAll("[data-transfer]")].map(
            (relation) => {
              const link = relation.querySelector<SVGPathElement>(
                "[data-transfer-link]",
              );
              const from = relation.getAttribute("data-transfer")!;
              const to = relation.getAttribute("data-to")!;
              const connected = (id: string, end: boolean) => {
                const actor = [
                  ...cut.querySelectorAll("[data-character]"),
                ].find((actor) => actor.getAttribute("data-character") === id);
                const hand = [
                  ...(actor?.querySelectorAll("[data-hand]") ?? []),
                ].find(
                  (node) =>
                    node.getAttribute("data-side") === (end ? "left" : "right"),
                );
                const palm = hand?.querySelector(
                  "path[data-palm], [data-palm] path",
                );
                if (!link || !actor || !link.getScreenCTM()) return false;
                const local = link.getPointAtLength(
                  end ? link.getTotalLength() : 0,
                );
                const screen = link.getScreenCTM()!;
                const point = new DOMPoint(local.x, local.y).matrixTransform(
                  screen,
                );
                const near = (bounds: DOMRect, gap: number) =>
                  point.x >= bounds.left - gap &&
                  point.x <= bounds.right + gap &&
                  point.y >= bounds.top - gap &&
                  point.y <= bounds.bottom + gap;
                // Links stop in a small gap beside a hand; an icon without a
                // hand on that side receives at the edge of its body.
                if (palm)
                  return near(palm.getBoundingClientRect(), 14 * screen.a);
                const body = actor
                  .querySelector(
                    ":scope > rect, :scope > circle, :scope > path",
                  )!
                  .getBoundingClientRect();
                return near(body, 16 * screen.a) && !near(body, 0);
              };
              return {
                from,
                to,
                props: [...relation.querySelectorAll("[data-prop]")].map(
                  (node) => node.getAttribute("data-prop"),
                ),
                connectedFrom: connected(from, false),
                connectedTo: connected(to, true),
              };
            },
          );
          const bounds = [...cut.querySelectorAll("[data-character]")].map(
            (actor) => actor.getBoundingClientRect(),
          );
          return {
            index: Number(cut.getAttribute("data-panel")),
            frame: {
              width: Number(frameNode.getAttribute("width")),
              height: Number(frameNode.getAttribute("height")),
            },
            actors,
            ordered: bounds.every(
              (actor, index) =>
                index === 0 ||
                actor.left + actor.right >
                  bounds[index - 1].left + bounds[index - 1].right,
            ),
            overlap: bounds.some((actor, index) =>
              bounds
                .slice(index + 1)
                .some(
                  (other) =>
                    Math.min(actor.right, other.right) >
                      Math.max(actor.left, other.left) &&
                    Math.min(actor.bottom, other.bottom) >
                      Math.max(actor.top, other.top),
                ),
            ),
            dialogue: [...cut.querySelectorAll("[data-dialogue]")].map(
              (line) => ({
                from: line.getAttribute("data-dialogue"),
                to: line.getAttribute("data-to"),
                text: line.querySelector("text")!.textContent,
                fontSize: Number(
                  line.querySelector("text")!.getAttribute("font-size"),
                ),
                contained: contains(frame, line.getBoundingClientRect()),
              }),
            ),
            hands,
            props: [...cut.querySelectorAll("[data-prop]")].map((node) => ({
              prop: node.getAttribute("data-prop"),
              holding:
                node.closest("[data-holding]")?.getAttribute("data-holding") ??
                null,
              actor:
                node
                  .closest("[data-character]")
                  ?.getAttribute("data-character") ?? null,
              from:
                node
                  .closest("[data-transfer]")
                  ?.getAttribute("data-transfer") ?? null,
              to:
                node.closest("[data-transfer]")?.getAttribute("data-to") ??
                null,
              contained: contains(frame, node.getBoundingClientRect()),
            })),
            transfers,
            humanCount: cut.querySelectorAll("[data-human]").length,
          };
        });
        return {
          title: root.querySelector("title")!.textContent,
          width: Number(root.getAttribute("width")),
          height: Number(root.getAttribute("height")),
          viewBox: root.getAttribute("viewBox"),
          cuts,
        };
      };
      const cases = [];
      for (const fixture of baseline.cases) {
        const output = sdk.renderPanels(baseline.source, fixture.options);
        if (output.diagnostics.length)
          throw new Error(output.diagnostics.join("\n"));
        cases.push({
          options: fixture.options,
          width: output.width,
          height: output.height,
          whole: inspect(output.svg),
          panels: output.panels.map((panel) => ({
            index: panel.index,
            width: panel.width,
            height: panel.height,
            diagnostics: panel.diagnostics,
            svg: inspect(panel.svg),
          })),
        });
      }
      return { parsed, cases };
    },
    { rendererModule, baseline: legacyBaseline },
  );
  expect(rendered.parsed.title).toBe("Compatibility");
  expect(rendered.parsed.cast).toEqual({
    a: { asset: "client", label: "A" },
    b: { asset: "server", label: "B" },
    c: { asset: "database", label: "C" },
  });
  expect(
    rendered.parsed.panels.map((panel) =>
      panel.actors.map(({ id, expression, gesture, holding, scale }) => ({
        id,
        expression,
        gesture,
        holding,
        scale,
      })),
    ),
  ).toEqual([
    [
      {
        id: "a",
        expression: "happy",
        gesture: undefined,
        holding: undefined,
        scale: 1,
      },
      {
        id: "b",
        expression: "confused",
        gesture: undefined,
        holding: "data",
        scale: 1,
      },
      {
        id: "c",
        expression: "neutral",
        gesture: undefined,
        holding: undefined,
        scale: 1,
      },
    ],
    [
      {
        id: "a",
        expression: "sad",
        gesture: undefined,
        holding: undefined,
        scale: 1,
      },
      {
        id: "b",
        expression: "angry",
        gesture: undefined,
        holding: undefined,
        scale: 1,
      },
      {
        id: "c",
        expression: "happy",
        gesture: undefined,
        holding: undefined,
        scale: 1,
      },
    ],
  ]);
  expect(rendered.parsed.panels.map((panel) => panel.transfer)).toEqual([
    [{ from: "b", to: "c", prop: "data" }],
    [],
  ]);
  expect(rendered.cases).toHaveLength(legacyBaseline.cases.length);
  for (const [caseIndex, output] of rendered.cases.entries()) {
    const fixture = legacyBaseline.cases[caseIndex];
    const height = output.panels.reduce(
      (sum: number, panel: { height: number }) => sum + panel.height - 92 + 24,
      68,
    );
    expect(output.options).toEqual(fixture.options);
    expect(output.width).toBe(fixture.options.width);
    expect(Number.isSafeInteger(output.height)).toBe(true);
    expect(output.height).toBeGreaterThan(0);
    expect(output.height).toBe(height);
    expect(output.whole).toMatchObject({
      title: "Compatibility",
      width: fixture.options.width,
      height,
      viewBox: `0 0 ${fixture.options.width} ${height}`,
    });
    expect(output.whole.cuts).toHaveLength(2);
    expect(output.panels).toHaveLength(2);
    for (const [index, panel] of output.panels.entries()) {
      const { width, height } = panel;
      expect(width).toBe(fixture.options.width);
      expect(Number.isSafeInteger(height)).toBe(true);
      expect(height).toBeGreaterThan(92);
      expect(panel).toMatchObject({ index, width, height, diagnostics: [] });
      expect(panel.svg).toMatchObject({
        title: `Compatibility · ${index + 1}/2`,
        width,
        height,
        viewBox: `0 0 ${panel.width} ${panel.height}`,
      });
      expect(panel.svg.cuts).toHaveLength(1);
      expect(panel.svg.cuts[0].frame).toEqual({
        width: width - 40,
        height: height - 92,
      });
      expect(panel.svg.cuts).toEqual([output.whole.cuts[index]]);
    }
    if (output.options.panelFormat === "phone") {
      const compact = rendered.cases.find(
        (item) =>
          item.options.width === output.options.width &&
          item.options.panelFormat === "compact",
      )!;
      expect(output.whole.cuts.map((cut) => cut.frame.height)).toEqual(
        compact.whole.cuts.map((cut) => cut.frame.height * 2 + 92),
      );
    }
    expect(output.whole.cuts.map((cut) => cut.index)).toEqual([0, 1]);
    expect(
      output.whole.cuts.map((cut) =>
        cut.actors.map(({ id, label, expression, gestures, holding }) => ({
          id,
          label,
          expression,
          gestures,
          holding,
        })),
      ),
    ).toEqual([
      [
        { id: "a", label: "A", expression: "happy", gestures: [], holding: [] },
        {
          id: "b",
          label: "B",
          expression: "confused",
          gestures: [],
          holding: ["data"],
        },
        {
          id: "c",
          label: "C",
          expression: "neutral",
          gestures: [],
          holding: [],
        },
      ],
      [
        { id: "a", label: "A", expression: "sad", gestures: [], holding: [] },
        { id: "b", label: "B", expression: "angry", gestures: [], holding: [] },
        { id: "c", label: "C", expression: "happy", gestures: [], holding: [] },
      ],
    ]);
    expect(output.whole.cuts.map((cut) => cut.dialogue)).toEqual([
      [
        { from: "a", to: "b", text: "Hello!", fontSize: 18, contained: true },
        {
          from: "b",
          to: "c",
          text: "Look at the data.",
          fontSize: 18,
          contained: true,
        },
      ],
      [{ from: "c", to: "a", text: "Ready.", fontSize: 18, contained: true }],
    ]);
    expect(output.whole.cuts.map((cut) => cut.hands)).toEqual([
      [
        {
          id: "b",
          kind: "holding",
          side: "right",
          fill: "white",
          visiblePalm: true,
        },
        // Icons receive at the body edge without drawing an empty fist.
      ],
      [],
    ]);
    expect(
      output.whole.cuts.map((cut) =>
        [...cut.props].sort((left, right) => {
          const first = JSON.stringify([
            left.actor,
            left.holding,
            left.from,
            left.to,
            left.prop,
          ]);
          const second = JSON.stringify([
            right.actor,
            right.holding,
            right.from,
            right.to,
            right.prop,
          ]);
          return first === second ? 0 : first < second ? -1 : 1;
        }),
      ),
    ).toEqual([
      [
        {
          prop: "data",
          holding: "data",
          actor: "b",
          from: null,
          to: null,
          contained: true,
        },
        {
          prop: "data",
          holding: null,
          actor: null,
          from: "b",
          to: "c",
          contained: true,
        },
      ],
      [],
    ]);
    expect(output.whole.cuts.map((cut) => cut.transfers)).toEqual([
      [
        {
          from: "b",
          to: "c",
          props: ["data"],
          connectedFrom: true,
          connectedTo: true,
        },
      ],
      [],
    ]);
    const faces = new Map<string | null, string>();
    for (const cut of output.whole.cuts) {
      expect(cut.humanCount).toBe(0);
      expect(cut.ordered).toBe(true);
      expect(cut.overlap).toBe(false);
      expect(new Set(cut.actors.map((actor) => actor.body)).size).toBe(3);
      for (const actor of cut.actors) {
        expect(actor.contained).toBe(true);
        expect(actor.visibleFace).toBe(true);
        expect(actor.visibleLabel).toBe(true);
        expect(actor.body.length).toBeGreaterThan(0);
        expect(actor.face.length).toBeGreaterThan(0);
        if (faces.has(actor.expression))
          expect(actor.face).toBe(faces.get(actor.expression));
        faces.set(actor.expression, actor.face);
      }
    }
    expect(faces.size).toBe(5);
    expect(new Set(faces.values()).size).toBe(5);
    expect(output.whole.cuts[1].actors.map((actor) => actor.body)).toEqual(
      output.whole.cuts[0].actors.map((actor) => actor.body),
    );
  }
});

test("human appearance variants support inherited expressions, gestures and props as static SVG without loading Mermaid", async ({
  page,
}) => {
  await openDocument(page);
  const network: string[] = [];
  page.on("request", (request) => {
    if (!request.url().startsWith("http://127.0.0.1:"))
      network.push(request.url());
  });
  const variants = [
    {},
    { hairStyle: "bob", outfit: "jacket", glasses: true },
    {
      hairStyle: "long",
      outfit: "hoodie",
      hairColor: "#442211",
      skinColor: "#b88968",
      outfitColor: "#cdb071",
    },
    { hairStyle: "bald", outfit: "shirt", glasses: true },
  ];
  const result = await page.evaluate(
    async ({ rendererModule, variants, meeting }) => {
      const sdk = await import(rendererModule);
      const variantsOutput = variants.map((appearance) => {
        const output = sdk.renderPanels(
          JSON.stringify({
            cast: { a: { asset: "human", appearance } },
            panels: [{ actors: ["a"] }],
          }),
          { panelFormat: "compact" },
        );
        const xml = new DOMParser().parseFromString(
          output.svg,
          "image/svg+xml",
        );
        return {
          diagnostics: output.diagnostics,
          human: xml.querySelector("[data-human]")?.outerHTML,
          hair: xml
            .querySelector("[data-human]")
            ?.getAttribute("data-hair-style"),
          outfit: xml
            .querySelector("[data-human]")
            ?.getAttribute("data-outfit"),
          glasses: xml.querySelectorAll('[data-human-part="glasses"]').length,
        };
      });
      const renderer = sdk.createRenderer();
      const sync = renderer.renderPanels(meeting, { panelFormat: "compact" });
      const asyncOutput = await renderer.renderPanelsAsync(meeting, {
        panelFormat: "compact",
      });
      const xml = new DOMParser().parseFromString(sync.svg, "image/svg+xml");
      const cuts = [...xml.querySelectorAll("g[data-panel]")].map((cut) => ({
        actors: [...cut.querySelectorAll("[data-character]")].map((actor) =>
          actor.getAttribute("data-character"),
        ),
        gestures: [...cut.querySelectorAll("[data-gesture]")].map((node) =>
          node.getAttribute("data-gesture"),
        ),
        holding: [...cut.querySelectorAll("[data-holding]")].map((node) =>
          node.getAttribute("data-holding"),
        ),
        faces: Object.fromEntries(
          [...cut.querySelectorAll("[data-character]")].map((actor) => [
            actor.getAttribute("data-character"),
            actor.querySelector("[data-face]")!.innerHTML,
          ]),
        ),
        expressions: Object.fromEntries(
          [...cut.querySelectorAll("[data-character]")].map((actor) => [
            actor.getAttribute("data-character"),
            actor.querySelector("[data-face]")!.getAttribute("data-face"),
          ]),
        ),
        hands: [...cut.querySelectorAll("[data-hand]")].map((node) => {
          const actor = node.closest("[data-character]");
          const palm = node.querySelector("path[data-palm], [data-palm] path");
          return {
            id: actor!.getAttribute("data-character")!,
            kind: node.getAttribute("data-hand"),
            fill: palm?.getAttribute("fill"),
            palm: palm?.localName,
          };
        }),
        humanCount: cut.querySelectorAll("[data-human]").length,
      }));
      const forbidden = xml.querySelectorAll(
        "script,style,foreignObject,image,iframe,a,animate,animateTransform",
      ).length;
      const events = [...xml.querySelectorAll("*")].flatMap((node) =>
        [...node.attributes]
          .filter((attribute) => /^on/i.test(attribute.name))
          .map((attribute) => attribute.name),
      );
      return {
        variants: variantsOutput,
        cuts,
        diagnostics: [sync.diagnostics, asyncOutput.diagnostics],
        exactAsync: sync.svg === asyncOutput.svg,
        forbidden,
        events,
      };
    },
    { rendererModule, variants, meeting: source(meeting()) },
  );
  expect(result.variants.map((variant) => variant.diagnostics)).toEqual([
    [],
    [],
    [],
    [],
  ]);
  expect(result.variants.map((variant) => variant.hair)).toEqual([
    "short",
    "bob",
    "long",
    "bald",
  ]);
  expect(result.variants.map((variant) => variant.outfit)).toEqual([
    "shirt",
    "jacket",
    "hoodie",
    "shirt",
  ]);
  expect(result.variants.map((variant) => variant.glasses)).toEqual([
    0, 1, 0, 1,
  ]);
  expect(new Set(result.variants.map((variant) => variant.human)).size).toBe(4);
  expect(result.diagnostics).toEqual([[], []]);
  expect(result.exactAsync).toBe(true);
  expect(
    result.cuts.every(
      (cut) =>
        cut.humanCount === 3 &&
        cut.actors.join() === "planner,developer,reviewer",
    ),
  ).toBe(true);
  expect(result.cuts.map((cut) => cut.gestures)).toEqual([
    ["point"],
    [],
    ["point"],
    ["wave"],
  ]);
  expect(result.cuts.map((cut) => cut.holding)).toEqual([
    ["request"],
    ["key"],
    [],
    [],
  ]);
  expect(result.cuts.map((cut) => cut.expressions)).toEqual([
    { planner: "neutral", developer: "confused", reviewer: "neutral" },
    { planner: "neutral", developer: "happy", reviewer: "neutral" },
    { planner: "neutral", developer: "happy", reviewer: "confused" },
    { planner: "neutral", developer: "happy", reviewer: "happy" },
  ]);
  expect(result.cuts[0].faces.developer).not.toBe(
    result.cuts[1].faces.developer,
  );
  expect(result.cuts[1].faces.developer).toBe(result.cuts[2].faces.developer);
  expect(result.cuts[0].faces.reviewer).not.toBe(result.cuts[2].faces.reviewer);
  expect(result.cuts[2].faces.reviewer).not.toBe(result.cuts[3].faces.reviewer);
  expect(
    result.cuts.map((cut) => cut.hands.map(({ id, kind }) => ({ id, kind }))),
  ).toEqual([
    [
      { id: "planner", kind: "point" },
      { id: "planner", kind: "holding" },
    ],
    [{ id: "developer", kind: "holding" }],
    [{ id: "developer", kind: "point" }],
    [
      { id: "planner", kind: "transfer" },
      { id: "developer", kind: "receive" },
      { id: "reviewer", kind: "wave" },
    ],
  ]);
  const skinById: Record<string, string> = Object.fromEntries(
    Object.entries(cast).map(([id, member]) => [
      id,
      member.appearance.skinColor,
    ]),
  );
  for (const cut of result.cuts)
    for (const hand of cut.hands) {
      expect(hand.palm).toBe("path");
      expect(hand.fill).toBe(skinById[hand.id]);
    }
  expect(result.forbidden).toBe(0);
  expect(result.events).toEqual([]);
  expect(network).toEqual([]);
});

test("three human characters and their Korean dialogue remain bounded at 480, 720 and 960 pixels, and full and single PNGs contain their artwork", async ({
  page,
}) => {
  await openDocument(page);
  const result = await page.evaluate(
    async ({ rendererModule, code }) => {
      const sdk = await import(rendererModule);
      await document.fonts.ready;
      const geometry = [];
      for (const width of [480, 720, 960])
        for (const panelFormat of ["compact", "phone"]) {
          const output = sdk.renderPanels(code, { width, panelFormat });
          document.querySelector("main").innerHTML = output.svg;
          const cuts = [...document.querySelectorAll("main g[data-panel]")].map(
            (cut) => {
              const frame = cut.querySelector("rect").getBoundingClientRect();
              const actors = [...cut.querySelectorAll("[data-character]")].map(
                (node) => node.getBoundingClientRect(),
              );
              const texts = [
                ...cut.querySelectorAll(
                  "[data-dialogue] text,[data-character]>text",
                ),
              ].map((node) => {
                const bounds = node.getBoundingClientRect();
                return {
                  text: node.textContent,
                  declaredFont: Number(node.getAttribute("font-size")),
                  visible: bounds.width > 0 && bounds.height > 0,
                  contained:
                    bounds.left >= frame.left - 1 &&
                    bounds.right <= frame.right + 1 &&
                    bounds.top >= frame.top - 1 &&
                    bounds.bottom <= frame.bottom + 1,
                };
              });
              return {
                actorCount: actors.length,
                contained: actors.every(
                  (actor) =>
                    actor.left >= frame.left - 1 &&
                    actor.right <= frame.right + 1 &&
                    actor.top >= frame.top - 1 &&
                    actor.bottom <= frame.bottom + 1,
                ),
                overlap: actors.some((actor, index) =>
                  actors
                    .slice(index + 1)
                    .some(
                      (other) =>
                        Math.min(actor.right, other.right) >
                          Math.max(actor.left, other.left) &&
                        Math.min(actor.bottom, other.bottom) >
                          Math.max(actor.top, other.top),
                    ),
                ),
                texts,
              };
            },
          );
          geometry.push({
            width,
            panelFormat,
            diagnostics: output.diagnostics,
            cuts,
          });
        }
      const output = sdk.renderPanels(code, {
        width: 720,
        panelFormat: "phone",
      });
      const pngs = [];
      for (const rendering of [output, ...output.panels]) {
        document.querySelector("main").innerHTML = rendering.svg;
        const svgBounds = document
          .querySelector("main>svg")
          .getBoundingClientRect();
        const humanRegions = [
          ...document.querySelectorAll("main [data-human]"),
        ].map((node) => {
          const bounds = node.getBoundingClientRect();
          return {
            x: Math.floor(bounds.x - svgBounds.x),
            y: Math.floor(bounds.y - svgBounds.y),
            width: Math.ceil(bounds.width),
            height: Math.ceil(bounds.height),
          };
        });
        const blob = await sdk.exportPng(rendering),
          url = URL.createObjectURL(blob);
        try {
          const image = new Image();
          image.src = url;
          await image.decode();
          const canvas = document.createElement("canvas");
          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;
          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0);
          const colors = humanRegions.map(({ x, y, width, height }) => {
            const pixels = context.getImageData(x, y, width, height).data;
            let colored = 0,
              dark = 0;
            for (let i = 0; i < pixels.length; i += 4) {
              if (
                pixels[i + 3] > 0 &&
                Math.max(pixels[i], pixels[i + 1], pixels[i + 2]) -
                  Math.min(pixels[i], pixels[i + 1], pixels[i + 2]) >
                  25
              )
                colored++;
              if (
                pixels[i + 3] > 0 &&
                pixels[i] < 150 &&
                pixels[i + 1] < 150 &&
                pixels[i + 2] < 150
              )
                dark++;
            }
            return { colored, dark };
          });
          pngs.push({
            type: blob.type,
            bytes: blob.size,
            width: image.naturalWidth,
            height: image.naturalHeight,
            expectedHeight: rendering.height,
            colors,
          });
        } finally {
          URL.revokeObjectURL(url);
        }
      }
      return { geometry, pngs };
    },
    { rendererModule, code: source(meeting()) },
  );
  for (const output of result.geometry) {
    expect(output.diagnostics).toEqual([]);
    expect(output.cuts).toHaveLength(4);
    for (const cut of output.cuts) {
      expect(cut.actorCount).toBe(3);
      expect(cut.contained).toBe(true);
      expect(cut.overlap).toBe(false);
      expect(cut.texts.length).toBeGreaterThanOrEqual(4);
      for (const text of cut.texts) {
        expect(text.visible).toBe(true);
        expect(text.contained).toBe(true);
        expect(text.declaredFont).toBeGreaterThanOrEqual(16);
      }
    }
  }
  expect(result.pngs).toHaveLength(5);
  for (const png of result.pngs) {
    expect(png.type).toBe("image/png");
    expect(png.bytes).toBeGreaterThan(3000);
    expect(png.width).toBe(720);
    expect(png.height).toBe(Math.round(png.expectedHeight));
    expect(png.colors.length).toBeGreaterThanOrEqual(3);
    for (const region of png.colors) {
      expect(region.colored).toBeGreaterThan(200);
      expect(region.dark).toBeGreaterThan(50);
    }
  }
});

test("completed human and Mermaid stories work in the optional viewer with one-cut fit and readable zoom on desktop and mobile", async ({
  page,
}) => {
  await openDocument(page);
  const plain = meeting("사람과 UML을 함께 읽어요");
  const withDiagram = {
    ...plain,
    panels: [
      ...plain.panels,
      {
        mode: "before",
        dialogue: [
          {
            from: "developer",
            to: "reviewer",
            text: "가입 요청과 검증 결과를 이 구조로 표현해요.",
          },
        ],
        diagram: {
          type: "mermaid",
          source:
            'classDiagram\ndirection LR\nclass Member["회원"]\nclass Request["가입 요청"]\nMember --> Request : 접수',
          title: "가입 구조",
          height: 260,
        },
      },
    ],
  };
  await page.evaluate(
    async ({ rendererModule, viewerModule, code }) => {
      const sdk = await import(rendererModule),
        ui = await import(viewerModule);
      const output = await sdk.renderPanelsAsync(code, {
        width: 960,
        panelFormat: "compact",
      });
      if (output.diagnostics.length)
        throw new Error(output.diagnostics.join("\n"));
      const container = document.createElement("section");
      document.querySelector("main").replaceChildren(container);
      ui.mountComicCard(container, output);
      window.personaViewerResult = output;
    },
    { rendererModule, viewerModule, code: source(withDiagram) },
  );
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page
      .getByRole("button", { name: "사람과 UML을 함께 읽어요 · 만화 읽기" })
      .click();
    const viewer = page.getByRole("dialog"),
      region = viewer.getByRole("region", { name: "만화 읽기 영역" }),
      image = viewer.locator(".comic-viewer-artwork img");
    await expect(
      viewer.locator(".comic-position"),
      `${width}px viewer must open at the first cut`,
    ).toHaveText("1 / 5컷");
    await expect
      .poll(() =>
        region.evaluate((viewport) => {
          const image = viewport.querySelector("img").getBoundingClientRect(),
            style = getComputedStyle(viewport);
          const width =
              viewport.clientWidth -
              parseFloat(style.paddingLeft) -
              parseFloat(style.paddingRight),
            height =
              viewport.clientHeight -
              parseFloat(style.paddingTop) -
              parseFloat(style.paddingBottom);
          const result = window.personaViewerResult;
          return (
            image.width > 0 &&
            image.width <= width + 1 &&
            result.panels.every(
              (panel) =>
                (panel.height / panel.width) * image.width <= height + 1,
            ) &&
            viewport.scrollHeight > viewport.clientHeight
          );
        }),
      )
      .toBe(true);
    const svg = await image.evaluate(async (image: HTMLImageElement) =>
      (await fetch(image.src)).text(),
    );
    expect(svg).toContain("가입 구조");
    expect(svg).toContain("기획자");
    expect(svg).toContain("개발자");
    expect(svg).toContain("검증자");
    const counts = await image.evaluate(async (image: HTMLImageElement) => {
      const xml = new DOMParser().parseFromString(
        await (await fetch(image.src)).text(),
        "image/svg+xml",
      );
      return {
        human: xml.querySelectorAll("[data-human]").length,
        diagram: xml.querySelectorAll("[data-diagram]").length,
      };
    });
    expect(counts).toEqual({ human: 15, diagram: 1 });
    await viewer.getByRole("button", { name: "다음 컷", exact: true }).click();
    await expect(viewer.locator(".comic-position")).toHaveText("2 / 5컷");
    await viewer.getByRole("checkbox", { name: "화면 넘침 방지" }).uncheck();
    await viewer.getByLabel("보기 크기").selectOption("2");
    await expect.poll(async () => (await image.boundingBox()).width).toBe(1920);
    expect(
      await image.evaluate(async (image: HTMLImageElement) =>
        (await fetch(image.src)).text(),
      ),
    ).toBe(svg);
    await page.keyboard.press("Escape");
    await expect(page.locator(".comic-card")).toBeFocused();
  }
});
