const {test, expect} = require('@playwright/test');

test('Test Home Page', async({page})=>{ //async to return a promice

await page.goto('https://www.demoblaze.com/index.html'); // await will wait for a promice
var pagetitle =await page.title();
console.log('page title is ',pagetitle);
await expect(page).toHaveTitle('STORE');
const pageURL = await page.url();
console.log('Updated URL', pageURL);
await expect(page).toHaveURL('https://www.demoblaze.com/index.html');
await page.close();
});