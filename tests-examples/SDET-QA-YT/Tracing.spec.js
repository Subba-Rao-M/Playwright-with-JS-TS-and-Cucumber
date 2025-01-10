const {test, expect}= require('@playwright/test');

// import test, expect from '@playwright/test';

test('Locators', async ({page})=>{

await page.goto('https://www.demoblaze.com/index.html');
await page.locator('id=login2').click();
await page.fill('#loginusername', 'pavanol');
await page.fill("input[id='loginpassword']", 'test@123');
await page.click("//button[normalize-space()='Log in']");
await expect(page.locator('#logout2')).toBeVisible();
await page.close();
});

/*
IN playwright configuration file use trace option
Actions - Each and every action is duisplayed
Metadata: which browser, data, how manay events, actions perfoemed dispalyed
Netwrofk all -api calls displayed
Can navigate before and after using time line
source - which line of code we are checking
*/