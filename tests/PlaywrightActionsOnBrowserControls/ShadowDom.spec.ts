/*
IN HTML DOM contains nodes in some structure 
every node represents an element and page hierachy is followed


Shadow root - If multiple elements starting node for shadow host elements
shadow host - the main node which contains child nodes as encapusulated or wrapped up- which cannot be direclty accessed
shadown tree - nodes inside shadow host
shadow dom - tree contains shadow dom elements

All locators in Playwright by default work with elements in Shadow DOM. 

The exceptions are:
Locating by XPath does not pierce shadow roots.
*/

import { test, expect } from "@playwright/test";


test('Shadow Dom - Test 1', async ({ page }) => {

    await page.goto("https://books-pwakit.appspot.com/")

    await page.locator('#input').fill("Playwright automation");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(5000);

    const booksFound = await page.locator('h2.title').all();
    console.log("Books Found:", booksFound.length)

    expect(booksFound.length).toBe(20);

});



test('Shadow Dom - Test 2', async ({ page }) => {

    await page.goto("https://shop.polymer-project.org/")

    await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click(); //Refer \ for multiple quotes in text
    await page.waitForTimeout(5000);

    const productsfound = await page.locator('div.title').all();

    console.log("Number of products found:", productsfound.length);

    expect(productsfound.length).toBe(16);


});

