import { test, expect, Page, chromium, firefox, webkit, Browser, BrowserContext } from "@playwright/test";

// Browser ---> Context ----> pages

//Browser ---> chromium, firefox, webkit

//Contexts ---> we can have multiple contexts for multiple users/apps for the same browser 
// provide a way to operate multiple independent browser sessions.
// Browser context saves the user information for specific browser
// Same browser type but different users, user 1 cannot use the context of user 2
// Can work on multiple application or pages using same browser but different browser contexts 
//When creating context for browsers page fixture is not passed

//page ---> New Tab, Window, Popup - all these 3 are part of page called as browser window/tab/pages


test("Browser context demo", async () => { // page fixture is not passed here to create browser context in below steps
    //Whatever passed in () based on that like browser, context or page based on that below steps will start


    const browser: Browser = await chromium.launch();  // Create browser
    const context: BrowserContext = await browser.newContext();  // create context

    // creating 2 pages
    const page1: Page = await context.newPage();
    const page2: Page = await context.newPage();
    console.log("No of pages created:", context.pages().length); //2

    await page1.goto("https://playwright.dev/");
    await expect(page1).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright")

    await page2.goto("https://www.selenium.dev/");
    await expect(page2).toHaveTitle("Selenium");


});