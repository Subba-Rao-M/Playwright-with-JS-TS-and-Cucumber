const {test, expect} = require('@playwright/test');

test('Test Mouse Right Click', async({page})=>{

await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');

const button = await page.locator('//span[normalize-space()="right click me"]');
await button.click({button: 'right'}); //right click for left use left


await page.waitForTimeout(5000);

});