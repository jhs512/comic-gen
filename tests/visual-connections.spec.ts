import type { Page } from "@playwright/test";
import { test, expect } from "./mermaid-fixture";

async function openDocument(page: Page) {
  await page.route("**/visual-connections-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html><body style="margin:0"><main></main></body></html>',
    }),
  );
  await page.goto("/visual-connections-test.html");
}

test("speech bubble has no painted border across its actual tail entrance", async ({
  page,
}) => {
  await openDocument(page);
  const result = await page.evaluate(async () => {
    const rendererModule = "/cdn/comic-gen.render.js";
    const sdk = await import(rendererModule);
    const output = sdk.renderPanels(
      JSON.stringify({
        cast: { a: { asset: "server" } },
        panels: [{ actors: ["a"], dialogue: [{ from: "a", text: "hello" }] }],
      }),
      { width: 720, panelFormat: "compact" },
    );
    document.querySelector("main")!.innerHTML = output.panels[0].svg;
    const outline = document.querySelector<SVGPathElement>(
      "[data-dialogue] path",
    )!;
    const points = [];
    for (let length = 0; length < outline.getTotalLength(); length += 0.25)
      points.push(outline.getPointAtLength(length));
    const rows = new Map<number, number>();
    for (const point of points) {
      const row = Math.round(point.y * 10) / 10;
      rows.set(row, (rows.get(row) ?? 0) + 1);
    }
    const bodyBottom = Math.max(
      ...[...rows].filter(([, count]) => count >= 20).map(([y]) => y),
    );
    const horizontal = points
      .filter((point) => Math.abs(point.y - bodyBottom) < 0.01)
      .sort((a, b) => a.x - b.x);
    const gaps = horizontal
      .slice(1)
      .map((point, index) => ({
        width: point.x - horizontal[index].x,
        x: (point.x + horizontal[index].x) / 2,
      }))
      .sort((a, b) => b.width - a.width);
    const entrance = gaps[0];
    const blob = await sdk.exportPng(output.panels[0]),
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
      context.fillStyle = getComputedStyle(outline).fill;
      context.fillRect(0, 0, 1, 1);
      const fill = Array.from(context.getImageData(0, 0, 1, 1).data);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      const matrix = DOMMatrix.fromMatrix(outline.getCTM()!);
      const pixels = [-1, 0, 1].map((dy) => {
        const point = matrix.transformPoint(
          new DOMPoint(entrance.x, bodyBottom + dy),
        );
        return Array.from(
          context.getImageData(Math.round(point.x), Math.round(point.y), 1, 1)
            .data,
        );
      });
      return {
        diagnostics: output.diagnostics,
        gap: entrance.width,
        fill,
        pixels,
      };
    } finally {
      URL.revokeObjectURL(url);
    }
  });
  expect(result.diagnostics).toEqual([]);
  expect(result.gap).toBeGreaterThan(10);
  for (const pixel of result.pixels) expect(pixel).toEqual(result.fill);
});

