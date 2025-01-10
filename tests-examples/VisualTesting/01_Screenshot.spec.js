const { test, expect } = require('@playwright/test');

test('Test Screenshots', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({path: 'ElementScreenshot.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path: 'PageScreenshot.png'});
    await expect(page.locator("#displayed-text")).toBeHidden();
});

//Screenshot - Store in path
//Next test take screenshot - and compare with above screenshot
