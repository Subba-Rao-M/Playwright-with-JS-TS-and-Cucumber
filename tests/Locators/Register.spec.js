const {test, expect } = require('@playwright/test');

test('Test Register page', async ({page})=>{
    const url = "https://rahulshettyacademy.com/client/";
    const txt_useremail = page.locator('#userEmail');
    const txt_password = page.locator('#userPassword');
    const btn_login = page.locator('#login');
    const emailvalue = "subbaraw@gmail.com";
    const passwordvalue = "Span@1234";

    await page.goto(url);
    await page.locator('.btn1').click();
    await page.locator('#firstName').fill("Subba");
    await page.locator('#lastName').fill("Rao");
    await txt_useremail.fill(emailvalue);
    await page.locator('#userMobile').fill("1101010101");
    await page.locator("[value='Male']").click();
    await txt_password.fill(passwordvalue);
    await page.locator('#confirmPassword').fill(passwordvalue);
    await page.locator("[type='checkbox']").click();
    await btn_login.click();
    await expect(page.getByText('Account Created Successfully')).toBeVisible();

}
);