test("transfer endpoints touch the characters' existing palms after placement and shared actions", async ({
  page,
}) => {
  await openDocument(page);
  const results = await page.evaluate(async () => {
    const rendererModule = "/cdn/comic-gen.render.js";
    const sdk = await import(rendererModule);
    const scenarios: Array<{
      name: string;
      cast: Record<
        string,
        { asset: string; appearance?: { skinColor: string; outfit?: string } }
      >;
      panels: Array<{
        actors: Array<Record<string, string | number>>;
        transfer: Array<{ from: string; to: string; prop: string }>;
      }>;
    }> = [
      {
        name: "reversed manual positions and unequal scale",
        cast: { a: { asset: "server" }, b: { asset: "database" } },
        panels: [
          {
            actors: [
              { id: "a", x: 0.75, y: 0.9, scale: 0.8 },
              { id: "b", x: 0.25, y: 0.5 },
            ],
            transfer: [{ from: "a", to: "b", prop: "data" }],
          },
        ],
      },
      {
        name: "vertical transfer with equal horizontal positions",
        cast: {
          a: { asset: "human", appearance: { skinColor: "#b88968" } },
          b: { asset: "client" },
        },
        panels: [
          {
            actors: [
              { id: "a", x: 0.5, y: 0.2, scale: 0.5 },
              { id: "b", x: 0.5, y: 0.85, scale: 0.5 },
            ],
            transfer: [{ from: "a", to: "b", prop: "key" }],
          },
        ],
      },
      {
        name: "gestures, held props and repeated transfers share hands",
        cast: {
          a: { asset: "client" },
          b: {
            asset: "human",
            appearance: { skinColor: "#6d4031", outfit: "hoodie" },
          },
          c: { asset: "database" },
        },
        panels: [
          {
            actors: [
              { id: "a", gesture: "wave", holding: "key" },
              { id: "b", gesture: "point", holding: "request" },
              { id: "c", gesture: "wave", holding: "data" },
            ],
            transfer: [
              { from: "a", to: "b", prop: "data" },
              { from: "a", to: "b", prop: "request" },
              { from: "b", to: "c", prop: "request" },
              { from: "c", to: "a", prop: "key" },
            ],
          },
        ],
      },
    ];
    const results = [];
    for (const width of [480, 720, 960])
      for (const panelFormat of ["compact", "phone"])
        for (const scenario of scenarios) {
          const output = sdk.renderPanels(
            JSON.stringify({ cast: scenario.cast, panels: scenario.panels }),
            {
              width,
              panelFormat,
            },
          );
          if (output.diagnostics.length)
            throw new Error(
              `${scenario.name}: ${output.diagnostics.join("\n")}`,
            );
          document.querySelector("main")!.innerHTML = output.panels[0].svg;
          const actors = [
            ...document.querySelectorAll<SVGGElement>("[data-character]"),
          ];
          const relations = [
            ...document.querySelectorAll<SVGGElement>("[data-transfer]"),
          ];
          const endpoints = relations.flatMap((relation) => {
            const link = relation.querySelector<SVGPathElement>(
              "[data-transfer-link]",
            )!;
            const matrix = DOMMatrix.fromMatrix(link.getCTM()!);
            return [0, link.getTotalLength()].map((length, index) => {
              const id = relation.getAttribute(
                index === 0 ? "data-transfer" : "data-to",
              )!;
              const actor = actors.find(
                (node) => node.getAttribute("data-character") === id,
              )!;
              const endpoint = matrix.transformPoint(
                link.getPointAtLength(length),
              );
              const matchingHands = [
                ...actor.querySelectorAll<SVGGElement>("[data-hand]"),
              ].filter((hand) => {
                const node = hand.querySelector<SVGElement>("[data-palm]")!;
                const palm =
                  node instanceof SVGPathElement
                    ? node
                    : node.querySelector<SVGPathElement>("path")!;
                const point = DOMMatrix.fromMatrix(palm.getCTM()!)
                  .inverse()
                  .transformPoint(endpoint);
                return palm.isPointInFill(point);
              });
              return { id, matches: matchingHands.length };
            });
          });
          const hands = actors.map((actor) => {
            const physicalHands = [
              ...actor.querySelectorAll(
                "[data-hand],[data-human-part^='resting-hand-']",
              ),
            ];
            const counts = ["left", "right"].map(
              (side) =>
                physicalHands.filter(
                  (hand) =>
                    hand.getAttribute("data-side") === side ||
                    hand.getAttribute("data-human-part") ===
                      `resting-hand-${side}`,
                ).length,
            );
            const palms = [
              ...actor.querySelectorAll<SVGElement>("[data-palm]"),
            ].map((node) =>
              node instanceof SVGPathElement
                ? node
                : node.querySelector<SVGPathElement>("path")!,
            );
            const id = actor.getAttribute("data-character")!;
            const member = scenario.cast[id];
            const expectedSkin =
              member.asset === "human" ? member.appearance!.skinColor : "white";
            const swatch = document.createElement("span");
            swatch.style.color = expectedSkin;
            document.body.append(swatch);
            const color = getComputedStyle(swatch).color;
            swatch.remove();
            const arms = [...actor.querySelectorAll<SVGGElement>("[data-arm]")];
            const joints = arms.map((arm) => {
              const path = arm.querySelector<SVGPathElement>("path")!;
              const hand = actor.querySelector<SVGGElement>(
                `[data-hand][data-side="${arm.getAttribute("data-arm")}"]`,
              )!;
              const node = hand.querySelector<SVGElement>("[data-palm]")!;
              const palm =
                node instanceof SVGPathElement
                  ? node
                  : node.querySelector<SVGPathElement>("path")!;
              const matrix = DOMMatrix.fromMatrix(palm.getCTM()!)
                .inverse()
                .multiply(path.getCTM()!);
              const box = path.getBBox();
              for (let x = box.x; x <= box.x + box.width; x += 0.75)
                for (let y = box.y; y <= box.y + box.height; y += 0.75) {
                  const point = new DOMPoint(x, y);
                  if (
                    path.isPointInFill(point) &&
                    palm.isPointInFill(matrix.transformPoint(point))
                  )
                    return true;
                }
              return false;
            });
            const holding = actor.querySelector<SVGGElement>("[data-holding]");
            const prop = holding?.querySelector("[data-prop]");
            const thumbInFront =
              !prop ||
              [...holding!.querySelectorAll("path")].some(
                (path) =>
                  !path.closest("[data-prop]") &&
                  getComputedStyle(path).fill === color &&
                  !!(
                    prop.compareDocumentPosition(path) &
                    Node.DOCUMENT_POSITION_FOLLOWING
                  ),
              );
            return {
              id,
              counts,
              physicalCount: physicalHands.length,
              armCount: arms.length,
              palmCount: palms.length,
              joints,
              correctSkin: palms.every(
                (path) => getComputedStyle(path).fill === color,
              ),
              thumbInFront,
            };
          });
          const panel = output.panels[0];
          const bounds = actors.map((actor) => {
            const box = actor.getBBox(),
              matrix = DOMMatrix.fromMatrix(actor.getCTM()!);
            return [
              [box.x, box.y],
              [box.x + box.width, box.y + box.height],
            ].every(([x, y]) => {
              const point = matrix.transformPoint(new DOMPoint(x, y));
              return (
                point.x >= 20 &&
                point.x <= panel.width - 20 &&
                point.y >= 0 &&
                point.y <= panel.height
              );
            });
          });
          results.push({
            width,
            panelFormat,
            name: scenario.name,
            relations: relations.length,
            expectedRelations: scenario.panels[0].transfer.length,
            endpoints,
            hands,
            bounds,
            externalHands: relations.reduce(
              (sum, node) => sum + node.querySelectorAll("[data-hand]").length,
              0,
            ),
          });
        }
    return results;
  });
  expect(results).toHaveLength(18);
  for (const result of results) {
    const context = JSON.stringify(result);
    expect(result.relations, context).toBe(result.expectedRelations);
    expect(result.endpoints, context).toHaveLength(
      result.expectedRelations * 2,
    );
    expect(result.externalHands, context).toBe(0);
    for (const endpoint of result.endpoints)
      expect(endpoint.matches, context).toBe(1);
    for (const hand of result.hands) {
      expect(hand.physicalCount, context).toBeLessThanOrEqual(2);
      expect(
        hand.counts.reduce((sum, count) => sum + count, 0),
        context,
      ).toBe(hand.physicalCount);
      for (const count of hand.counts)
        expect(count, context).toBeLessThanOrEqual(1);
      expect(hand.armCount, context).toBe(hand.palmCount);
      expect(hand.correctSkin, context).toBe(true);
      expect(hand.thumbInFront, context).toBe(true);
      for (const joint of hand.joints) expect(joint, context).toBe(true);
    }
    for (const contained of result.bounds)
      expect(contained, context).toBe(true);
  }
});
