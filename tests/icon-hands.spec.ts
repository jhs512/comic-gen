import { test, expect } from "./mermaid-fixture";

test("icon fingers stay filled and connected at small display sizes without clipping", async ({
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
            const result = sdk.renderPanels(
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
            if (result.diagnostics.length)
              throw new Error(result.diagnostics.join("\n"));
            const panel = result.panels[0];
            const host = document.createElement("div");
            host.style.width = `${displayWidth}px`;
            host.innerHTML = panel.svg;
            document.body.append(host);
            const root = host.querySelector("svg")!;
            root.style.width = "100%";
            root.style.height = "auto";
            for (const actor of root.querySelectorAll<SVGGElement>(
              "[data-character]",
            )) {
              const hand = actor.querySelector<SVGGElement>("[data-hand]")!;
              const matrix = DOMMatrix.fromMatrix(actor.getCTM()!);
              const samples =
                gesture === "point"
                  ? [
                      [-82, 0],
                      [-77, 0],
                      [-67, 0],
                    ]
                  : [
                      [-79.75, -42],
                      [-67.75, -42],
                      [-55.75, -42],
                      [-43.75, -42],
                      [-65, -20],
                    ];
              const palm = hand.querySelector<SVGPathElement>(
                ':scope > path[fill="white"]',
              );
              const fingerTops =
                gesture === "wave"
                  ? samples
                      .slice(0, 4)
                      .map(([x]) =>
                        Array.from(
                          { length: 30 },
                          (_, index) => -60 + index,
                        ).find((y) => palm!.isPointInFill(new DOMPoint(x, y))),
                      )
                  : [];
              // Paint the actual hand on a contrasting background so white fill
              // can be distinguished from empty space at mobile display sizes.
              const image = new Image();
              const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${displayWidth}" height="${Math.ceil(root.getBoundingClientRect().height)}"><rect width="100%" height="100%" fill="#5379a7"/><g transform="matrix(${matrix.a} ${matrix.b} ${matrix.c} ${matrix.d} ${matrix.e} ${matrix.f})" stroke="#303341" stroke-width="2.8" stroke-linecap="round">${hand.outerHTML}</g></svg>`;
              const url = URL.createObjectURL(
                new Blob([svg], { type: "image/svg+xml" }),
              );
              image.src = url;
              await image.decode();
              const canvas = document.createElement("canvas");
              canvas.width = image.width;
              canvas.height = image.height;
              const context = canvas.getContext("2d")!;
              context.drawImage(image, 0, 0);
              const brightness = samples.map(([x, y]) => {
                const point = matrix.transformPoint({ x, y });
                const pixel = context.getImageData(
                  Math.floor(point.x),
                  Math.floor(point.y),
                  1,
                  1,
                ).data;
                return Math.min(...pixel.slice(0, 3));
              });
              URL.revokeObjectURL(url);
              const box = hand.getBBox();
              checks.push({
                width,
                panelFormat,
                gesture,
                displayWidth,
                asset: actor.getAttribute("data-character"),
                brightness,
                balancedFingers:
                  gesture !== "wave" ||
                  (fingerTops.every((y) => y !== undefined) &&
                    Math.max(...fingerTops) - Math.min(...fingerTops) <= 2),
                withinBounds:
                  box.x - 1.4 >= -92 &&
                  box.x + box.width + 1.4 <= 92 &&
                  box.y - 1.4 >= -70,
              });
            }
            host.remove();
          }
    return checks;
  });
  expect(checks).toHaveLength(72);
  for (const check of checks) {
    expect(check.withinBounds, JSON.stringify(check)).toBe(true);
    expect(check.balancedFingers, JSON.stringify(check)).toBe(true);
    for (const value of check.brightness)
      expect(value, JSON.stringify(check)).toBeGreaterThan(185);
  }
});
