import { test, expect } from "@playwright/test";

test("static document renders independent comic blocks and isolates bad input", async ({
  page,
}) => {
  await page.goto("/embed.html");
  await expect(page.locator("figure svg")).toHaveCount(2);
  await expect(page.locator('figure [role="alert"]')).toContainText(
    "없는 에셋",
  );
  await expect(page.locator("figure svg").first()).toContainText(
    "문서 안에서도 대화해요!",
  );
  await page.getByRole("button", { name: "문서 다시 그리기" }).click();
  await expect(page.locator("figure svg")).toHaveCount(2);
  await expect(page.locator("figure")).toHaveCount(3);
  await expect(page.locator("svg [id]")).toHaveCount(0);
});
