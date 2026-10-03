import { test, expect } from "@playwright/test";

const english = `title: bilingual
cast:
  a: {asset: client, label: 첫째}
  b: {asset: server, label: 둘째}
  c: {asset: database, label: 셋째}
panels:
  - mode: full
    actors:
      - {id: a, expression: neutral, gesture: wave, holding: request, x: 0.16, y: 0.8, scale: 0.8}
      - {id: b, expression: happy, gesture: point, holding: data, x: 0.5, y: 0.8, scale: 1}
      - {id: c, expression: confused, holding: key, x: 0.84, y: 0.8, scale: 1.1}
    dialogue:
      - {from: a, to: b, text: 인사와 요청, x: 0.3, y: 0, fontSize: 16}
      - {from: b, to: c, text: 답과 데이터, x: 0.7, fontSize: 20}
    transfer:
      - {from: a, to: b, prop: request}
      - {from: b, to: c, prop: data}
      - {from: c, to: a, prop: key}
  - mode: before
    actors: [{id: a, expression: sad, gesture: null, holding: null}, {id: b, expression: angry}]
    dialogue: [{from: b, to: a, text: 다음 컷}]
  - mode: before
    removeActors: [c]
    actors: [{id: a, expression: null, x: null, y: null, scale: null}, {id: b, x: null}]
`;

const korean = `제목: bilingual
등장인물:
  a: {그림: 클라이언트, 이름표: 첫째}
  b: {그림: 서버, 이름표: 둘째}
  c: {그림: 데이터베이스, 이름표: 셋째}
컷:
  - 구성: 전체
    인물:
      - {식별자: a, 표정: 보통, 손모양: 인사손, 든소품: 요청, 가로위치: 0.16, 세로위치: 0.8, 배율: 0.8}
      - {식별자: b, 표정: 기쁨, 손모양: 가리키는손, 든소품: 데이터, 가로위치: 0.5, 세로위치: 0.8, 배율: 1}
      - {식별자: c, 표정: 어리둥절, 든소품: 열쇠, 가로위치: 0.84, 세로위치: 0.8, 배율: 1.1}
    대사:
      - {화자: a, 상대: b, 내용: 인사와 요청, 가로위치: 0.3, 세로위치: 0, 글자크기: 16}
      - {화자: b, 상대: c, 내용: 답과 데이터, 가로위치: 0.7, 글자크기: 20}
    전달:
      - {주는인물: a, 받는인물: b, 소품: 요청}
      - {주는인물: b, 받는인물: c, 소품: 데이터}
      - {주는인물: c, 받는인물: a, 소품: 열쇠}
  - 구성: 이전
    인물: [{식별자: a, 표정: 슬픔, 손모양: null, 든소품: null}, {식별자: b, 표정: 화남}]
    대사: [{화자: b, 상대: a, 내용: 다음 컷}]
  - 구성: 이전
    제외인물: [c]
    인물: [{식별자: a, 표정: null, 가로위치: null, 세로위치: null, 배율: null}, {식별자: b, 가로위치: null}]
`;

test("every Korean field and asset value resolves and renders like the English spelling", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(
    async ({ english, korean }) => {
      const { readComic } = await import("/src/parse.ts");
      const { renderComic, renderPanels } = await import("/src/index.ts");
      const englishComic = readComic(english);
      const koreanComic = readComic(korean);
      return {
        english: englishComic,
        korean: koreanComic,
        outputs: ["compact", "phone"].map((panelFormat) => {
          const legacy = renderComic(english, { width: 720, panelFormat });
          const translated = renderComic(korean, {
            너비: 720,
            컷비율: panelFormat === "compact" ? "기본" : "모바일",
          });
          const panelResult = renderPanels(korean, {
            컷비율: panelFormat === "compact" ? "기본" : "모바일",
          });
          return {
            diagnostics: [
              legacy.diagnostics,
              translated.diagnostics,
              panelResult.diagnostics,
            ],
            sameSvg: legacy.svg === translated.svg,
            samePanels:
              legacy.panels.map((panel) => panel.svg).join("\n") ===
              panelResult.panels.map((panel) => panel.svg).join("\n"),
            panels: translated.panels.length,
          };
        }),
      };
    },
    { english, korean },
  );
  expect(result.korean).toEqual(result.english);
  expect(
    Object.values(result.korean.cast).map((member) => member.asset),
  ).toEqual(["client", "server", "database"]);
  expect(
    result.korean.panels.flatMap((panel) =>
      panel.actors.map((actor) => actor.expression),
    ),
  ).toEqual([
    "neutral",
    "happy",
    "confused",
    "sad",
    "angry",
    "confused",
    "neutral",
    "angry",
  ]);
  for (const output of result.outputs) {
    expect(output.diagnostics).toEqual([[], [], []]);
    expect(output.sameSvg).toBe(true);
    expect(output.samePanels).toBe(true);
    expect(output.panels).toBe(3);
  }
});

