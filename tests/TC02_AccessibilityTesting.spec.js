import { test, expect } from '@playwright/test';
const AxeBuilder = require('@axe-core/playwright').default;
const { LoginPage } = require('../pageobjects/LoginPage');


test('test Autogiro page load', async ({ page }, testInfo)  => {
  test.setTimeout(120000);
  await page.goto("https://portalsys3.lansforsakringar.se/snabben/");
  const loginPage = new LoginPage(page);
  loginPage.privateLogin("199207232399", "Sys4 master");
  let pagetitle = page.title();
  console.log(pagetitle);
  await expect(page).toHaveTitle("Snabben");
  await page.getByRole('navigation', { name: 'Huvudmeny' }).locator('[data-test-id="payment\\/register"]').click();
  await page.getByRole('button', { name: 'Autogiro' }).click();
  await page.getByRole('button', { name: 'Tillåt alla' }).click();
  await page.locator('#sectorDropdown').selectOption('FB');
  await page.getByRole('button', { name: 'Sök' }).click();
  await page.waitForTimeout(3000);
  const accessibilityScanResults = await new AxeBuilder({ page })
  .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
 // .withTags(['wcag21aa'])
  .analyze();
await testInfo.attach("accessibility-scan-results", {

  body: JSON.stringify(accessibilityScanResults, null, 2),
  contentType: "application/json"

});

console.log(accessibilityScanResults.violations);
expect(accessibilityScanResults.violations).toEqual([]);


});
