import { test, expect } from "@playwright/test";

test("author edits a dialogue and downloads the displayed SVG", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#preview svg")).toBeVisible();
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast:\n  web: {asset: server, label: 웹 서버}\n  db: {asset: database, label: DB}\npanels:\n  - actors: [web, db]\n    dialogue:\n      - {from: web, to: db, text: "데이터를 부탁해!"}\n      - {from: db, text: "바로 보낼게!"}`,
    );
  await expect(page.locator("#preview")).toContainText("데이터를 부탁해!");
  await expect(page.locator("#preview [data-character]")).toHaveCount(2);
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "SVG 저장" }).click();
  expect((await download).suggestedFilename()).toBe("comic.svg");
});

test("three characters reuse roles across panels and long dialogue stays inside bubbles", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast:\n  a: {asset: client}\n  b: {asset: server}\n  c: {asset: database}\npanels:\n  - actors: [a, b, c]\n    dialogue:\n      - {from: a, to: b, text: "이것은 아주 긴 한국어 설명입니다. 서버와 데이터베이스의 역할을 비교하면서 요청과 응답을 함께 이해해 봅시다. AnExtremelyLongUnbrokenEnglishIdentifierMustAlsoWrapCorrectly"}\n  - actors: [b, c]\n    dialogue: [{from: b, to: c, text: "다음 컷에서도 같은 캐릭터를 사용해요."}]`,
    );
  await expect(page.locator("#preview [data-panel]")).toHaveCount(2);
  await expect(page.locator("#preview [data-character]")).toHaveCount(5);
  await expect(page.locator("#preview [data-dialogue] tspan")).not.toHaveCount(
    0,
  );
  const contained = await page
    .locator("#preview [data-dialogue]")
    .evaluateAll((groups) =>
      groups.every((group) => {
        const rect = group.querySelector("rect") as SVGGraphicsElement;
        const text = group.querySelector("text") as SVGGraphicsElement;
        const a = rect.getBBox(),
          b = text.getBBox();
        return (
          b.x >= a.x &&
          b.x + b.width <= a.x + a.width &&
          b.y >= a.y &&
          b.y + b.height <= a.y + a.height
        );
      }),
    );
  expect(contained).toBe(true);
  await expect(
    page.locator("#preview [data-dialogue]").first(),
  ).toHaveAttribute("data-to", "b");
});

test("invalid references and markup-like dialogue are handled as author input", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast: {a: {asset: server}}\npanels: [{actors: [a], dialogue: [{from: a, to: missing, text: hello}]}]`,
    );
  await expect(page.getByRole("alert")).toContainText("대화 상대");
  await expect(page.getByRole("button", { name: "SVG 저장" })).toBeDisabled();
  await page
    .getByLabel("만화 코드")
    .fill(
      `cast: {a: {asset: server}}\npanels: [{actors: [a], dialogue: [{from: a, text: '<script>alert(1)</script>'}]}]`,
    );
  await expect(page.locator("#preview")).toContainText(
    "<script>alert(1)</script>",
  );
  await expect(page.locator("#preview script")).toHaveCount(0);
});