test("Korean before preserves order and omitted state, and null resets every optional actor field", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { readComic } = await import("/src/parse.ts");
    const { renderComic } = await import("/src/index.ts");
    const prefix =
      "등장인물: {a: {그림: 서버}, b: {그림: 데이터베이스}}\n컷:\n";
    const first =
      "  - 인물: [{식별자: a, 표정: 기쁨, 손모양: 인사손, 든소품: 열쇠, 가로위치: 0.25, 세로위치: 0.8, 배율: 0.8}, b]\n    대사: [{화자: a, 내용: first}]\n    전달: [{주는인물: a, 받는인물: b, 소품: 요청}]\n";
    const source =
      prefix +
      first +
      "  - 구성: 이전\n    대사: null\n    전달: null\n" +
      "  - 구성: 이전\n    인물: [b, a]\n    제외인물: null\n" +
      "  - 구성: 이전\n    인물: [{식별자: a, 표정: null, 손모양: null, 든소품: null, 가로위치: null, 세로위치: null, 배율: null}]\n";
    const comic = readComic(source);
    const serialize = (value) => JSON.parse(JSON.stringify(value));
    const invalid = [
      prefix + "  - 구성: 이전\n",
      prefix + first + "  - 구성: 이전\n    인물: []\n",
      prefix + first + "  - 구성: 이전\n    인물: null\n",
    ].map((source) => renderComic(source).diagnostics.join("\n"));
    const fullNulls = [
      "표정",
      "손모양",
      "든소품",
      "가로위치",
      "세로위치",
      "배율",
    ].map((field) => ({
      field,
      diagnostics: renderComic(
        prefix + `  - 인물: [{식별자: a, ${field}: null}]\n`,
      ).diagnostics.join("\n"),
    }));
    return {
      panels: serialize(comic.panels),
      original: serialize(readComic(prefix + first).panels[0]),
      defaults: serialize(
        readComic(prefix + "  - 인물: [a, b]\n").panels[0].actors,
      ),
      diagnostics: renderComic(source).diagnostics,
      invalid,
      fullNulls,
      readded: serialize(
        readComic(
          prefix + first + "  - 구성: 이전\n    제외인물: [a]\n    인물: [a]\n",
        ).panels[1].actors,
      ),
    };
  });
  expect(result.diagnostics).toEqual([]);
  expect(result.panels[0]).toEqual(result.original);
  expect(result.panels[1].actors).toEqual(result.panels[0].actors);
  expect(result.panels[1].dialogue).toEqual([]);
  expect(result.panels[1].transfer).toEqual([]);
  expect(result.panels[2].actors).toEqual(result.panels[0].actors);
  expect(result.panels[2].actors.map((actor) => actor.id)).toEqual(["a", "b"]);
  expect(result.panels[3].actors).toEqual(result.defaults);
  expect(result.invalid[0]).toContain("첫 컷");
  expect(result.invalid[1]).toContain("1~3명");
  expect(result.invalid[2]).toContain("1~3명");
  for (const { field, diagnostics } of result.fullNulls) {
    expect(diagnostics).toContain(`컷 1.a.${field}`);
  }
  expect(result.readded.map((actor) => actor.id)).toEqual(["b", "a"]);
  expect(result.readded[1]).toEqual(result.defaults[0]);
});

