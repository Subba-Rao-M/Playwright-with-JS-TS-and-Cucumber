const {test, expect}= require('@playwright/test');

test('test reporter1', async ({page})=>{
    await page.goto('https://www.demoblaze.com/index.html');
    await expect(page).toHaveTitle('STORE');

});

test('test reporter 2', async ({page})=>{
    await page.goto('https://demo.opencart.com');
    await expect(page).toHaveTitle('Your Store');

});

test('test reporter 3', async ({page})=>{
    await page.goto('https://demo.nopcommerce.com');
    await expect(page).toHaveTitle('nopCommerce demo store test');

});


//user playwright configuration file to configure required reprot type
// or else command prompt can be used
