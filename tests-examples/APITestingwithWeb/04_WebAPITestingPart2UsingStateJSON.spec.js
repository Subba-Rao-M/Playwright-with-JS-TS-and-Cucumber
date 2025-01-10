/**
 * In banking applications there will be multiple values stored in storage and cookies
 * These scenarios will become more complex
 * To overcome this first login using web and store the session in json file
 * For future executions use the json file and inject that file in browser before executing test case
 * This json file is used with browser context
 * This is work around for add init script when more number of parameters needs to be injected
 * session and cookies should be given in browser context level not page level
 */

const { test, expect } = require('@playwright/test');
let webContext;

//test.describe.configure({mode: 'parallel'}); //To run the test cases in parallel or serial mode
test.beforeAll(async({browser})=>{  
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("subbaraw@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Span@1234");
    await page.getByRole('button',{name:"Login"}).click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path: 'state.json'});
    webContext = await browser.newContext({storageState: 'state.json'});    
    });



 
test('Test using browser state context', async () => {

   const page = await webContext.newPage();
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator(".card-body b").first().waitFor();
   
   await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click(); 
 
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click(); // Here it checks for list items with button 

   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();
 
   await page.getByRole("button",{name :"Checkout"}).click();
 
   await page.getByPlaceholder("Select Country").pressSequentially("ind");
 
   await page.getByRole("button",{name :"India"}).nth(1).click();
   await page.getByText("PLACE ORDER").click();
 
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});

test('Test another method to verify state.json usage', async () => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click(); 
});