test("keywords inside IDs, names and dialogue remain literal while different field languages may mix", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { readComic } = await import("/src/parse.ts");
    const { renderComic } = await import("/src/index.ts");
    const source = `제목: title 제목 wave 인사손
등장인물:
  title: {그림: 서버, label: "asset 그림"}
  asset: {asset: database, 이름표: "표정 expression"}
  표정: {그림: client, 이름표: "제목 title"}
panels:
  - 구성: full
    actors: [{식별자: title, expression: 기쁨}, {id: asset, 표정: confused}, 표정]
    대사:
      - {from: title, 상대: asset, text: "wave 인사손 point 가리키는손 title 제목 asset 그림 표정", 글자크기: 16}
    transfer: [{주는인물: asset, to: 표정, prop: 열쇠}]
`;
    const comic = readComic(source);
    const rendered = renderComic(source);
    const document = new DOMParser().parseFromString(
      rendered.svg,
      "image/svg+xml",
    );
    const prototypeNames = readComic(`등장인물:
  constructor: {그림: 서버, 이름표: constructor}
  toString: {그림: 클라이언트, 이름표: toString}
  __proto__: {그림: 데이터베이스, 이름표: __proto__}
컷: [{인물: [constructor, toString, __proto__]}]
`);
    return {
      comic,
      diagnostics: rendered.diagnostics,
      ids: [...document.querySelectorAll("[data-character]")].map((node) =>
        node.getAttribute("data-character"),
      ),
      renderedText: document.documentElement.textContent,
      dialogueText: [...document.querySelectorAll("[data-dialogue] tspan")]
        .map((node) => node.textContent)
        .join(""),
      prototypeIds: Object.keys(prototypeNames.cast),
      prototypeLabels: Object.values(prototypeNames.cast).map(
        (member) => member.label,
      ),
    };
  });
  expect(result.diagnostics).toEqual([]);
  expect(Object.keys(result.comic.cast)).toEqual(["title", "asset", "표정"]);
  expect(result.ids).toEqual(["title", "asset", "표정"]);
  expect(result.prototypeIds).toEqual(["constructor", "toString", "__proto__"]);
  expect(result.prototypeLabels).toEqual(result.prototypeIds);
  expect(result.comic.title).toBe("title 제목 wave 인사손");
  expect(result.comic.cast.title.label).toBe("asset 그림");
  expect(result.comic.cast.asset.label).toBe("표정 expression");
  expect(result.comic.cast.표정.label).toBe("제목 title");
  expect(result.comic.panels[0].dialogue[0].text).toBe(
    "wave 인사손 point 가리키는손 title 제목 asset 그림 표정",
  );
  expect(result.dialogueText).toBe(result.comic.panels[0].dialogue[0].text);
  expect(result.comic.panels[0].transfer[0]).toEqual({
    from: "asset",
    to: "표정",
    prop: "key",
  });
});

type Scope =
  "comic" | "cast" | "panel" | "actor" | "dialogue" | "transfer" | "options";
type FieldPair = [Scope, string, string, unknown, unknown];

