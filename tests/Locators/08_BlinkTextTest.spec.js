const {test, expect} = require('@playwright/test');

/***
 *  html attribute has attribute called blinktext for class name
 * Assert using attribute value for this test
 * 
 */

test('Test using attribute value for html proprty of field', async ({page})=>
    {
        const documentlink = page.locator("[href*='documents-request']");
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        //Testing to have attribute
        await expect(documentlink).toHaveAttribute('class', 'blinkingText');
        
    });