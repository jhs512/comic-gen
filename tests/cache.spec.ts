import { test, expect } from "@playwright/test";

const source = `cast: {a: {asset: server}, b: {asset: database}}\npanels:\n  - actors: [a, b]\n    dialogue: [{from: a, text: "첫 번째 컷"}]\n  - actors: [a, b]\n    dialogue: [{from: b, text: "두 번째 컷"}]`;

test("editing one panel reuses the other and changing output size refreshes both", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByLabel("만화 코드").fill(source);
  await expect(page.locator("#cache-status")).toContainText("새로 그린 컷 2");
  await page
    .getByLabel("만화 코드")
    .fill(source.replace("첫 번째 컷", "수정한 컷"));
  await expect(page.locator("#cache-status")).toContainText("재사용 1");
  await expect(page.locator("#preview")).toContainText("수정한 컷");
  await page.getByLabel("만화 너비").selectOption("960");
  await expect(page.locator("#cache-status")).toContainText("새로 그린 컷 2");
  await expect(page.locator("#preview svg")).toHaveAttribute("width", "960");
});
