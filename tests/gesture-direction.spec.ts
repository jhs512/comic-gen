import { test, expect } from "./mermaid-fixture";

// 손방향 overrides the automatic side of 인사손/가리키는손; omitting it keeps the automatic choice.
const cast =
  "등장인물:\n  a: {그림: 사람, 이름표: 코치}\n  b: {그림: 사람, 이름표: 대리}\n  s: {그림: 서버}\n";
const panel = (actor: string, others = "b") =>
  `${cast}컷:\n  - 인물: [${actor}, ${others}]\n    대사: [{화자: a, 상대: b, 내용: "이쪽을 보세요."}]\n`;

test("authored 손방향 overrides the automatic hand side for humans and icons", async ({
  page,
}) => {
  await page.route("**/gesture-direction-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html><body style="margin:0"></body></html>',
    }),
  );
  await page.goto("/gesture-direction-test.html");
  const sources = {
    autoPoint: panel("{식별자: a, 손모양: 가리키는손}"),
    leftPoint: panel("{식별자: a, 손모양: 가리키는손, 손방향: 왼쪽}"),
    autoWave: panel("{식별자: a, 손모양: 인사손}"),
    rightWave: panel("{식별자: a, 손모양: 인사손, 손방향: 오른쪽}"),
    rightPointHolding: panel(
      "{식별자: a, 손모양: 가리키는손, 손방향: 오른쪽, 든소품: 데이터}",
      "s",
    ).replace("상대: b", "상대: s"),
    iconRightWave: panel(
      "{식별자: s, 손모양: 인사손, 손방향: 오른쪽}",
      "a",
    ).replace("화자: a, 상대: b", "화자: s, 상대: a"),
  };
  const results = await page.evaluate(async (sources) => {
    const sdk = await import("/cdn/comic-gen.render.js");
    const out: Record<string, unknown> = {};
    for (const [name, source] of Object.entries(sources)) {
      const output = sdk.renderPanels(source, { panelFormat: "compact" });
      if (output.diagnostics.length)
        throw new Error(`${name}: ${output.diagnostics.join("\n")}`);
      const host = document.createElement("div");
      host.innerHTML = output.panels[0].svg;
      document.body.append(host);
      const id = name.startsWith("icon") ? "s" : "a";
      const actor = host.querySelector<SVGGElement>(
        `[data-character="${id}"]`,
      )!;
      const shadow = actor.querySelector("ellipse")!.getBoundingClientRect();
      const centerX = shadow.x + shadow.width / 2;
      const side = (selector: string) => {
        const node = actor.querySelector(selector);
        if (!node) return null;
        const box = node.getBoundingClientRect();
        return box.x + box.width / 2 < centerX ? "left" : "right";
      };
      out[name] = {
        gesture: side("[data-gesture] [data-hand]"),
        dataSide: actor
          .querySelector("[data-gesture] [data-hand]")!
          .getAttribute("data-side"),
        holding: side("[data-holding]"),
        arm: [...actor.querySelectorAll("[data-arm]")].map((arm) =>
          arm.getAttribute("data-arm"),
        ),
      };
      host.remove();
    }
    return out;
  }, sources);
  expect(results).toMatchObject({
    autoPoint: { gesture: "right", dataSide: "right" },
    leftPoint: { gesture: "left", dataSide: "left" },
    autoWave: { gesture: "left", dataSide: "left" },
    rightWave: { gesture: "right", dataSide: "right", arm: ["right"] },
    rightPointHolding: { gesture: "right", holding: "left" },
    iconRightWave: { gesture: "right", dataSide: "right" },
  });
});

test("손방향 is validated, inherited, dropped with its gesture and matches the English field", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const sdk = await import("/src/index.ts");
    const { readComic } = await import("/src/parse.ts");
    const person = "등장인물: {a: {그림: 사람}}\n";
    const diag = (actor: string) =>
      sdk
        .renderPanels(`${person}컷: [{인물: [${actor}]}]`)
        .diagnostics.join("\n");
    const inherited = readComic(
      `${person}컷:\n  - 인물: [{식별자: a, 손모양: 인사손, 손방향: 오른쪽}]\n  - 구성: 이전\n    인물: [{식별자: a, 표정: 기쁨}]\n  - 구성: 이전\n    인물: [{식별자: a, 손모양: 가리키는손}]\n  - 구성: 이전\n    인물: [{식별자: a, 손모양: 인사손, 손방향: 오른쪽}]\n  - 구성: 이전\n    인물: [{식별자: a, 손모양: null}]\n`,
    );
    const english = sdk.renderPanels(
      "cast: {a: {asset: human}}\npanels: [{actors: [{id: a, gesture: wave, gestureDirection: right}]}]",
    );
    const korean = sdk.renderPanels(
      `${person}컷: [{인물: [{식별자: a, 손모양: 인사손, 손방향: 오른쪽}]}]`,
    );
    return {
      invalid: [
        diag("{식별자: a, 손모양: 가리키는손, 손방향: 위}"),
        diag("{식별자: a, 손모양: 가리키는손, 손방향: 아래}"),
        diag("{식별자: a, 손방향: 오른쪽}"),
        diag("{식별자: a, 손모양: 위가리키는손, 손방향: 왼쪽}"),
      ],
      directions: inherited.panels.map((p) => p.actors[0].gestureDirection),
      sameLanguages: english.svg === korean.svg && !english.diagnostics.length,
      values: sdk.문법값.gestureDirection,
    };
  });
  expect(result.invalid[0]).toContain("위가리키는손으로");
  expect(result.invalid[1]).toContain("왼쪽 또는 오른쪽");
  expect(result.invalid[2]).toContain("손모양과 함께");
  expect(result.invalid[3]).toContain("방향을 정할 수 없습니다");
  // A new gesture without 손방향 returns to the automatic side; 손모양: null clears both.
  expect(result.directions).toEqual([
    "right",
    "right",
    undefined,
    "right",
    undefined,
  ]);
  expect(result.sameLanguages).toBe(true);
  expect(result.values).toEqual({ left: "왼쪽", right: "오른쪽" });
});
