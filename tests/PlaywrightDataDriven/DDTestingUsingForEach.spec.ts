import { test, expect } from '@playwright/test';

//testdata
const searchItems:string[]=['laptop', 'Gift card', 'smartphone', 'monitor'];

searchItems.forEach((item)=>{
    test(`search test for ${item}`,async ({ page }) => {
            await page.goto('https://demowebshop.tricentis.com/');
            await page.locator('#small-searchterms').fill(item);  // fill teh text in search box
            await page.locator("input[value='Search']").click();      // click on the button
            await expect.soft(page.locator('h2 a').nth(0)).toContainText(item, { ignoreCase: true });  //  check if results appear
        });

})