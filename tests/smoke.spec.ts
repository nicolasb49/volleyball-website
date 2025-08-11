import { test, expect } from '@playwright/test';

test('landing page loads and CTA present', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /let’s go/i })).toBeVisible();
});

test('preview tabs switch', async ({ page }) => {
  await page.goto('/preview');
  await page.getByRole('tab', { name: 'Tabelle' }).click();
  await expect(page.getByRole('table')).toBeVisible();
});
