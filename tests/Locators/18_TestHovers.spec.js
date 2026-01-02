const { test, expect } = require('@playwright/test');



test('Test Mouse Hovers', async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#mousehover").hover();
  
});