const fieldPairs: FieldPair[] = [
  ["comic", "title", "제목", "same", "different"],
  [
    "comic",
    "cast",
    "등장인물",
    { a: { asset: "server" } },
    { b: { asset: "database" } },
  ],
  ["comic", "panels", "컷", [{ actors: ["a"] }], [{ actors: ["b"] }]],
  ["cast", "asset", "그림", "server", "database"],
  ["cast", "label", "이름표", "same", "different"],
  ["panel", "mode", "구성", "full", "before"],
  ["panel", "actors", "인물", ["a"], ["b"]],
  ["panel", "dialogue", "대사", [], [{ from: "a", text: "different" }]],
  ["panel", "transfer", "전달", [], [{ from: "a", to: "b", prop: "data" }]],
  ["panel", "removeActors", "제외인물", [], ["b"]],
  ["actor", "id", "식별자", "a", "b"],
  ["actor", "expression", "표정", "happy", "sad"],
  ["actor", "gesture", "손모양", "wave", "point"],
  ["actor", "holding", "든소품", "request", "key"],
  ["actor", "x", "가로위치", 0.25, 0.75],
  ["actor", "y", "세로위치", 0.5, 0.8],
  ["actor", "scale", "배율", 0.8, 1],
  ["dialogue", "from", "화자", "a", "b"],
  ["dialogue", "to", "상대", "b", "a"],
  ["dialogue", "text", "내용", "same", "different"],
  ["dialogue", "x", "가로위치", 0.25, 0.75],
  ["dialogue", "y", "세로위치", 0, 0.5],
  ["dialogue", "fontSize", "글자크기", 16, 24],
  ["transfer", "from", "주는인물", "a", "b"],
  ["transfer", "to", "받는인물", "b", "a"],
  ["transfer", "prop", "소품", "request", "data"],
  ["options", "width", "너비", 720, 960],
  ["options", "font", "글꼴", "sans-serif", "serif"],
  ["options", "fontVersion", "글꼴버전", "one", "two"],
  ["options", "panelFormat", "컷비율", "compact", "phone"],
];

const base = () => ({
  title: "test",
  cast: { a: { asset: "server", label: "a" }, b: { asset: "database" } },
  panels: [{ actors: ["a", "b"] }],
});

function withFields(
  scope: Scope,
  fields: Record<string, unknown>,
  replace = "",
) {
  const comic = base();
  const overlay = (record: Record<string, unknown>) => {
    const original = Object.fromEntries(
      Object.entries(record).filter(([key]) => key !== replace),
    );
    return { ...original, ...fields };
  };
  if (scope === "comic") return JSON.stringify(overlay(comic));
  if (scope === "cast")
    return JSON.stringify({
      ...comic,
      cast: { ...comic.cast, a: overlay(comic.cast.a) },
    });
  let panel: Record<string, unknown> = comic.panels[0];
  if (scope === "panel") panel = overlay(panel);
  if (scope === "actor")
    panel = { ...panel, actors: [overlay({ id: "a" }), "b"] };
  if (scope === "dialogue")
    panel = { ...panel, dialogue: [overlay({ from: "a", text: "hello" })] };
  if (scope === "transfer")
    panel = {
      ...panel,
      transfer: [overlay({ from: "a", to: "b", prop: "data" })],
    };
  return JSON.stringify({ ...comic, panels: [panel] });
}

test("English and Korean spellings of the same field are rejected for every scope, value and order", async ({
  page,
}) => {
  await page.goto("/");
  const cases = fieldPairs.flatMap(
    ([scope, englishKey, koreanKey, first, second]) =>
      [true, false].flatMap((same) =>
        [true, false].map((englishFirst) => {
          const other = same ? first : second;
          const fields = englishFirst
            ? { [englishKey]: first, [koreanKey]: other }
            : { [koreanKey]: other, [englishKey]: first };
          return {
            scope,
            englishKey,
            koreanKey,
            same,
            englishFirst,
            source:
              scope === "options"
                ? JSON.stringify(base())
                : withFields(scope, fields, englishKey),
            options: scope === "options" ? fields : {},
          };
        }),
      ),
  );
  const outcomes = await page.evaluate(async (cases) => {
    const { renderComic, renderPanels } = await import("/src/index.ts");
    return cases.map(({ source, options }) => {
      const comic = renderComic(source, options);
      const panels = renderPanels(source, options);
      return {
        comic: comic.diagnostics,
        panels: panels.diagnostics,
        svg: comic.svg,
      };
    });
  }, cases);
  expect(outcomes).toHaveLength(120);
  for (const [index, outcome] of outcomes.entries()) {
    const sample = cases[index];
    const context = `${sample.scope}.${sample.englishKey}, same=${sample.same}, English first=${sample.englishFirst}`;
    for (const diagnostics of [outcome.comic, outcome.panels]) {
      expect(diagnostics, context).toHaveLength(1);
      expect(diagnostics[0], context).toContain("같은 항목");
      expect(diagnostics[0], context).toContain(sample.englishKey);
      expect(diagnostics[0], context).toContain(sample.koreanKey);
      expect(diagnostics[0], context).toContain(
        sample.scope === "options" ? "표시 설정" : "만화",
      );
    }
    expect(outcome.svg, context).toBe("");
  }
});

