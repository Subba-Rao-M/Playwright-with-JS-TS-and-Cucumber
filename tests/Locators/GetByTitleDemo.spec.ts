import {test, expect,Locator} from "@playwright/test"

// 6. page.getByTitle() to locate an element by its title attribute.
// When to use: When your element has a meaningful title attribute in html tag.
test("Verify Playwright Locators - Get By Title",async ({page})=>{
await page.goto('https://en.wikipedia.org/wiki/Playwright');

// This link actually has a title attribute in the live DOM
await page.getByTitle('Screenwriter').click();
await expect(page).toHaveURL(/Screenwriter/);
});

