import { test, expect } from "./mermaid-fixture";

test("icon hands are filled, naturally separated and attached at small display sizes", async ({
  page,
}) => {
  await page.route("**/icon-hands-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html><body style="margin:0"></body></html>',
    }),
  );
  await page.goto("/icon-hands-test.html");
  const checks = await page.evaluate(async () => {
    const sdk = await import("/cdn/comic-gen.render.js");
    const checks = [];
    for (const width of [480, 720, 960])
      for (const panelFormat of ["compact", "phone"])
        for (const gesture of ["point", "wave"])
          for (const displayWidth of [320, 390]) {
            const output = sdk.renderPanels(
              JSON.stringify({
                cast: {
                  round: { asset: "client", label: "원형" },
                  box: { asset: "server", label: "사각형" },
                  cylinder: { asset: "database", label: "원통" },
                },
                panels: [
                  {
                    actors: ["round", "box", "cylinder"].map((id) => ({
                      id,
                      gesture,
                    })),
                  },
                ],
              }),
              { width, panelFormat },
            );
            if (output.diagnostics.length)
              throw new Error(output.diagnostics.join("\n"));
            const host = document.createElement("div");
            host.style.width = `${displayWidth}px`;
            host.innerHTML = output.panels[0].svg;
            document.body.append(host);
            const root = host.querySelector("svg")!;
            root.style.width = "100%";
            root.style.height = "auto";
            for (const actor of root.querySelectorAll<SVGGElement>(
              "[data-character]",
            )) {
              const hand = actor.querySelector<SVGGElement>("[data-hand]")!;
              const arm =
                actor.querySelector<SVGGElement>('[data-arm="left"]')!;
              const palmNode = hand.querySelector<SVGElement>("[data-palm]")!;
              const palm =
                palmNode instanceof SVGPathElement
                  ? palmNode
                  : palmNode.querySelector<SVGPathElement>("path")!;
              const armPath = arm.querySelector<SVGPathElement>("path")!;
              const box = palm.getBBox();
              const actorMatrix = DOMMatrix.fromMatrix(actor.getCTM()!);
              const palmMatrix = DOMMatrix.fromMatrix(palm.getCTM()!);
              const armToPalm = palmMatrix
                .inverse()
                .multiply(armPath.getCTM()!);
              const armBox = armPath.getBBox();
              let wristConnected = false;
              for (let x = armBox.x; x <= armBox.x + armBox.width; x += 0.75)
                for (
                  let y = armBox.y;
                  y <= armBox.y + armBox.height;
                  y += 0.75
                ) {
                  const point = new DOMPoint(x, y);
                  if (
                    armPath.isPointInFill(point) &&
                    palm.isPointInFill(armToPalm.transformPoint(point))
                  )
                    wristConnected = true;
                }

              // Infer fingers from the silhouette; do not freeze old coordinates
              // or require the unnatural parallel fingers to have equal heights.
              let fingerRuns: Array<[number, number]> = [];
              let fingerRow = 0,
                bestWidth = 0;
              if (gesture === "wave") {
                for (let y = box.y; y < box.y + box.height * 0.65; y += 0.5) {
                  const runs: Array<[number, number]> = [];
                  let start: number | undefined;
                  for (let x = box.x; x <= box.x + box.width + 0.5; x += 0.5) {
                    const filled = palm.isPointInFill(new DOMPoint(x, y));
                    if (filled && start === undefined) start = x;
                    if (!filled && start !== undefined) {
                      runs.push([start, x - 0.5]);
                      start = undefined;
                    }
                  }
                  const narrowest = Math.min(
                    ...runs.map(([left, right]) => right - left),
                  );
                  if (runs.length === 4 && narrowest > bestWidth) {
                    fingerRuns = runs;
                    fingerRow = y;
                    bestWidth = narrowest;
                  }
                }
              }
              const tips = fingerRuns
                .map(([left, right]) => {
                  for (let y = box.y; y <= fingerRow; y += 0.5)
                    for (let x = left; x <= right; x += 0.5)
                      if (palm.isPointInFill(new DOMPoint(x, y))) return y;
                  return fingerRow;
                })
                .sort((a, b) => a - b);
              const probes =
                gesture === "wave"
                  ? fingerRuns.map(
                      ([left, right]) =>
                        new DOMPoint((left + right) / 2, fingerRow + 3),
                    )
                  : (() => {
                      const candidates = [];
                      for (let x = box.x + 2; x < box.x + box.width / 3; x += 1)
                        for (
                          let y = box.y + 2;
                          y < box.y + box.height - 2;
                          y += 1
                        )
                          if (
                            [-1, 0, 1].every((dx) =>
                              [-1, 0, 1].every((dy) =>
                                palm.isPointInFill(
                                  new DOMPoint(x + dx, y + dy),
                                ),
                              ),
                            )
                          )
                            candidates.push(new DOMPoint(x, y));
                      return candidates.length
                        ? [candidates[Math.floor(candidates.length / 2)]]
                        : [];
                    })();

              // Rasterize the real arm and hand at mobile size. Motion marks are
              // separate from the connected physical silhouette.
              const clone = hand.cloneNode(true) as SVGGElement;
              clone
                .querySelectorAll("[data-wave-motion]")
                .forEach((node) => node.remove());
              const image = new Image();
              const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${displayWidth}" height="${Math.ceil(root.getBoundingClientRect().height)}"><g transform="matrix(${actorMatrix.a} ${actorMatrix.b} ${actorMatrix.c} ${actorMatrix.d} ${actorMatrix.e} ${actorMatrix.f})" stroke="#303341" stroke-width="2.8" stroke-linecap="round">${arm.outerHTML}${clone.outerHTML}</g></svg>`;
              const url = URL.createObjectURL(
                new Blob([svg], { type: "image/svg+xml" }),
              );
              image.src = url;
              await image.decode();
              const canvas = Object.assign(document.createElement("canvas"), {
                width: image.width,
                height: image.height,
              });
              const context = canvas.getContext("2d")!;
              context.drawImage(image, 0, 0);
              const pixels = context.getImageData(
                0,
                0,
                canvas.width,
                canvas.height,
              ).data;
              const painted = new Set<number>();
              for (let index = 0; index < pixels.length; index += 4)
                if (pixels[index + 3] >= 80) painted.add(index / 4);
              const totalPainted = painted.size,
                components = [];
              while (painted.size) {
                const seed = painted.values().next().value!;
                painted.delete(seed);
                const queue = [seed];
                for (let cursor = 0; cursor < queue.length; cursor++) {
                  const index = queue[cursor],
                    x = index % canvas.width,
                    y = Math.floor(index / canvas.width);
                  for (let dx = -1; dx <= 1; dx++)
                    for (let dy = -1; dy <= 1; dy++) {
                      if (
                        x + dx < 0 ||
                        x + dx >= canvas.width ||
                        y + dy < 0 ||
                        y + dy >= canvas.height
                      )
                        continue;
                      const neighbor = index + dx + dy * canvas.width;
                      if (painted.delete(neighbor)) queue.push(neighbor);
                    }
                }
                components.push(queue.length);
              }
              const brightness = probes.map((probe) => {
                const point = palmMatrix.transformPoint(probe);
                const patch = context.getImageData(
                  Math.floor(point.x) - 1,
                  Math.floor(point.y) - 1,
                  3,
                  3,
                ).data;
                let brightest = 0;
                for (let index = 0; index < patch.length; index += 4)
                  if (patch[index + 3] > 200)
                    brightest = Math.max(
                      brightest,
                      Math.min(...patch.slice(index, index + 3)),
                    );
                return brightest;
              });
              // A group's getBBox includes empty corners of a rotated child's
              // bounding rectangle. Measure the actual contour and its stroke.
              const paintedBounds = {
                left: Infinity,
                right: -Infinity,
                top: Infinity,
              };
              for (const shape of hand.querySelectorAll<SVGGeometryElement>(
                "path,circle,ellipse,rect",
              )) {
                const transform = actorMatrix
                  .inverse()
                  .multiply(shape.getCTM()!);
                const stroke =
                  getComputedStyle(shape).stroke === "none"
                    ? 0
                    : (parseFloat(getComputedStyle(shape).strokeWidth) / 2) *
                      Math.max(
                        Math.hypot(transform.a, transform.b),
                        Math.hypot(transform.c, transform.d),
                      );
                const length = shape.getTotalLength();
                for (
                  let distance = 0;
                  distance <= length + 0.25;
                  distance += 0.25
                ) {
                  const point = transform.transformPoint(
                    shape.getPointAtLength(Math.min(distance, length)),
                  );
                  // A 0.25px contour step bounds any missed extremum by 0.125px.
                  paintedBounds.left = Math.min(
                    paintedBounds.left,
                    point.x - stroke - 0.125,
                  );
                  paintedBounds.right = Math.max(
                    paintedBounds.right,
                    point.x + stroke + 0.125,
                  );
                  paintedBounds.top = Math.min(
                    paintedBounds.top,
                    point.y - stroke - 0.125,
                  );
                }
              }
              checks.push({
                width,
                panelFormat,
                gesture,
                displayWidth,
                asset: actor.getAttribute("data-character"),
                wristConnected,
                closedArm: /[zZ]\s*$/.test(armPath.getAttribute("d")!),
                filledPalm:
                  getComputedStyle(palm).fill === "rgb(255, 255, 255)",
                fingers: fingerRuns.length,
                tipSpread: tips.length ? tips[tips.length - 1] - tips[0] : 0,
                tipProminence: tips.length ? tips[1] - tips[0] : 0,
                palmHeight: box.height,
                brightness,
                painted: totalPainted,
                connectedRatio: Math.max(...components) / totalPainted,
                paintedBounds,
                withinBounds:
                  paintedBounds.left >= -92 &&
                  paintedBounds.right <= 92 &&
                  paintedBounds.top >= -70,
                singlePalm: hand.querySelectorAll("[data-palm]").length === 1,
                animations: hand.querySelectorAll(
                  "animate,animateTransform,animateMotion,set",
                ).length,
              });
              URL.revokeObjectURL(url);
            }
            host.remove();
          }
    return checks;
  });
  expect(checks).toHaveLength(72);
  for (const check of checks) {
    const context = JSON.stringify(check);
    expect(check.withinBounds, context).toBe(true);
    expect(check.wristConnected, context).toBe(true);
    expect(check.closedArm, context).toBe(true);
    expect(check.filledPalm, context).toBe(true);
    expect(check.singlePalm, context).toBe(true);
    expect(check.animations, context).toBe(0);
    expect(check.painted, context).toBeGreaterThan(20);
    expect(check.connectedRatio, context).toBeGreaterThan(0.98);
    expect(check.brightness, context).toHaveLength(
      check.gesture === "wave" ? 4 : 1,
    );
    for (const value of check.brightness)
      expect(value, context).toBeGreaterThan(185);
    if (check.gesture === "wave") {
      expect(check.fingers, context).toBe(4);
      expect(check.tipSpread, context).toBeGreaterThan(2);
      expect(check.tipSpread, context).toBeLessThan(check.palmHeight * 0.5);
      expect(check.tipProminence, context).toBeLessThan(
        check.palmHeight * 0.25,
      );
    }
  }
});
