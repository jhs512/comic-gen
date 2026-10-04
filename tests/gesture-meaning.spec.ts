import type { Page } from "@playwright/test";
import { test, expect } from "./mermaid-fixture";

type Appearance = {
  outfit: string;
  outfitColor: string;
  skinColor: string;
};
type Member = { asset: string; label: string; appearance?: Appearance };
type Scenario = {
  name: string;
  target?: string;
  axis: "x" | "y";
  cast: Record<string, Member>;
  panel: {
    actors: Array<string | Record<string, string | number>>;
    dialogue: Array<{ from: string; to?: string; text: string }>;
    transfer?: Array<{ from: string; to: string; prop: string }>;
  };
};

const members: Member[] = [
  ...["client", "server", "database"].map((asset) => ({
    asset,
    label: "설명자",
  })),
  ...[
    { outfit: "shirt", skinColor: "#f0c8a6" },
    { outfit: "jacket", skinColor: "#b88968" },
    { outfit: "hoodie", skinColor: "#6d4031" },
  ].map((appearance) => ({
    asset: "human",
    label: "설명자",
    appearance: { ...appearance, outfitColor: "#5379a7" },
  })),
];

async function inspectGestures(page: Page, scenarios: Scenario[]) {
  await page.route("**/gesture-meaning-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html><body style="margin:0"><main></main></body></html>',
    }),
  );
  await page.goto("/gesture-meaning-test.html");
  return page.evaluate(async (scenarios) => {
    const sdk = await import("/cdn/comic-gen.render.js");
    const results = [];
    for (const width of [480, 720, 960])
      for (const scenario of scenarios) {
        const output = sdk.renderPanels(
          JSON.stringify({ cast: scenario.cast, panels: [scenario.panel] }),
          { width, panelFormat: "compact" },
        );
        if (output.diagnostics.length)
          throw new Error(`${scenario.name}: ${output.diagnostics.join("\n")}`);
        const panel = output.panels[0];
        document.querySelector("main")!.innerHTML = panel.svg;
        const root = document.querySelector<SVGSVGElement>("main > svg")!;
        const actor = root.querySelector<SVGGElement>('[data-character="a"]')!;
        const hand = actor.querySelector<SVGGElement>('[data-hand^="point"]')!;
        const palm = hand.querySelector<SVGPathElement>("[data-palm]")!;
        const actorMatrix = DOMMatrix.fromMatrix(actor.getCTM()!);
        const palmToActor = actorMatrix.inverse().multiply(palm.getCTM()!);
        const actorToPalm = palmToActor.inverse();
        const target = scenario.target
          ? root.querySelector<SVGGElement>(
              `[data-character="${scenario.target}"]`,
            )!
          : undefined;
        // Decide the intended direction from the characters' actual rendered
        // centers, rather than their declared order or the hand's data-side.
        const sign =
          scenario.axis === "y"
            ? -1
            : target
              ? Math.sign(target.getCTM()!.e - actorMatrix.e)
              : -1;
        const contour = [];
        const length = palm.getTotalLength();
        for (let distance = 0; distance <= length; distance += 0.25)
          contour.push(
            palmToActor.transformPoint(palm.getPointAtLength(distance)),
          );
        const main = (point: DOMPoint) =>
          scenario.axis === "x" ? point.x : point.y;
        const perpendicular = (point: DOMPoint) =>
          scenario.axis === "x" ? point.y : point.x;
        const mainMin = Math.min(...contour.map(main));
        const mainMax = Math.max(...contour.map(main));
        const perpendicularMin = Math.min(...contour.map(perpendicular));
        const perpendicularMax = Math.max(...contour.map(perpendicular));
        const far = sign < 0 ? mainMin : mainMax;
        const span = mainMax - mainMin;
        const pointAt = (along: number, across: number) =>
          scenario.axis === "x"
            ? new DOMPoint(along, across)
            : new DOMPoint(across, along);
        const inside = (point: DOMPoint) =>
          palm.isPointInFill(actorToPalm.transformPoint(point));
        const thicknessAt = (along: number) => {
          const filled = [];
          for (
            let across = perpendicularMin;
            across <= perpendicularMax;
            across += 0.25
          )
            if (inside(pointAt(along, across))) filled.push(across);
          return filled.length ? filled.at(-1)! - filled[0] : 0;
        };
        // A pointed index is a narrow extension away from the character,
        // followed by the broader palm nearer the wrist. A wrongly mirrored
        // hand can have the correct data-side but fails this silhouette test.
        const indexThickness = thicknessAt(far - sign * 4);
        const palmThickness = thicknessAt(far - sign * span * 0.75);
        const fingerProbes = [];
        for (let along = 3; along <= 10; along += 1)
          for (
            let across = perpendicularMin + 2;
            across <= perpendicularMax - 2;
            across += 0.75
          ) {
            const point = pointAt(far - sign * along, across);
            if (
              [-2, 0, 2].every((dx) =>
                [-2, 0, 2].every((dy) =>
                  inside(new DOMPoint(point.x + dx, point.y + dy)),
                ),
              )
            )
              fingerProbes.push(point);
          }

        const member = scenario.cast.a;
        const skin = member.appearance?.skinColor ?? "white";
        const sleeve =
          member.appearance && member.appearance.outfit !== "shirt"
            ? member.appearance.outfitColor
            : skin;
        const color = (value: string) => {
          const swatch = document.createElement("span");
          swatch.style.color = value;
          document.body.append(swatch);
          const rgb = getComputedStyle(swatch).color;
          swatch.remove();
          return rgb;
        };
        const skinRgb = color(skin);
        const arms = [...actor.querySelectorAll<SVGGElement>("[data-arm]")];
        const humanBody = actor.querySelector<SVGGElement>("[data-human]");
        const bodyShapes = humanBody
          ? [
              ...humanBody.querySelectorAll<SVGGeometryElement>(
                "path,circle,ellipse,rect",
              ),
            ]
          : [
              ...actor.querySelectorAll<SVGGeometryElement>(
                ":scope > path,:scope > circle,:scope > rect",
              ),
            ];
        const joints = arms.map((arm) => {
          const path = arm.querySelector<SVGPathElement>("path")!;
          const physicalHand = actor.querySelector<SVGGElement>(
            `[data-hand][data-side="${arm.getAttribute("data-arm")}"]`,
          )!;
          const palmNode =
            physicalHand.querySelector<SVGElement>("[data-palm]")!;
          const physicalPalm =
            palmNode instanceof SVGPathElement
              ? palmNode
              : palmNode.querySelector<SVGPathElement>("path")!;
          const toPalm = DOMMatrix.fromMatrix(physicalPalm.getCTM()!)
            .inverse()
            .multiply(path.getCTM()!);
          const toBody = bodyShapes.map((shape) => ({
            shape,
            matrix: DOMMatrix.fromMatrix(shape.getCTM()!)
              .inverse()
              .multiply(path.getCTM()!),
          }));
          let wrist = false,
            shoulder = false;
          const box = path.getBBox();
          for (let x = box.x; x <= box.x + box.width; x += 0.75)
            for (let y = box.y; y <= box.y + box.height; y += 0.75) {
              const point = new DOMPoint(x, y);
              if (!path.isPointInFill(point)) continue;
              if (physicalPalm.isPointInFill(toPalm.transformPoint(point)))
                wrist = true;
              if (
                toBody.some(
                  ({ shape, matrix }) =>
                    getComputedStyle(shape).fill !== "none" &&
                    shape.isPointInFill(matrix.transformPoint(point)),
                )
              )
                shoulder = true;
            }
          return {
            wrist,
            shoulder,
            closed: /[zZ]\s*$/.test(path.getAttribute("d")!),
            expectedFill: getComputedStyle(path).fill === color(sleeve),
          };
        });
        const physicalHands = [
          ...root.querySelectorAll<SVGGElement>("[data-character]"),
        ].map((character) => {
          const toActor = DOMMatrix.fromMatrix(character.getCTM()!).inverse();
          const nodes = [
            ...character.querySelectorAll<SVGGraphicsElement>(
              "[data-hand],[data-human-part^='resting-hand-']",
            ),
          ];
          const centers = nodes.map((node) => {
            const box = node.getBBox();
            return toActor
              .multiply(node.getCTM()!)
              .transformPoint(
                new DOMPoint(box.x + box.width / 2, box.y + box.height / 2),
              ).x;
          });
          return {
            id: character.getAttribute("data-character"),
            count: nodes.length,
            left: centers.filter((x) => x < 0).length,
            right: centers.filter((x) => x > 0).length,
          };
        });
        const frame = root.querySelector<SVGRectElement>(
          "g[data-panel] > rect",
        )!;
        const frameBox = frame.getBBox();
        const frameMatrix = DOMMatrix.fromMatrix(frame.getCTM()!);
        const frameStart = frameMatrix.transformPoint(
          new DOMPoint(frameBox.x, frameBox.y),
        );
        const frameEnd = frameMatrix.transformPoint(
          new DOMPoint(
            frameBox.x + frameBox.width,
            frameBox.y + frameBox.height,
          ),
        );
        const box = actor.getBBox();
        const corners = [
          [box.x, box.y],
          [box.x + box.width, box.y],
          [box.x, box.y + box.height],
          [box.x + box.width, box.y + box.height],
        ].map(([x, y]) => actorMatrix.transformPoint(new DOMPoint(x, y)));

        let skinPixels = 0,
          outlinePixels = 0;
        if (width === 480) {
          const blob = await sdk.exportPng(panel),
            url = URL.createObjectURL(blob);
          try {
            const image = new Image();
            image.src = url;
            await image.decode();
            const canvas = Object.assign(document.createElement("canvas"), {
              width: image.naturalWidth,
              height: image.naturalHeight,
            });
            const context = canvas.getContext("2d")!;
            context.drawImage(image, 0, 0);
            const rgb = skinRgb.match(/\d+/g)!.slice(0, 3).map(Number);
            for (const probe of fingerProbes) {
              const point = actorMatrix.transformPoint(probe);
              const pixel = context.getImageData(
                Math.round(point.x),
                Math.round(point.y),
                1,
                1,
              ).data;
              if (
                pixel[3] > 200 &&
                rgb.every(
                  (value, channel) => Math.abs(pixel[channel] - value) < 35,
                )
              )
                skinPixels++;
            }
            // White icon hands need their ink contour checked as well: a
            // missing white fill alone would be indistinguishable from paper.
            const ink = new Set<string>();
            for (const probe of contour.filter(
              (point) => Math.abs(main(point) - far) < 12,
            )) {
              const point = actorMatrix.transformPoint(probe);
              for (const dx of [-1, 0, 1])
                for (const dy of [-1, 0, 1]) {
                  const x = Math.round(point.x) + dx,
                    y = Math.round(point.y) + dy;
                  const pixel = context.getImageData(x, y, 1, 1).data;
                  if (pixel[3] > 200 && pixel[0] + pixel[1] + pixel[2] < 400)
                    ink.add(`${x},${y}`);
                }
            }
            outlinePixels = ink.size;
          } finally {
            URL.revokeObjectURL(url);
          }
        }
        results.push({
          width,
          name: scenario.name,
          asset: member.asset,
          outfit: member.appearance?.outfit,
          sign,
          axis: scenario.axis,
          far,
          span,
          indexThickness,
          palmThickness,
          indexInterior: fingerProbes.length,
          skinPixels,
          outlinePixels,
          palmSkin: getComputedStyle(palm).fill === skinRgb,
          joints,
          physicalHands,
          holdingCount: actor.querySelectorAll("[data-holding]").length,
          gestureCount: actor.querySelectorAll('[data-hand^="point"]').length,
          contained: corners.every(
            (point) =>
              point.x >= frameStart.x &&
              point.x <= frameEnd.x &&
              point.y >= frameStart.y &&
              point.y <= frameEnd.y,
          ),
        });
      }
    return results;
  }, scenarios);
}

