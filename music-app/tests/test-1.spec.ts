import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.locator('div').filter({ hasText: /^CRAZYBy LE SSERAFIM$/ }).getByRole('img').click();
  await page.getByRole('contentinfo').locator('path').click();
  await page.getByRole('contentinfo').locator('path').click();
  await page.getByPlaceholder('探したい曲を入力してください').click();
  await page.locator('div').filter({ hasText: /^Sleep Walking OrchestraBy BUMP OF CHICKEN$/ }).getByRole('paragraph').click();
  await page.locator('div').filter({ hasText: /^Hello,world!By BUMP OF CHICKEN$/ }).getByRole('paragraph').click();
  await page.locator('div:nth-child(7) > .mb-2').click();
  await page.getByRole('contentinfo').locator('path').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('探したい曲を入力してください').click();
  await page.getByPlaceholder('探したい曲を入力してください').fill('');
  await page.getByRole('button').first().click();
  await page.getByRole('heading', { name: 'Popular Songs' }).click();
});