const {test, expect} = require('@playwright/test');

test('Test Mouse Double Click', async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com");
    const buttoncopy = await page.locator('//button[normalize-space()="Copy Text"]');

    await buttoncopy.dblclick(); // to click double click 

    const field2 = await page.locator('#field2');
    await expect(field2).toHaveValue('Hello World!');

    await page.waitForTimeout(5000);

});