test("unknown fields, invalid values and missing references retain Korean diagnostic paths", async ({
  page,
}) => {
  await page.goto("/");
  const unknownScopes: Array<[Scope, string]> = [
    ["comic", "만화"],
    ["cast", "등장인물.a"],
    ["panel", "컷 1"],
    ["actor", "컷 1.인물"],
    ["dialogue", "컷 1.대사"],
    ["transfer", "컷 1.전달"],
  ];
  const cases = [
    ...unknownScopes.flatMap(([scope, path]) =>
      ["없는항목", "constructor", "toString", "__proto__"].map((key) => ({
        source: withFields(scope, { [key]: "literal" }),
        options: {},
        path,
        detail: key,
      })),
    ),
    {
      source: JSON.stringify(base()),
      options: { 없는설정: 1 },
      path: "표시 설정",
      detail: "없는설정",
    },
    ...["constructor", "toString", "__proto__"].map((key) => ({
      source: JSON.stringify(base()),
      options: { [key]: "literal" },
      path: "표시 설정",
      detail: key,
    })),
    {
      source: withFields("cast", { 그림: "없는그림" }, "asset"),
      options: {},
      path: "등장인물.a",
      detail: "없는 에셋",
    },
    {
      source: withFields("panel", { 구성: "미래" }),
      options: {},
      path: "컷 1",
      detail: "구성",
    },
    {
      source: withFields("actor", { 표정: "졸림" }),
      options: {},
      path: "컷 1.a",
      detail: "표정",
    },
    {
      source: withFields("actor", { 손모양: "박수" }),
      options: {},
      path: "컷 1.a",
      detail: "손 제스처",
    },
    {
      source: withFields("actor", { 든소품: "없는소품" }),
      options: {},
      path: "컷 1.a",
      detail: "소품",
    },
    {
      source: withFields("transfer", { 소품: "없는소품" }, "prop"),
      options: {},
      path: "컷 1",
      detail: "소품",
    },
    {
      source: withFields("actor", { 식별자: "없는인물" }, "id"),
      options: {},
      path: "컷 1",
      detail: "없는 캐릭터",
    },
    {
      source: withFields("dialogue", { 화자: "없는인물" }, "from"),
      options: {},
      path: "컷 1",
      detail: "화자",
    },
    {
      source: withFields("dialogue", { 상대: "없는인물" }),
      options: {},
      path: "컷 1",
      detail: "대화 상대",
    },
    {
      source: withFields("transfer", { 주는인물: "없는인물" }, "from"),
      options: {},
      path: "컷 1",
      detail: "전달 주체",
    },
    {
      source: withFields("transfer", { 받는인물: "없는인물" }, "to"),
      options: {},
      path: "컷 1",
      detail: "전달 대상",
    },
    {
      source: withFields("actor", { 가로위치: 2 }),
      options: {},
      path: "컷 1.a.가로위치",
      detail: "0~1",
    },
    {
      source: withFields("dialogue", { 글자크기: 2 }),
      options: {},
      path: "컷 1.대사.글자크기",
      detail: "12~32",
    },
    {
      source: JSON.stringify(base()),
      options: { 컷비율: "세로" },
      path: "컷비율",
      detail: "기본 또는 모바일",
    },
  ];
  const outcomes = await page.evaluate(
    async (cases) => {
      const { renderComic } = await import("/src/index.ts");
      return cases.map(({ source, optionsJson }) =>
        renderComic(source, JSON.parse(optionsJson)),
      );
    },
    cases.map(({ source, options }) => ({
      source,
      optionsJson: JSON.stringify(options),
    })),
  );
  for (const [index, outcome] of outcomes.entries()) {
    expect(outcome.diagnostics, JSON.stringify(cases[index])).toHaveLength(1);
    expect(outcome.diagnostics[0]).toContain(cases[index].path);
    expect(outcome.diagnostics[0]).toContain(cases[index].detail);
    expect(outcome.svg).toBe("");
  }
});

