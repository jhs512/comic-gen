import { test, expect } from "@playwright/test";

test("speech bubble has no painted border across the tail entrance", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("컷 비율").selectOption("compact");
  await page
    .getByLabel("만화 코드")
    .fill(
      "cast: {a: {asset: server}}\npanels: [{actors: [a], dialogue: [{from: a, text: hello}]}]",
    );
  await expect(page.getByRole("alert")).toBeEmpty();
  await expect(page.locator("#preview")).toContainText("hello");
  const pixels = await page.locator("#preview svg").evaluate(async (svg) => {
    const image = new Image();
    const url = URL.createObjectURL(
      new Blob([svg.outerHTML], { type: "image/svg+xml" }),
    );
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext("2d")!;
    context.drawImage(image, 0, 0);
    URL.revokeObjectURL(url);
    // At 720px the one-line bubble's bottom is y=143, and its speaker is x=360.
    // Check both sides of the junction in the actual raster output.
    return [142, 143, 144].map((y) =>
      Array.from(context.getImageData(360, y, 1, 1).data),
    );
  });
  for (const pixel of pixels) expect(pixel).toEqual([255, 250, 240, 255]);
});

test("transfer connects to both characters at hand height after manual placement", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByLabel("만화 코드")
    .fill(
      "cast: {a: {asset: server}, b: {asset: database}}\npanels: [{actors: [{id: a, x: 0.75, y: 0.9, scale: 0.8}, {id: b, x: 0.25, y: 0.5}], transfer: [{from: a, to: b, prop: data}], dialogue: [{from: a, to: b, text: hello}]}]",
    );
  await expect(page.getByRole("alert")).toBeEmpty();
  for (const [actor, hand] of [
    ["a", "transfer"],
    ["b", "receive"],
  ]) {
    const body = await page
      .locator(
        `[data-character="${actor}"] > ${actor === "a" ? "rect" : "path"}`,
      )
      .first()
      .boundingBox();
    const palm = await page
      .locator(`[data-transfer] [data-hand="${hand}"]`)
      .boundingBox();
    expect(body).not.toBeNull();
    expect(palm).not.toBeNull();
    const palmY = palm!.y + palm!.height / 2;
    expect(palmY).toBeGreaterThan(body!.y);
    expect(palmY).toBeLessThan(body!.y + body!.height);
  }
});
