const { test, expect } = require('@playwright/test');

/**
 * Playwright smartly waits for event to occur
 * No html buttons in poup for ok or cancel button
 * code allows to accept or dismiss the popup
 */

test('Test Popups', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog', dialog=>dialog.accept()); // This line takes care of popup in any line in this test method
   // page.on('dialog', dialog=>dialog.dismiss());
    await page.locator("#confirmbtn").click();
  
});