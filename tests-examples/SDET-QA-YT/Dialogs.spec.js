const { test, expect } = require('@playwright/test');
//skip will ignore the test case
test.skip('Alert with Ok', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com");

    //Enabling dialog window handler

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('I am an alert box!');
        await dialog.accept();
    });

    //Click on button whcih calls above action

    await page.click('//button[normalize-space()="Alert"]');
    await page.waitForTimeout(3000);
});


test.skip('Confirmation dialog with Ok and cancel', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com");

    //Enabling dialog window handler

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('confirm');
        expect(dialog.message()).toContain('Press a button!');
        await dialog.accept(); // close by using Ok button
        //await dialog.dismiss(); //Close by using Cancel button
    });

    //Click on button whcih calls above action

    await page.click('//button[normalize-space()="Confirm Box"]');
    await expect(page.locator('//p[@id="demo"]')).toHaveText('You pressed OK!');
    await page.waitForTimeout(3000);
});



test('Prompt dialog with Ok and cancel', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com");

    //Enabling dialog window handler

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('prompt');
        expect(dialog.message()).toContain('Please enter your name:');
        expect(dialog.defaultValue()).toContain('Harry Potter');
        await dialog.accept('John'); // close by using Ok button and value John entered in input box
        //await dialog.dismiss(); //Close by using Cancel button
    });

    //Click on button whcih calls above action

    await page.click('//button[normalize-space()="Prompt"]');
    await expect(page.locator('//p[@id="demo"]')).toHaveText('Hello John! How are you today?');
    await page.waitForTimeout(3000);
});


// Dialogs/Alerts are auto dismissed by playwright by degfault
//If test scenario to be tested - Should be handled to validate test before action with accept and dismiss command
//Alet with OK button
//Confirm with OK and cancel button
//Prompt - Enter value and click on ok