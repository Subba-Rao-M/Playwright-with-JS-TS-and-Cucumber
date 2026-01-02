const {test} = require('@playwright/test');
/***
 * Playwright will not handle elements inside frame
 * frames will have tag name frameset and iframe
 * to handle elements inside frame first switch to iframe using iframe name or id
 * 
 * 
 */

test('Test Frames', async ({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
const framespage = page.frameLocator("#courses-iframe");
await framespage.locator("li a[href*='lifetime-access']:visible").click();
const pagetext = await framespage.locator('.text h2').textContent();
const subcount = pagetext.split(" ")[1];
console.log(subcount)

});