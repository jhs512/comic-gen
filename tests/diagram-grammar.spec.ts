import { test, expect } from "@playwright/test";

const english = `title: Mermaid lesson
cast: {source: {asset: server, label: 원문}}
panels:
  - actors: [source]
    dialogue: [{from: source, text: 종류와 source는 원문 그대로}]
    diagram:
      type: mermaid
      title: 클래스 구조
      height: 420
      source: |
        classDiagram
          class 주문 {
            +String 제목
            +처리()
          }
          주문 --> source : 원문
  - mode: before
    diagram:
      type: mermaid
      source: |
        sequenceDiagram
          participant 제목 as 종류 source
          participant 원문 as 머메이드
          제목->>원문: 제목 원문 diagram type
`;

const korean = `제목: Mermaid lesson
등장인물: {source: {그림: 서버, 이름표: 원문}}
컷:
  - 인물: [source]
    대사: [{화자: source, 내용: 종류와 source는 원문 그대로}]
    다이어그램:
      종류: 머메이드
      제목: 클래스 구조
      높이: 420
      원문: |
        classDiagram
          class 주문 {
            +String 제목
            +처리()
          }
          주문 --> source : 원문
  - 구성: 이전
    다이어그램:
      종류: 머메이드
      원문: |
        sequenceDiagram
          participant 제목 as 종류 source
          participant 원문 as 머메이드
          제목->>원문: 제목 원문 diagram type
`;

test("Korean and English diagram grammar resolves to the same model without translating Mermaid labels", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(
    async ({ english, korean }) => {
      const { readComic } = await import("/src/parse.ts");
      const { koreanComic, normalizeComic } = await import("/src/syntax.ts");
      const parsedEnglish = readComic(english);
      const parsedKorean = readComic(korean);
      const authored = {
        cast: { source: { asset: "server", label: "type 제목" } },
        panels: [
          {
            actors: ["source"],
            diagram: {
              type: "mermaid",
              source: "flowchart LR\n제목-->source",
              title: "원문 source",
              height: 160,
            },
          },
        ],
      };
      const translated = koreanComic(authored);
      return {
        english: parsedEnglish,
        korean: parsedKorean,
        translated,
        normalized: normalizeComic(translated),
        authored,
      };
    },
    { english, korean },
  );
  expect(result.korean).toEqual(result.english);
  expect(result.korean.panels[0].diagram).toEqual({
    type: "mermaid",
    source:
      "classDiagram\n  class 주문 {\n    +String 제목\n    +처리()\n  }\n  주문 --> source : 원문\n",
    title: "클래스 구조",
    height: 420,
  });
  expect(result.korean.panels[1].diagram?.title).toBe("다이어그램");
  expect(result.korean.panels[1].diagram?.source).toContain(
    "제목->>원문: 제목 원문 diagram type",
  );
  expect(result.normalized).toEqual(result.authored);
  expect(result.translated.컷[0].다이어그램).toEqual({
    종류: "머메이드",
    원문: "flowchart LR\n제목-->source",
    제목: "원문 source",
    높이: 160,
  });
});

test("a diagram is local to its cut while before still inherits actors", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { readComic } = await import("/src/parse.ts");
    return readComic(`등장인물: {a: {그림: 서버}}
컷:
  - 인물: [{식별자: a, 표정: 기쁨}]
    다이어그램: {종류: 머메이드, 원문: "flowchart LR; A-->B", 제목: 첫째}
  - 구성: 이전
  - 구성: 이전
    다이어그램: {type: 머메이드, source: "flowchart LR; C-->D"}
  - 구성: 이전
    다이어그램: null
  - 구성: 이전
  - 인물: [a]
    diagram: null
`);
  });
  expect(result.panels.map((panel) => Object.hasOwn(panel, "diagram"))).toEqual(
    [true, false, true, false, false, false],
  );
  for (const panel of result.panels.slice(1, 5))
    expect(panel.actors).toEqual(result.panels[0].actors);
  expect(result.panels[0].diagram?.title).toBe("첫째");
  expect(result.panels[2].diagram?.title).toBe("다이어그램");
});

test("legacy comics preserve their model and diagram ranges accept their exact boundaries", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { readComic } = await import("/src/parse.ts");
    const legacy = readComic(
      "cast: {a: {asset: server}}\npanels: [{actors: [a]}]",
    );
    const cases = [
      { type: "mermaid", source: "x", title: "x", height: 160 },
      {
        종류: "머메이드",
        원문: "x".repeat(20000),
        제목: "한".repeat(100),
        높이: 1200,
      },
      { type: "머메이드", 원문: "flowchart LR; A-->B" },
    ];
    return {
      legacy: JSON.parse(JSON.stringify(legacy)),
      diagrams: cases.map(
        (diagram) =>
          readComic(
            JSON.stringify({
              cast: { a: { asset: "server" } },
              panels: [{ actors: ["a"], diagram }],
            }),
          ).panels[0].diagram,
      ),
    };
  });
  expect(result.legacy).toEqual({
    title: "Comic Gen",
    cast: { a: { asset: "server", label: "a" } },
    panels: [
      {
        actors: [{ id: "a", expression: "neutral", scale: 1 }],
        dialogue: [],
        transfer: [],
      },
    ],
  });
  expect(result.diagrams[0]).toEqual({
    type: "mermaid",
    source: "x",
    title: "x",
    height: 160,
  });
  expect(result.diagrams[1]?.source).toHaveLength(20000);
  expect(result.diagrams[1]?.title).toHaveLength(100);
  expect(result.diagrams[1]?.height).toBe(1200);
  expect(result.diagrams[2]).toEqual({
    type: "mermaid",
    source: "flowchart LR; A-->B",
    title: "다이어그램",
  });
});

