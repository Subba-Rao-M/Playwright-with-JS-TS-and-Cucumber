/* Playwright Hooks

beforeeach -> executed before each individual test case -- Login  before each test case
aftereach ->executed after each individual test case -- Log out after each test case

beforeall -> executed before any test case starts running -- Example Login steps before all test cases
afterall ->executed after any test case execution completed its running -- Example Logout steps after all test cases

in playwright config file, fully parallel should be set to false and workers to 1
page fixture should not be passed in every test once declared in beofore each

*/

const { test, expect } = require('@playwright/test');

let page;
test.beforeEach(async ({ browser }) => { // it will not accept page fixtture by default so use browser, from browser create a new page
    page = await browser.newPage(); // this page is used in entire script
    //Login
    await page.goto('https://www.demoblaze.com/index.html');
    await page.locator('id=login2').click();
    await page.fill('#loginusername', 'pavanol');
    await page.fill("input[id='loginpassword']", 'test@123');
    await page.click("//button[normalize-space()='Log in']");


});

test.afterEach(async () => { //No need to pass browser/page as same from before used

    //verify logout link presence
    await page.locator('#logout2').click();
    await page.close();
});


test('test case 1', async () => {
   
    // FInd total number of products in home page
    const products = await page.$$('.hrefch');
    expect(await products).toHaveLength(9);
});

test('test case 2', async () => {
    // Add product
    await page.locator("//a[normalize-space()='Samsung galaxy s6']").click();
    await page.locator("//a[normalize-space()='Add to cart']").click();

    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Product added.');
        await dialog.accept();
    });
});


