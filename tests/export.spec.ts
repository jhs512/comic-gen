import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("PNG saves the clicked preview while a later edit keeps its current controls", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "PNG 저장" })).toBeEnabled();
  await page.getByLabel("PNG 배율").selectOption("1");
  const originalWidth = await page
    .locator("#preview svg")
    .first()
    .getAttribute("width");
  await page.evaluate(() => {
    const decode = HTMLImageElement.prototype.decode;
    HTMLImageElement.prototype.decode = async function () {
      if (this.src.startsWith("blob:")) {
        await new Promise<void>((resolve) => {
          Object.assign(window, { releasePng: resolve });
        });
      }
      return decode.call(this);
    };
  });
  const event = page.waitForEvent("download");
  await page.getByRole("button", { name: "PNG 저장" }).click();
  await expect
    .poll(() => page.evaluate(() => "releasePng" in window))
    .toBe(true);
  await page
    .getByLabel("만화 코드")
    .fill(
      "제목: 수정된 미리보기\n등장인물: {가: {그림: 서버}}\n컷: [{인물: [가]}]",
    );
  await expect(page.locator("#preview svg").first()).toHaveAttribute(
    "aria-label",
    "수정된 미리보기 · 1/1",
  );
  await expect(page.getByRole("button", { name: "PNG 저장" })).toBeEnabled();
  await page.evaluate(() => Reflect.get(window, "releasePng")());
  const download = await event;
  const bytes = await readFile((await download.path())!);
  expect(bytes.readUInt32BE(16)).toBe(Number(originalWidth));
  await expect(page.locator("#preview svg").first()).toHaveAttribute(
    "aria-label",
    "수정된 미리보기 · 1/1",
  );
  await expect(page.getByRole("button", { name: "PNG 저장" })).toBeEnabled();
});

test("author downloads a real PNG at the selected scale", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("시작 예제").selectOption("basic");
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
