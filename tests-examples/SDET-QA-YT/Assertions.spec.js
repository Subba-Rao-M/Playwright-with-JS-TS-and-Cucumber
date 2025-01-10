const { test, expect } = require('@playwright/test');

test('Assertions Test', async ({ page }) => {

    await page.goto('https://demo.nopcommerce.com/register');
    await expect(page).toHaveURL('https://demo.nopcommerce.com/register');

    await expect(page).toHaveTitle('nopCommerce demo store. Register');

    const logoelement = page.locator('.header-logo');
    await expect(logoelement).toBeVisible();

    const searchStoreBox = page.locator('#small-searchterms');
    await expect(searchStoreBox).toBeEnabled();

    const maleRadioButton = page.locator('#gender-male');
    await maleRadioButton.click();
    await expect(maleRadioButton).toBeChecked();

    const newsLetterCheckBox = await page.locator('#Newsletter');
    await expect(newsLetterCheckBox).toBeChecked();

    const registerbutton = page.locator('#register-button');
    await expect(registerbutton).toHaveAttribute('type','submit');

    await expect(page.locator('.page-title h1')).toHaveText('Register');
    await expect(page.locator('.page-title h1')).toContainText('Regi');
    
    const email = await page.locator('#Email');
    await email.fill('subbaraw@gmail.com');
    await expect(email).toHaveValue('subbaraw@gmail.com');


    const options = page.locator('select[name="DateOfBirthMonth"] option');
    await expect(options).toHaveCount(13);
    await expect(options).not.toHaveCount(15);

});