function expectMeaningfulHands(
  results: Awaited<ReturnType<typeof inspectGestures>>,
) {
  for (const result of results) {
    const context = JSON.stringify(result);
    expect(result.sign, context).not.toBe(0);
    // A person's hands are drawn smaller than the large icon bodies' hands. A
    // raised index stands beside the face, above the eyes (the face center is
    // at -16); a sideways index still reaches well beyond the shoulder.
    const human = result.asset === "human";
    expect(result.far * result.sign, context).toBeGreaterThan(
      human && result.axis === "y" ? 30 : 60,
    );
    expect(result.span, context).toBeGreaterThan(human ? 18 : 28);
    expect(result.indexThickness, context).toBeGreaterThan(4);
    expect(result.indexThickness, context).toBeLessThan(12);
    expect(result.palmThickness, context).toBeGreaterThan(
      result.indexThickness * 1.8,
    );
    expect(result.indexInterior, context).toBeGreaterThan(5);
    expect(result.palmSkin, context).toBe(true);
    expect(result.gestureCount, context).toBe(1);
    expect(result.contained, context).toBe(true);
    for (const joint of result.joints) {
      expect(joint.wrist, context).toBe(true);
      expect(joint.shoulder, context).toBe(true);
      expect(joint.closed, context).toBe(true);
      expect(joint.expectedFill, context).toBe(true);
    }
    for (const hand of result.physicalHands) {
      expect(hand.count, context).toBeLessThanOrEqual(2);
      expect(hand.left, context).toBeLessThanOrEqual(1);
      expect(hand.right, context).toBeLessThanOrEqual(1);
      expect(hand.left + hand.right, context).toBe(hand.count);
    }
    if (result.width === 480) {
      expect(result.skinPixels, context).toBeGreaterThan(3);
      expect(result.outlinePixels, context).toBeGreaterThan(8);
    }
  }
}

