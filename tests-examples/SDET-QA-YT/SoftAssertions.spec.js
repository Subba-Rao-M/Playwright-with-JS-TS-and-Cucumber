const { test, expect } = require('@playwright/test');

test('Soft Assertions Test', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/index.html');
    await expect.soft(page).toHaveTitle('Store1sfs');
    await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
    await expect(page.locator('.navbar-brand')).toBeVisible();

});