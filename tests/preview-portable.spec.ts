import { test, expect } from '@playwright/test';

// Ensure Portable Text (rich text) renders on /preview (either real or fallback paragraph)

test('preview portable text renders', async ({ page }) => {
  await page.goto('/preview');
  // Either a rendered PortableBody block element or fallback paragraph text
  const portable = page.locator('.portable-body p, .portable-body h2');
  if (await portable.count()) {
    await expect(portable.first()).toBeVisible();
  } else {
    await expect(page.getByText(/Fallback.*Duell/i)).toBeVisible();
  }
});