test("Korean options preserve renderPanels phone default and static hand drawings", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { createRenderer, renderComic, renderPanels } =
      await import("/src/index.ts");
    const source =
      "등장인물: {a: {그림: 서버}}\n컷: [{인물: [{식별자: a, 손모양: 인사손}]}]";
    const common = { 너비: 960, 글꼴: "sans-serif", 글꼴버전: "test-one" };
    const englishOptions = {
      width: 960,
      font: "sans-serif",
      fontVersion: "test-one",
    };
    const defaults = renderPanels(source, common);
    const koreanUndefined = renderPanels(source, {
      ...common,
      컷비율: undefined,
    });
    const englishUndefined = renderPanels(source, {
      ...englishOptions,
      panelFormat: undefined,
    });
    const explicitPhone = renderPanels(source, {
      ...englishOptions,
      panelFormat: "phone",
    });
    const explicitCompact = renderPanels(source, { ...common, 컷비율: "기본" });
    const comicCompact = renderComic(source, englishOptions);
    const comicPhone = renderComic(source, { ...common, 컷비율: "모바일" });
    const mixed = renderComic(source, {
      너비: 960,
      font: "sans-serif",
      글꼴버전: "test-one",
      panelFormat: "compact",
    });
    const renderer = createRenderer();
    renderer.renderPanels(source, englishOptions);
    const cached = renderer.renderPanels(source, common);
    const explicitViaRenderer = renderer.renderPanels(source, {
      ...common,
      컷비율: "기본",
    });
    const rendererUndefined = renderer.renderPanels(source, {
      ...common,
      컷비율: undefined,
    });
    const document = new DOMParser().parseFromString(
      explicitCompact.svg,
      "image/svg+xml",
    );
    return {
      diagnostics: [
        defaults,
        explicitPhone,
        explicitCompact,
        comicCompact,
        comicPhone,
        mixed,
        cached,
        explicitViaRenderer,
        koreanUndefined,
        englishUndefined,
        rendererUndefined,
      ].map((result) => result.diagnostics),
      defaultEqualsPhone: defaults.svg === explicitPhone.svg,
      koreanUndefinedEqualsPhone: koreanUndefined.svg === explicitPhone.svg,
      englishUndefinedEqualsPhone: englishUndefined.svg === explicitPhone.svg,
      rendererUndefinedEqualsPhone: rendererUndefined.svg === explicitPhone.svg,
      defaultEqualsComicPhone: defaults.svg === comicPhone.svg,
      explicitEqualsCompact: explicitCompact.svg === comicCompact.svg,
      rendererExplicitEqualsCompact:
        explicitViaRenderer.svg === comicCompact.svg,
      mixedEqualsCompact: mixed.svg === comicCompact.svg,
      phoneHeight: defaults.height,
      compactHeight: explicitCompact.height,
      width: defaults.width,
      cachedHits: cached.cache?.hits,
      hands: document.querySelectorAll(
        '[data-gesture="wave"] [data-hand="wave"]',
      ).length,
      animations: document.querySelectorAll(
        "animate, animateTransform, animateMotion, set",
      ).length,
    };
  });
  for (const diagnostics of result.diagnostics) expect(diagnostics).toEqual([]);
  expect(result.defaultEqualsPhone).toBe(true);
  expect(result.koreanUndefinedEqualsPhone).toBe(true);
  expect(result.englishUndefinedEqualsPhone).toBe(true);
  expect(result.rendererUndefinedEqualsPhone).toBe(true);
  expect(result.defaultEqualsComicPhone).toBe(true);
  expect(result.explicitEqualsCompact).toBe(true);
  expect(result.rendererExplicitEqualsCompact).toBe(true);
  expect(result.mixedEqualsCompact).toBe(true);
  expect(result.phoneHeight).toBeGreaterThan(result.compactHeight);
  expect(result.width).toBe(960);
  expect(result.cachedHits).toBe(1);
  expect(result.hands).toBe(1);
  expect(result.animations).toBe(0);
});
