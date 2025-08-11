import { test, expect } from '@playwright/test';

// Tests filter + search interactions on /team page

test('team filters and search work together', async ({ page }) => {
  await page.goto('/team');

  // Count initial cards
  const cards = page.getByTestId('player-card');
  const initialCount = await cards.count();
  expect(initialCount).toBeGreaterThan(0);

  // If there is a position button "MB" click it (case-insensitive)
  const mbBtn = page.getByRole('button', { name: /mb/i }).first();
  if (await mbBtn.count()) {
    await mbBtn.click();
    // After filtering, card count should be <= initial
  const filteredCount = await cards.count();
  expect(filteredCount).toBeLessThanOrEqual(initialCount);
  }

  // Grab first visible name snippet for search test
  const firstName = await page.locator('.group h3').first().textContent();
  if (firstName) {
    const snippet = firstName.slice(0, 3);
    await page.getByLabel(/suche/i).fill(snippet);
    // Ensure every remaining card title contains snippet (case-insensitive)
    const remaining = await cards.count();
    for (let i = 0; i < remaining; i++) {
      const title = await cards.nth(i).locator('h3').textContent();
      expect(title?.toLowerCase()).toContain(snippet.toLowerCase());
    }
  }
});
