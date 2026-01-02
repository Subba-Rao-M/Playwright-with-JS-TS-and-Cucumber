import { test, expect, chromium, Browser, BrowserContext, Page, Locator } from "@playwright/test";

test("handle tabs", async () => {

    const browser: Browser = await chromium.launch();  // Create browser
    const context: BrowserContext = await browser.newContext();  // create context

    // creating 1 page
    const parentPage: Page = await context.newPage();

    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    // 2 statements should go parallely
    //context.waitForEvent('page'); // promise can be pending, fulfilled, rejected. This statement should be executed parallely and same time it should trigger
    //parentPage.locator("button:has-text('New Tab')").click(); // opens new tab/new page

    /*This statement should be executed parallely and same time it should trigger as both should return promises
    it can not be executed before or after event as same time we need both promises
    to achive this use promise all, it will wait until both statements gets completed

    */

    // const childPage: [Page, void] = await Promise.all([context.waitForEvent('page'), parentPage.locator("button:has-text('New Tab')").click()]);
    //To avoid void update above statement like
    const [childPage] = await Promise.all([context.waitForEvent('page'), parentPage.locator("button:has-text('New Tab')").click()]);

    //Appraoch 1: switch between pages and get titles ( using context)
    const pages: Page[] = context.pages();  // returns an array
    console.log("Number of pages created:", pages.length)

    console.log("Title of the Parent page:", await pages[0].title());
    console.log("Title of the Child page:", await pages[1].title());

    //Appraoch 2: alternate only if 2 tabs available as parent and child use below approach else use index based approach

    console.log("Title of the Parent page:", await parentPage.title());
    console.log("Title of the Child page:", await childPage.title());

});


test('Handle multiple Pages/Tabs', async () => {
    const browser: Browser = await chromium.launch();
    const context: BrowserContext = await browser.newContext();

    // Create two pages
    const parentPage: Page = await context.newPage();
    await parentPage.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    // Start waiting for new page before clicking. 

    //Should go parallely
    const [childPage] = await Promise.all([
        context.waitForEvent('page'), // Wait for the new tab to open and return the page
        parentPage.locator("a:has-text('OrangeHRM, Inc')").click(),  //// Click the button that opens new tab
    ]);


    console.log(await parentPage.title()); //OrangeHRM
    console.log(await childPage.title()); //Human Resources Management Software | OrangeHRM HR Software

    await expect(parentPage).toHaveTitle('OrangeHRM');
    await expect(childPage).toHaveTitle('Human Resources Management Software | HRMS | OrangeHRM');

});