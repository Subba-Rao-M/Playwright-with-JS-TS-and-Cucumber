const { test, expect } = require('@playwright/test');

test('BootStrap DropDown', async ({ page }) => {

    await page.goto('https://www.jquery-az.com/boots/demo.php?ex=63.0_2');


    // Drop down attribute will not have select tag
    // Bootstrap dropdown with checkbox to select value
    // 1st option
    //await page.locator('.multiselect').click();
    //const options = await page.locator('ul>li label input');
    //await expect(options).toHaveCount(11);

    //2nd opiton

    //await page.locator('.multiselect').click();
    //const options = await page.$$('ul>li label input');
    //await expect(options.length).toBe(11);

    //3) TO select multiple options from drop down//

    await page.locator('.multiselect').click();
    const options = await page.$$('ul>li label')
    for (let option of options) {
        const value = await option.textContent();
        if (value.includes('Angular') || value.includes('Java')) {
            await option.click();
            //break; // if only one value in if condition
        }
    }


    // 4) to deselect
    
    for (let option of options) {
        const value = await option.textContent();
        if (value.includes('HTML') || value.includes('CSS')) {
            await option.click();
        }
    }


});