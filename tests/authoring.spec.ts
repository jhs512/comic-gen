import { test, expect } from '@playwright/test';

test('author edits a dialogue and downloads the displayed SVG', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#preview svg')).toBeVisible();
  await page.getByLabel('만화 코드').fill(`cast:\n  web: {asset: server, label: 웹 서버}\n  db: {asset: database, label: DB}\npanels:\n  - actors: [web, db]\n    dialogue:\n      - {from: web, to: db, text: "데이터를 부탁해!"}\n      - {from: db, text: "바로 보낼게!"}`);
  await expect(page.locator('#preview')).toContainText('데이터를 부탁해!');
  await expect(page.locator('#preview [data-character]')).toHaveCount(2);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'SVG 저장' }).click();
  expect((await download).suggestedFilename()).toBe('comic.svg');
});
