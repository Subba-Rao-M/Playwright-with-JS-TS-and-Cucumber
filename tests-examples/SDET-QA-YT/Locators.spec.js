const {test, expect}= require('@playwright/test');

// import test, expect from '@playwright/test';

test('Locators', async ({page})=>{

await page.goto('https://www.demoblaze.com/index.html');
await page.locator('id=login2').click();


//await page.locator('#loginusername').fill('subbarao');
//await page.type('#loginusername', 'subbarao')
await page.fill('#loginusername', 'subbarao');
await page.fill("input[id='loginpassword']", 'subbarao@1234');
await page.click("//button[normalize-space()='Log in']");

//verify logout link presence

const logourlink = await page.locator("//a[normalize-space()='Log out']");
expect(logourlink).toBeVisible();
await page.close();

});