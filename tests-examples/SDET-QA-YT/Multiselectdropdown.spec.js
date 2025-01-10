const { test, expect } = require('@playwright/test');

test('Test Multi Select box', async ({ page }) => {
   
    await page.goto('https://testautomationpractice.blogspot.com');

    // Option 1 using options array

    //await page.selectOption('#colors', ['Blue', 'Red', 'Yellow']);

    //check number of options in dropdown
    //const options = await page.locator('#colors option');
    //await expect(options).toHaveCount(5);

   // using JS array

   /* const options = await page.$$('#colors option');
    console.log("Options count", options.length)
    await expect(options.length).toBe(5);*/

    // Check the presence of value
    const content = await page.locator('#colors').textContent();
    await expect(content.includes('Blue')).toBeTruthy();

});