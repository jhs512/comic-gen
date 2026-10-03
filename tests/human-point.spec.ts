import { test, expect } from "./mermaid-fixture";

test("a person's pointing finger is filled and its palm connects to the shoulder at narrow and wide sizes", async ({
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
    for (const width of [480, 720, 960])
      for (const panelFormat of ["compact", "phone"])
        for (const outfit of ["shirt", "jacket", "hoodie"]) {
          const output = sdk.renderPanels(
            JSON.stringify({
              cast: {
                kim: {
                  asset: "human",
                  label: "김대리",
                  appearance: { outfit, outfitColor: "#5379a7" },
                },
              },
              panels: [{ actors: [{ id: "kim", gesture: "point" }] }],
            }),
            { width, panelFormat },
          );
          if (output.diagnostics.length)
            throw new Error(output.diagnostics.join("\n"));
          const panel = output.panels[0];
          const host = document.createElement("div");
          host.style.width = `${width}px`;
          host.innerHTML = panel.svg;
          document.body.append(host);
          const actor = host.querySelector<SVGGElement>(
            '[data-character="kim"]',
          )!;
          const hand = actor.querySelector<SVGGElement>('[data-hand="point"]')!;
          const palm = hand.querySelector("circle")!;
          const hx = Number(palm.getAttribute("cx")),
            hy = Number(palm.getAttribute("cy")),
            radius = Number(palm.getAttribute("r"));
          const sx = -36,
            sy = 34,
            length = Math.hypot(hx - sx, hy - sy);
          const endX = hx - ((hx - sx) / length) * radius,
            endY = hy - ((hy - sy) / length) * radius;
          const image = new Image();
          const url = URL.createObjectURL(
            new Blob([panel.svg], { type: "image/svg+xml" }),
          );
          image.src = url;
          await image.decode();
          const canvas = Object.assign(document.createElement("canvas"), {
            width: panel.width,
            height: panel.height,
          });
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(image, 0, 0);
          const matrix = DOMMatrix.fromMatrix(actor.getCTM()!);
          let white = 0,
            samples = 0;
          for (let t = 0.2; t <= 0.8; t += 0.05) {
            const point = matrix.transformPoint(
              new DOMPoint(sx + (endX - sx) * t, sy + (endY - sy) * t),
            );
            const [r, g, b] = ctx.getImageData(
              Math.round(point.x),
              Math.round(point.y),
              1,
              1,
            ).data;
            if (r > 245 && g > 245 && b > 245) white++;
            samples++;
          }
          const finger = [...hand.querySelectorAll("path")].some(
            (path) => path.getAttribute("fill") === palm.getAttribute("fill"),
          );
          const bounds = actor.getBBox(),
            transform = DOMMatrix.fromMatrix(actor.getCTM()!);
          const left = transform.transformPoint(
            new DOMPoint(bounds.x, bounds.y),
          ).x;
          const right = transform.transformPoint(
            new DOMPoint(bounds.x + bounds.width, bounds.y),
          ).x;
          results.push({
            width,
            panelFormat,
            outfit,
            gap: white / samples,
            finger,
            left,
            right,
          });
          URL.revokeObjectURL(url);
          host.remove();
        }
    return results;
  });
  for (const result of results) {
    expect(result.gap, JSON.stringify(result)).toBeLessThan(0.2);
    expect(result.finger, JSON.stringify(result)).toBe(true);
    expect(result.left).toBeGreaterThanOrEqual(20);
    expect(result.right).toBeLessThanOrEqual(result.width - 20);
  }
});
