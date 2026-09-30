import { test, expect } from "@playwright/test";

test("author adds optional hands, held props and a directed transfer", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#preview [data-hand]")).toHaveCount(0);
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast:\n  a: {asset: server}\n  b: {asset: database}\npanels:\n  - actors:\n      - {id: a, gesture: point, holding: request}\n      - {id: b, expression: happy}\n    transfer: [{from: a, to: b, prop: data}]\n    dialogue: [{from: a, to: b, text: "이 데이터를 받아줘."}]`,
    );
  await expect(page.getByRole("alert")).toBeEmpty();
  await expect(page.locator('#preview [data-gesture="point"]')).toHaveCount(1);
  await expect(page.locator('#preview [data-holding="request"]')).toHaveCount(
    1,
  );
  await expect(page.locator("#preview [data-transfer]")).toHaveAttribute(
    "data-to",
    "b",
  );
  await expect(
    page.locator('#preview [data-transfer] [data-prop="data"]'),
  ).toHaveCount(1);
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast: {a: {asset: server}}\npanels: [{actors: [a], transfer: [{from: a, to: absent, prop: data}]}]`,
    );
  await expect(page.getByRole("alert")).toContainText("전달 대상");
});
