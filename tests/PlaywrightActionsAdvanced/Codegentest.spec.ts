import { expect, test } from '@playwright/test';

/**
 * Using codegen we can record the test and generate code
 * It can be used to identify the locator value
 * used for debug of tests
 * In terminal write npx playwright codegen
 * To save code generated to file automatically
 * npx playwright codegen -o tests/foldername/filename.spec.ts
 *  - o or --output
 * Check for assert icons present in recorder window to add assertions
 * --device "Device name" to open application in particular device like iphone 15 etc, it opens mobile browser in selected device
 * -b or --browser "firefox"
 * if same file name given it overrides old data
 * --viewport-size "1280,720" - it will be added as part of test.use
 * 
 * Using for debugging:
 * npx playwright test filename --debug
 * F10 for next shortcut key
 * Executes script step by step
 * Observe the locator, logs and aeria generated for each step
 */



test('test1', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await expect(page.locator('#nava')).toMatchAriaSnapshot(`
    - link "PRODUCT STORE":
      - /url: index.html
      - img
    `);
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
});