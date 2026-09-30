import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("author downloads a real PNG at the selected scale", async ({ page }) => {
  await page.goto("/");
  const size = await page.locator("#preview svg").evaluate((svg) => ({
    width: Number(svg.getAttribute("width")),
    height: Number(svg.getAttribute("height")),
  }));
  await page.getByLabel("PNG 배율").selectOption("2");
  const event = page.waitForEvent("download");
  await page.getByRole("button", { name: "PNG 저장" }).click();
  const download = await event;
  expect(download.suggestedFilename()).toBe("comic.png");
  const bytes = await readFile((await download.path())!);
  expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  expect(bytes.readUInt32BE(16)).toBe(size.width * 2);
  expect(bytes.readUInt32BE(20)).toBe(size.height * 2);
  const pixels = await page.evaluate(
    async (data) => {
      const image = await createImageBitmap(
        new Blob([new Uint8Array(data)], { type: "image/png" }),
      );
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d")!;
      context.drawImage(image, 0, 0);
      return [...context.getImageData(0, 0, 1, 1).data];
    },
    [...bytes],
  );
  expect(pixels[3]).toBe(255);
});
