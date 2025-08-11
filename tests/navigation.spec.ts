import { test, expect } from '@playwright/test';

// Full navigation flow: / -> /preview -> /team -> /players/[slug]

test('navigation flow and OG image route', async ({ page, request }) => {
  await page.goto('/');
  // CTA to preview (assuming text or aria-label contains Preview or Spieltagsvorschau)
  const cta = page.getByRole('link', { name: /let’s go/i });
  if (await cta.count()) {
    await cta.first().click();
  } else {
    const navPreview = page.getByRole('link', { name: /spieltagsvorschau|preview/i }).first();
    await navPreview.click();
  }
  await expect(page).toHaveURL(/\/preview/);

  // Navigate to Team via navbar or link text
  const teamLink = page.getByRole('link', { name: /team/i });
  await teamLink.click();
  await expect(page).toHaveURL(/\/team/);

  // Apply a position filter if available
  const anyFilter = page.getByRole('button', { name: /alle/i });
  if (await anyFilter.count()) {
    // Optional filters present
    // Try a known position label
    const mb = page.getByRole('button', { name: /mitte|mb|zuspiel|außen|libera/i }).first();
    if (await mb.count()) await mb.click();
  }

  // Search by partial name of first card (grab it first)
  const firstCardTitle = page.locator('.group h3').first();
  if (await firstCardTitle.count()) {
    const nameText = (await firstCardTitle.textContent())?.slice(0, 5) || '';
    if (nameText) {
      const searchInput = page.getByLabel(/suche/i);
      if (await searchInput.count()) await searchInput.fill(nameText);
    }
  }

  // Go to first player detail
  const detailLink = page.getByRole('link', { name: /details/i }).first();
  await detailLink.click();
  await expect(page).toHaveURL(/\/players\//);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // OG image route check (raw fetch)
  const ogRes = await request.get('/opengraph-image');
  expect(ogRes.ok()).toBeTruthy();
  expect(ogRes.status()).toBe(200);
});
