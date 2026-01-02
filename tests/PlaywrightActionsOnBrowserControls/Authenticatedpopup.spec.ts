import { test, expect, Page, BrowserContext } from "@playwright/test";


test("authenticated popup - Approach 1", async ({ browser }) => {

    const context : BrowserContext = await browser.newContext();
    const page : Page = await context.newPage();
    //Approach 1: directly pass login along with url
    //await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await page.goto('http://admin:admin@the-internet.herokuapp.com/basic_auth');
    await page.waitForLoadState(); // wait for page loaded completely
    await expect(page.locator('text=Congratulations')).toBeVisible();
});

test("authenticated popup - Approach 2", async ({ browser }) => {

    const context : BrowserContext = await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } });
    const page : Page = await context.newPage();

    //Approach 2: pass the login along with browser context
    await page.goto('https://the-internet.herokuapp.com/basic_auth');
    await page.waitForLoadState(); // wait ofr page loaded completely
    await expect(page.locator('text=Congratulations')).toBeVisible();


});

