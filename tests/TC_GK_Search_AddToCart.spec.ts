// spec: tests/GreenKart_TestPlan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Search and add to cart', () => {
  test('Search and add a single product', async ({ page }) => {
    // 1. Open GreenKart home page
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // 2. Focus the search input labeled "Search for Vegetables and Fruits"
    const search = page.locator("[placeholder='Search for Vegetables and Fruits']");
    await expect(search).toBeVisible();

    // 3. Type a partial product name ("broc")
    await search.fill('broc');

    // 4. Verify product cards are filtered to matching items only
    const products = page.locator('.products .product');
    await expect(products).toHaveCount(1);
    await expect(products.first().locator('h4')).toHaveText(/Brocolli/i);

    // 5. Click "ADD TO CART" on the intended product
    await products.first().locator('button:has-text("ADD TO CART")').click();

    // 6. Verify cart counter (Items) increments from 0 to 1
    const itemsCounter = page.locator('table tr >> text=Items').locator('..').locator('strong');
    await expect(itemsCounter).toHaveText('1');
  });
});
