/**
 * Abort  or Block the request
 * scenario related to server is down
 */


const { test, expect } = require('@playwright/test');

test.only('Test the abort request', async ({browser})=>

    {
        const  context =await browser.newContext();
        const page = await context.newPage();
        page.route("**/*.{jpg, jepeg, png, css}", route => route.abort()); // Abort the file with .css extention or any image types
        page.on('request', request => console.log(request.url()));
        page.on('response', response => console.log(response.url(), response.status()));
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
      
        await page.locator('#username').fill('rahulshettyacademy1');
        await page.locator("[type='password']").fill('learning');
        await page.locator('#signInBtn').click();
        await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    }
    );