const {test, expect } = require('@playwright/test');

test('Test cart items value with syncronization with network idle state or wait for', async ({page})=>{
    const url = "https://rahulshettyacademy.com/client/";
    const txt_useremail = page.locator('#userEmail');
    const txt_password = page.locator('#userPassword');
    const btn_login = page.locator('#login');
    const emailvalue = "subbaraw@gmail.com";
    const passwordvalue = "Span@1234";
    const listCartItems = page.locator('.card-body b');

    await page.goto(url);
    await txt_useremail.fill(emailvalue);
    await txt_password.fill(passwordvalue);
    await btn_login.click();
    await expect(page).toHaveTitle("Let's Shop");
    
    /**
     * Data in this cart page is loaded by network calls using microservices
     * Network will come to idle state once all calls related to page are made
     * if all services are not loaded few element capture will empty result
     *  await page.waitForLoadState('networkidle'); - This step is some times may not work always resulting flaky result
     * 
     * Alternative is to use page.locator('.card-body b').waitFor()
     * Above will work only for one element so use it with first or last elements
     */
    await page.waitForLoadState('networkidle');
    await listCartItems.last().waitFor();
    const cartitem = await listCartItems.allTextContents();
    console.log(cartitem);

}
);