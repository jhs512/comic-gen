import { test, expect } from "@playwright/test";

test("author can adjust one actor and a bubble while keeping defaults for others", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast: {a: {asset: server}, b: {asset: database}}\npanels:\n  - actors: [{id: a, x: 0.25, scale: 0.8}, b]\n    dialogue: [{from: a, text: "작게 배치해요", x: 0.35, fontSize: 24}]`,
    );
  await expect(page.getByRole("alert")).toBeEmpty();
  await expect(page.locator('#preview [data-character="a"]')).toHaveAttribute(
    "transform",
    /scale\(0.8\)/,
  );
  await expect(page.locator("#preview [data-dialogue] text")).toHaveAttribute(
    "font-size",
    "24",
  );
  await page
    .getByLabel("만화 코드")
    .fill(`cast: {a: {asset: server}}\npanels: [{actors: [{id: a, x: 4}]}]`);
  await expect(page.getByRole("alert")).toContainText("x");
});
