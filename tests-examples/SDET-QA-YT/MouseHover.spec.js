const {test, expect} = require('@playwright/test');

test('Test Mouse Hover', async({page})=>{

await page.goto('https://demo.opencart.com');

const Desktops = await page.locator('//a[normalize-space()="Desktops"]');
const Mack1 = await page.locator('//a[normalize-space()="Mac (1)"]');

//mouse hover

await Desktops.hover();
await Mack1.hover();

await page.waitForTimeout(5000);

});