const {test, expect} = require('@playwright/test');

/***
 * Drop Downs:
 * Select dropn down - static drop down - with select tag in html
 * 
 * 
 */

test('Test dropn downs', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        await page.locator('#username').fill('rahulshettyacademy1');
        await page.locator("[type='password']").fill('learing');

        const dropdown = page.locator('select.form-control');
        /** Select Option is used to select drop down value */
        await dropdown.selectOption('consult');
        await page.pause(); //playwright inspector starts opening for debugging
        await page.locator('#signInBtn').click();
    });