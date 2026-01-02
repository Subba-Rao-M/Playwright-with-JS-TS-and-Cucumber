/*
open app   -- beforeAll()

login  -- beforeEach()
    find products
logout  -- afterEach()

login
    add product to cart
logout

close app  -- afterAll()

If hooks method are created outside group, it is available for all groups
If hooks method are created inside group, then hooks method applicable only for test cases inside group

*/

import { test, expect, Page } from '@playwright/test';

let page: Page; // Make page global to access in all test cases

test.beforeAll('Open app', async ({ browser }) => {

    page = await browser.newPage(); // create page using browser fixture

    await page.goto("https://www.demoblaze.com/index.html")

});

test.afterAll('Closing App', async () => {
    await page.close();
});


test.beforeEach('Login', async () => {

    await page.locator('#login2').click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.locator("button[onclick='logIn()']").click();
    await page.waitForTimeout(2000);
});

test.afterEach('Login', async () => {

    await page.locator('#logout2').click();
});


test.describe('Test My Products', async () => {

    test('Find number Of products', async () => {
        const products = page.locator('#tbodyid .hrefch');
        const count = await products.count();
        console.log('Number of products:', count);
        await expect(products).toHaveCount(9);
    });

    test('Add Product to cart', async () => {
        await page.locator("text='Samsung galaxy s6'").click();

        // Handle alert before the click
        page.on('dialog', async (dialog) => { // page.once also performs similar action
            expect(dialog.message()).toContain('Product added');
            await dialog.accept();
        });

        await page.locator('.btn.btn-success.btn-lg').click();
    });

});