test("invalid diagram objects have precise Korean paths and do not loosen the actor requirement", async ({
  page,
}) => {
  await page.goto("/");
  const cases = [
    { diagram: "flowchart LR", detail: "객체" },
    { diagram: [], detail: "객체" },
    ...["unknown", "constructor", "toString", "__proto__"].map((key) => ({
      diagram: Object.fromEntries([
        ["type", "mermaid"],
        ["source", "flowchart LR"],
        [key, "literal"],
      ]),
      detail: key,
    })),
    ...[
      undefined,
      null,
      "plantuml",
      "constructor",
      "toString",
      "__proto__",
      1,
    ].map((type) => ({ diagram: { type, source: "x" }, detail: "종류" })),
    ...[undefined, null, false, {}, [], "", "   ", "x".repeat(20001)].map(
      (source) => ({ diagram: { type: "mermaid", source }, detail: "원문" }),
    ),
    ...[null, false, {}, [], "", "   ", "x".repeat(101)].map((title) => ({
      diagram: { type: "mermaid", source: "x", title },
      detail: "제목",
    })),
    ...[null, "420", false, {}, [], 159, 1201].map((height) => ({
      diagram: { type: "mermaid", source: "x", height },
      detail: "높이",
    })),
  ];
  const result = await page.evaluate(
    async (cases) => {
      const { readComic } = await import("/src/parse.ts");
      function diagnostic(source) {
        try {
          readComic(source);
          return "";
        } catch (error) {
          return error.message;
        }
      }
      return {
        errors: cases.map((source) => diagnostic(source)),
        emptyActors: diagnostic(
          "등장인물: {a: {그림: 서버}}\n컷: [{인물: [], 다이어그램: {종류: 머메이드, 원문: x}}]",
        ),
        infiniteHeight: diagnostic(
          "cast: {a: {asset: server}}\npanels: [{actors: [a], diagram: {type: mermaid, source: x, height: .inf}}]",
        ),
      };
    },
    cases.map(({ diagram }) =>
      JSON.stringify({
        cast: { a: { asset: "server" } },
        panels: [{ actors: ["a"], diagram }],
      }),
    ),
  );
  for (const [index, message] of result.errors.entries()) {
    expect(message).toContain("컷 1.다이어그램");
    expect(message).toContain(cases[index].detail);
  }
  expect(result.emptyActors).toContain("1~3명");
  expect(result.infiniteHeight).toContain("컷 1.다이어그램.높이");
});

test("diagram aliases reject duplicate semantic keys for both values and insertion orders", async ({
  page,
}) => {
  await page.goto("/");
  const pairs: Array<[string, string, unknown, unknown]> = [
    ["type", "종류", "mermaid", "머메이드"],
    ["source", "원문", "flowchart LR; A-->B", "sequenceDiagram"],
    ["title", "제목", "첫째", "둘째"],
    ["height", "높이", 420, 500],
  ];
  const inputs = pairs.flatMap(([english, korean, value, different]) =>
    [value, different].flatMap((other) =>
      [true, false].map((englishFirst) => ({
        diagram: {
          ...Object.fromEntries(
            [
              ["type", "mermaid"],
              ["source", "flowchart LR"],
            ].filter(([key]) => key !== english),
          ),
          ...(englishFirst
            ? { [english]: value, [korean]: other }
            : { [korean]: other, [english]: value }),
        },
        english,
        korean,
      })),
    ),
  );
  const errors = await page.evaluate(async (inputs) => {
    const { readComic } = await import("/src/parse.ts");
    function diagnostic(source) {
      try {
        readComic(source);
        return "";
      } catch (error) {
        return error.message;
      }
    }
    const base = { cast: { a: { asset: "server" } } };
    return {
      nested: inputs.map(({ diagram }) =>
        diagnostic(
          JSON.stringify({ ...base, panels: [{ actors: ["a"], diagram }] }),
        ),
      ),
      panel: [true, false].flatMap((same) =>
        [true, false].map((englishFirst) => {
          const first = { type: "mermaid", source: "flowchart LR" };
          const second = same ? first : null;
          return diagnostic(
            JSON.stringify({
              ...base,
              panels: [
                {
                  actors: ["a"],
                  ...(englishFirst
                    ? { diagram: first, 다이어그램: second }
                    : { 다이어그램: second, diagram: first }),
                },
              ],
            }),
          );
        }),
      ),
    };
  }, inputs);
  for (const [index, message] of errors.nested.entries()) {
    expect(message).toContain("같은 항목");
    expect(message).toContain("만화.컷[1].다이어그램");
    expect(message).toContain(inputs[index].english);
    expect(message).toContain(inputs[index].korean);
  }
  for (const message of errors.panel) {
    expect(message).toContain("같은 항목");
    expect(message).toContain("다이어그램");
    expect(message).toContain("diagram");
  }
});
