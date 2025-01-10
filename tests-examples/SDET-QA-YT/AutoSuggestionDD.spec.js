const { test, expect } = require('@playwright/test');

test('Autosuggestion DropDown', async ({ page }) => {

    await page.goto('https://www.redbus.in');

    await page.locator('#src').fill('Delhi');
    await page.waitForSelector("//li[contains(@class,'sc-jlyJG kxRJeL')]/div/text/[1]");
    const fromCityOPtions = await page.$$("//li[contains(@class,'sc-jlyJG kxRJeL')]/div/text/[1]");
    for(let option of fromCityOPtions){
        const value = await option.textContent();
        console.log(value);
        if(value.includes('Anand Vihar')){
           await option.click();
           break;
        }
    }



});