test("point's actual index aims at the first named dialogue partner after placement, and shares two physical hands with props", async ({
  page,
}) => {
  const scenarios = members.flatMap((member): Scenario[] => {
    const cast = {
      a: member,
      b: { asset: "server", label: "상대" },
      c: { asset: "database", label: "다른 상대" },
    };
    return [
      {
        name: "named partner on right",
        target: "b",
        axis: "x",
        cast,
        panel: {
          actors: [{ id: "a", gesture: "point" }, "b"],
          dialogue: [{ from: "a", to: "b", text: "당신 차례예요." }],
        },
      },
      {
        name: "manual positions reverse the partner to left",
        target: "b",
        axis: "x",
        cast,
        panel: {
          actors: [
            { id: "a", gesture: "point", x: 0.75 },
            { id: "b", x: 0.25 },
          ],
          dialogue: [{ from: "a", to: "b", text: "당신 차례예요." }],
        },
      },
      {
        name: "first named partner wins while both hands hold or transfer",
        target: "c",
        axis: "x",
        cast,
        panel: {
          actors: ["b", { id: "a", gesture: "point", holding: "key" }, "c"],
          dialogue: [
            { from: "a", text: "준비됐어요." },
            { from: "a", to: "c", text: "당신 차례예요." },
            { from: "a", to: "b", text: "다음에 드릴게요." },
          ],
          transfer: [
            { from: "a", to: "b", prop: "request" },
            { from: "c", to: "a", prop: "data" },
          ],
        },
      },
      {
        name: "no named partner preserves leftward legacy point",
        axis: "x",
        cast,
        panel: {
          actors: [{ id: "a", gesture: "point" }, "b"],
          dialogue: [{ from: "a", text: "여기를 보세요." }],
        },
      },
    ];
  });
  const results = await inspectGestures(page, scenarios);
  expect(results).toHaveLength(72);
  expectMeaningfulHands(results);
  for (const result of results) {
    if (result.name.startsWith("first named"))
      expect(result.holdingCount, JSON.stringify(result)).toBe(1);
  }
});

