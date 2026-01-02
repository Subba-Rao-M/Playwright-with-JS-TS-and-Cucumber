//Screenshot - Store in path
//Next test take screenshot - and compare with above screenshot

const { test, expect } = require('@playwright/test');

test('Test Screenshots comparison', async ({page})=>{

    await page.goto("https://www.udemy.com/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});