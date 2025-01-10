const { test, expect } = require('@playwright/test');

test('Test Radio button', async ({ page }) => {

    await page.goto('https://itera-qa.azurewebsites.net/home/automation');

    await page.locator("//input[@value='option2']").check(); // To click the radio button

    //await page.check("//input[@value='option2']"); // 2nd method

    await expect(page.locator("//input[@value='option2']")).toBeChecked();
    expect(await page.locator("//input[@value='option2']").isChecked()).toBeTruthy(); // is checked will return true or false and then it should be verified for true

    expect(await page.locator("//input[@value='option1']").isChecked()).toBeFalsy(); //Negative scenario, radio button shojld not be checked


    await page.waitForTimeout(5000);

});