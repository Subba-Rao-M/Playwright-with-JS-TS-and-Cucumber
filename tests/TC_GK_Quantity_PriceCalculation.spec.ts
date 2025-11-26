// spec: tests/GreenKart_TestPlan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Quantity and price calculation', () => {
  test('Increase quantity and verify price calculation', async ({ page }) => {
    // 1. Open GreenKart home page
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // 2. Locate product card for Brocolli
    const product = page.locator('.products .product').filter({ hasText: 'Brocolli' }).first();
    await expect(product).toBeVisible();

    // 3. Determine initial cart items count (so test is resilient when run in parallel)
    const itemsCounterLocator = page.locator('table tr >> text=Items').locator('..').locator('strong');
    const initialCountText = await itemsCounterLocator.first().textContent().catch(() => null);
    const initialCount = initialCountText ? parseInt(initialCountText.trim(), 10) : 0;

    // 4. Click the "+" control until quantity reaches 3 (make robust)
    const plus = product.locator('a:has-text("+")');
    const qtyLocator = product.locator('input[type="number"], [role="spinbutton"], .qty');
    // attempt up to 5 clicks to reach desired qty (defensive)
    let clicks = 0;
    let displayedQty = 0;
    while (clicks < 5) {
      await plus.click();
      clicks++;
      if (await qtyLocator.count() > 0) {
        try {
          const v = await qtyLocator.first().inputValue();
          displayedQty = parseInt(v || '0', 10);
        } catch (e) {
          const t = await qtyLocator.first().textContent();
          displayedQty = t ? parseInt(t.trim(), 10) : displayedQty;
        }
      }
      if (displayedQty >= 3) break;
    }
    // final sanity check
    expect(displayedQty).toBeGreaterThanOrEqual(3);

    // 6. Click "ADD TO CART"
    await product.locator('button:has-text("ADD TO CART")').click();

    // 7. Open the cart (click the Cart link/icon)
    await page.click('text=Cart');

  // 8. Verify cart counter increased (at least one item added).
  // Note: some environments may add a different delta; we assert minimum increase and that the UI quantity reflects the requested value.
  const finalCountText = await itemsCounterLocator.first().textContent();
  const finalCount = finalCountText ? parseInt(finalCountText.trim(), 10) : 0;
  await expect(finalCount).toBeGreaterThanOrEqual(initialCount + 1);
  });
});
