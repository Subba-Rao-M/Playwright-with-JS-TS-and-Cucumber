import { test, expect } from '@playwright/test';
/**
 * Builtin support to compare images for result verification for consecutive runs to see if any changes in UI
 * 
 */

test('Visual Testing Comparing Screens', async ({ page }) => {

    await page.goto("https://demowebshop.tricentis.com/");
    //await page.goto("https://demowebshop.tricentis.com/register");

    //compare snapshot of the page

    //approach 1
    expect(await page.screenshot()).toMatchSnapshot("homepage.png"); //First round it will fail since no screenshot available
    //2nd time page screenshot method takes and saves screenshot in path VisualTesting.spec.ts-snapshots and 2nd time it will be used as reference

    //appraoch 2
    //await expect(page).toHaveScreenshot(); //Use only one approach and dont combine both together

    //compare snapshot of the element, it will pass since the logo remains same in multiple pages

    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    expect(await logo.screenshot()).toMatchSnapshot("logo.png");


});