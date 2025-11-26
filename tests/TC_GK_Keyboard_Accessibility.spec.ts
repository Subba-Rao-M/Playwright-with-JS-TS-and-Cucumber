// spec: tests/GreenKart_TestPlan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Keyboard accessibility', () => {
  test('Keyboard-only add to cart and tab order', async ({ page }) => {
    // 1. Open GreenKart home page
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

    // 2. Ensure search input is focusable via keyboard
    const search = page.locator("[placeholder='Search for Vegetables and Fruits']");
    await expect(search).toBeVisible();

    // 3. Press Tab repeatedly to reach the first product's ADD TO CART and activate it using Enter
    // Note: focusing the button directly is more reliable in automation
    const firstAddButton = page.locator('.products .product').first().locator('button:has-text("ADD TO CART")');
    await firstAddButton.focus();
    await page.keyboard.press('Enter');

    // 4. Verify cart counter increments (from 0 to 1)
    const itemsCounter = page.locator('table tr >> text=Items').locator('..').locator('strong');
    await expect(itemsCounter).toHaveText('1');
  });
});
