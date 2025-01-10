/**
 * How to intercept network request and response
 * Interecept the request and check the request
 * security testing to see if you able to place some body elses order id
 * Login to page and go to page where request should be altered
 * Multiple interception values can  be separated using ,
 * fulfill will hellp to hit the modified url
 */


const { test, expect } = require('@playwright/test');

test('Test the network security by request interception and verify the response in UI', async ({ page }) => {
//login and reach orders page
await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("subbaraw@gmail.com");
await page.locator("#userPassword").fill("Span@1234");
await page.locator("[value='Login']").click();
await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();

//Click on My Orders
await page.locator("button[routerlink*='myorders']").click();
//Intercept the request first url refers to which request needs to be intercepted and 2nd url referes data with invalid id 
await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' }))

await page.locator("button:has-text('View')").first().click();
await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});



