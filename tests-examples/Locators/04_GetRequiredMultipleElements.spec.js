const {test, expect}= require('@playwright/test');

/***
 * 
 * 
 * 
 */
test.only('Test multiple value return based on locators', async ({page})=>
    {
        //Re-usable locators
        const username = page.locator('#username');
        const password = page.locator("[type='password']");
        const signinbutton = page.locator('#signInBtn');
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        await username.fill('rahulshettyacademy1');
        await password.fill('learing');
        await signinbutton.click();
        await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
        await username.fill('rahulshettyacademy');
        await password.fill('learning');
        await signinbutton.click();
        /**
         * locator.first gets first element
         * locator.last gets last element
         * in between nth(1) - index starting form 0 is used to get elements
         * 
         */

        console.log(await page.locator('.card-body a').first().textContent());
        console.log(await page.locator('.card-body a').last().textContent());
        console.log(await page.locator('.card-body a').nth(1).textContent());
    }
    );