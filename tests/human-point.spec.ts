import { test, expect } from "./mermaid-fixture";

test("human gestures retain filled skin, a shoulder-to-wrist connection and bounded PNG artwork after state changes", async ({
  page,
}) => {
  await page.route("**/human-point-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html><body style="margin:0"></body></html>',
    }),
  );
  await page.goto("/human-point-test.html");
  const results = await page.evaluate(async () => {
    const sdk = await import("/cdn/comic-gen.render.js");
    const results = [];
    const outfits = [
      { outfit: "shirt", skinColor: "#f0c8a6" },
      { outfit: "jacket", skinColor: "#b88968" },
      { outfit: "hoodie", skinColor: "#6d4031" },
    ];
    for (const width of [480, 720, 960])
      for (const panelFormat of ["compact", "phone"])
        for (const appearance of outfits) {
          const output = sdk.renderPanels(
            JSON.stringify({
              cast: {
                kim: {
                  asset: "human",
                  label: "김대리",
                  appearance: { ...appearance, outfitColor: "#5379a7" },
                },
              },
              panels: [
                { actors: [{ id: "kim", gesture: "point" }] },
                { mode: "before", actors: [{ id: "kim", gesture: "wave" }] },
                {
                  mode: "before",
                  actors: [{ id: "kim", gesture: "point", holding: "request" }],
                },
              ],
            }),
            { width, panelFormat },
          );
          if (output.diagnostics.length)
            throw new Error(output.diagnostics.join("\n"));
          for (const [cutIndex, panel] of output.panels.entries()) {
            const host = document.createElement("div");
            host.innerHTML = panel.svg;
            document.body.append(host);
            const actor = host.querySelector<SVGGElement>(
              '[data-character="kim"]',
            )!;
            const arm = actor.querySelector<SVGGElement>('[data-arm="left"]')!;
            const armPath = arm.querySelector<SVGPathElement>("path")!;
            const hand = actor.querySelector<SVGGElement>(
              '[data-side="left"][data-hand]',
            )!;
            const palmNode = hand.querySelector<SVGElement>("[data-palm]")!;
            const palm =
              palmNode instanceof SVGPathElement
                ? palmNode
                : palmNode.querySelector<SVGPathElement>("path")!;
            const body = actor.querySelector<SVGGElement>("[data-human]")!;
            const bodyShapes = [
              ...body.querySelectorAll<SVGGeometryElement>(
                "path,circle,ellipse,rect",
              ),
            ].filter((shape) => getComputedStyle(shape).fill !== "none");
            const toPalm = DOMMatrix.fromMatrix(palm.getCTM()!)
              .inverse()
              .multiply(armPath.getCTM()!);
            const toBody = bodyShapes.map((shape) => ({
              shape,
              matrix: DOMMatrix.fromMatrix(shape.getCTM()!)
                .inverse()
                .multiply(armPath.getCTM()!),
            }));
            const armBox = armPath.getBBox();
            let wristConnected = false,
              shoulderConnected = false;
            for (let x = armBox.x; x <= armBox.x + armBox.width; x += 0.75)
              for (let y = armBox.y; y <= armBox.y + armBox.height; y += 0.75) {
                const point = new DOMPoint(x, y);
                if (!armPath.isPointInFill(point)) continue;
                if (palm.isPointInFill(toPalm.transformPoint(point)))
                  wristConnected = true;
                if (
                  toBody.some(({ shape, matrix }) =>
                    shape.isPointInFill(matrix.transformPoint(point)),
                  )
                )
                  shoulderConnected = true;
              }
            const rgb = appearance.skinColor
              .slice(1)
              .match(/../g)!
              .map((hex) => parseInt(hex, 16));
            const expectedFill = `rgb(${rgb.join(", ")})`;
            const allPalms = [
              ...actor.querySelectorAll<SVGElement>("[data-palm]"),
            ].map((node) =>
              node instanceof SVGPathElement
                ? node
                : node.querySelector<SVGPathElement>("path")!,
            );
            const bounds = actor.getBBox(),
              matrix = DOMMatrix.fromMatrix(actor.getCTM()!);
            const corners = [
              [bounds.x, bounds.y],
              [bounds.x + bounds.width, bounds.y],
              [bounds.x, bounds.y + bounds.height],
              [bounds.x + bounds.width, bounds.y + bounds.height],
            ].map(([x, y]) => matrix.transformPoint(new DOMPoint(x, y)));
            let indexInterior = 0,
              skinPixels = 0;
            if (hand.getAttribute("data-hand") === "point") {
              const palmBox = palm.getBBox(),
                palmMatrix = DOMMatrix.fromMatrix(palm.getCTM()!);
              const probes = [];
              for (
                let x = palmBox.x + 2;
                x < palmBox.x + palmBox.width / 3;
                x += 1
              )
                for (
                  let y = palmBox.y + 2;
                  y < palmBox.y + palmBox.height - 2;
                  y += 1
                )
                  if (
                    [-1, 0, 1].every((dx) =>
                      [-1, 0, 1].every((dy) =>
                        palm.isPointInFill(new DOMPoint(x + dx, y + dy)),
                      ),
                    )
                  )
                    probes.push(new DOMPoint(x, y));
              indexInterior = probes.length;
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
                for (const probe of probes) {
                  const point = palmMatrix.transformPoint(probe);
                  const pixel = context.getImageData(
                    Math.round(point.x),
                    Math.round(point.y),
                    1,
                    1,
                  ).data;
                  if (
                    pixel[3] > 200 &&
                    rgb.every(
                      (value, index) => Math.abs(pixel[index] - value) < 35,
                    )
                  )
                    skinPixels++;
                }
              } finally {
                URL.revokeObjectURL(url);
              }
            }
            results.push({
              width,
              panelFormat,
              outfit: appearance.outfit,
              cutIndex,
              gesture: hand.getAttribute("data-hand"),
              wristConnected,
              shoulderConnected,
              skin: allPalms.every(
                (path) => getComputedStyle(path).fill === expectedFill,
              ),
              palmCount: allPalms.length,
              closedArm: /[zZ]\s*$/.test(armPath.getAttribute("d")!),
              armBehindBody: !!(
                arm.compareDocumentPosition(body) &
                Node.DOCUMENT_POSITION_FOLLOWING
              ),
              handInFront: !!(
                body.compareDocumentPosition(hand) &
                Node.DOCUMENT_POSITION_FOLLOWING
              ),
              indexInterior,
              skinPixels,
              contained: corners.every(
                (point) =>
                  point.x >= 20 &&
                  point.x <= panel.width - 20 &&
                  point.y >= 0 &&
                  point.y <= panel.height,
              ),
            });
            host.remove();
          }
        }
    return results;
  });
  expect(results).toHaveLength(54);
  for (const result of results) {
    const context = JSON.stringify(result);
    expect(result.gesture, context).toBe(
      result.cutIndex === 1 ? "wave" : "point",
    );
    expect(result.palmCount, context).toBe(result.cutIndex === 2 ? 2 : 1);
    expect(result.skin, context).toBe(true);
    expect(result.wristConnected, context).toBe(true);
    expect(result.shoulderConnected, context).toBe(true);
    expect(result.closedArm, context).toBe(true);
    expect(result.armBehindBody, context).toBe(true);
    expect(result.handInFront, context).toBe(true);
    expect(result.contained, context).toBe(true);
    if (result.gesture === "point") {
      expect(result.indexInterior, context).toBeGreaterThan(5);
      expect(result.skinPixels, context).toBeGreaterThan(5);
    }
  }
});
