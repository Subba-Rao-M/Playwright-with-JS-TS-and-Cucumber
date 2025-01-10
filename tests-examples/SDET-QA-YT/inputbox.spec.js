const { test, expect } = require('@playwright/test');

test('Test input box', async ({ page }) => {

    await page.goto('https://itera-qa.azurewebsites.net/home/automation');

    const namefield = page.locator("//input[@id='name']");
    

    //To check input box is visible, empty, editable and enabled

    await expect(namefield).toBeVisible();
    await expect(namefield).toBeEmpty(); // if the field is not empty test case will fail
    await expect(namefield).toBeEditable();
    await expect(namefield).toBeEnabled();

    //Entering data into input field
    //await page.locator("//input[@id='name']").fill('John');
   // await page.fill("//input[@id='name']", 'John');

    await namefield.fill('John');

    await page.waitForTimeout(5000); //Set timeout for slowing down script and pausing script for some time


});

