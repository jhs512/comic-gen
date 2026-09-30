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

test("held prop remains visible beside three characters at narrow output width", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast: {a: {asset: server}, b: {asset: database}, c: {asset: client}}\npanels: [{actors: [{id: a, holding: request}, b, c]}]`,
    );
  await page.getByLabel("만화 너비").selectOption("480");
  await expect(page.getByRole("alert")).toBeEmpty();
  const prop = await page
    .locator("[data-holding] rect")
    .evaluate((node) => node.getBoundingClientRect().right);
  const neighbor = await page
    .locator('[data-character="b"] > path')
    .first()
    .evaluate((node) => node.getBoundingClientRect().left);
  expect(prop).toBeLessThan(neighbor);
});

test("dialogue direction follows actual coordinates after swapping character positions", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast: {a: {asset: server}, b: {asset: database}}\npanels:\n  - actors: [{id: a, x: 0.75}, {id: b, x: 0.25}]\n    dialogue: [{from: a, to: b, text: "왼쪽에 있는 너에게 말해요."}]`,
    );
  await expect(page.getByRole("alert")).toBeEmpty();
  await expect(
    page.locator('[data-character="a"] > g').first(),
  ).toHaveAttribute("transform", /translate\(-4 /);
});