test("point-up raises a narrow index above the wrist, keeps its arm connected and remains bounded for icon and human appearances", async ({
  page,
}) => {
  const scenarios: Scenario[] = members.map((member) => ({
    name: "upward point with a held prop and named right-side partner",
    axis: "y",
    cast: { a: member, b: { asset: "server", label: "상대" } },
    panel: {
      actors: [{ id: "a", gesture: "point-up", holding: "data" }, "b"],
      dialogue: [{ from: "a", to: "b", text: "위쪽 설명을 보세요." }],
    },
  }));
  const results = await inspectGestures(page, scenarios);
  expect(results).toHaveLength(18);
  expectMeaningfulHands(results);
  for (const result of results)
    expect(result.holdingCount, JSON.stringify(result)).toBe(1);
});

test("Korean upward-point spelling resolves and renders identically to English, including before inheritance and clearing", async ({
  page,
}) => {
  await page.goto("/");
  const result = await page.evaluate(async () => {
    const { readComic } = await import("/src/parse.ts");
    const { renderPanels } = await import("/src/index.ts");
    const english = `cast: {a: {asset: human, label: 설명자, appearance: {outfit: jacket, skinColor: "#b88968", outfitColor: "#5379a7"}}, b: {asset: server, label: 상대}}
panels:
  - actors: [{id: a, gesture: point-up, holding: data}, b]
    dialogue: [{from: a, to: b, text: 위를 보세요.}]
  - mode: before
    actors: [{id: a, expression: happy}]
  - mode: before
    actors: [{id: a, gesture: null, holding: null}]
`;
    const korean = `등장인물: {a: {그림: 사람, 이름표: 설명자, 외형: {옷: 재킷, 피부색: "#b88968", 옷색: "#5379a7"}}, b: {그림: 서버, 이름표: 상대}}
컷:
  - 인물: [{식별자: a, 손모양: 위가리키는손, 든소품: 데이터}, b]
    대사: [{화자: a, 상대: b, 내용: 위를 보세요.}]
  - 구성: 이전
    인물: [{식별자: a, 표정: 기쁨}]
  - 구성: 이전
    인물: [{식별자: a, 손모양: null, 든소품: null}]
`;
    const parsedEnglish = readComic(english),
      parsedKorean = readComic(korean);
    return {
      sameComic: JSON.stringify(parsedEnglish) === JSON.stringify(parsedKorean),
      gestures: parsedKorean.panels.map(
        (panel) => panel.actors[0].gesture ?? null,
      ),
      outputs: [480, 720, 960].flatMap((width) =>
        ["compact", "phone"].map((panelFormat) => {
          const expected = renderPanels(english, { width, panelFormat });
          const translated = renderPanels(korean, {
            너비: width,
            컷비율: panelFormat === "compact" ? "기본" : "모바일",
          });
          return {
            width,
            panelFormat,
            diagnostics: [expected.diagnostics, translated.diagnostics],
            sameSvg: expected.svg === translated.svg,
            samePanels:
              expected.panels.map((panel) => panel.svg).join("\n") ===
              translated.panels.map((panel) => panel.svg).join("\n"),
            hands: translated.panels.map(
              (panel) =>
                new DOMParser()
                  .parseFromString(panel.svg, "image/svg+xml")
                  .querySelectorAll('[data-hand="point-up"]').length,
            ),
          };
        }),
      ),
    };
  });
  expect(result.sameComic).toBe(true);
  expect(result.gestures).toEqual(["point-up", "point-up", null]);
  expect(result.outputs).toHaveLength(6);
  for (const output of result.outputs) {
    const context = JSON.stringify(output);
    expect(output.diagnostics, context).toEqual([[], []]);
    expect(output.sameSvg, context).toBe(true);
    expect(output.samePanels, context).toBe(true);
    expect(output.hands, context).toEqual([1, 1, 0]);
  }
});
