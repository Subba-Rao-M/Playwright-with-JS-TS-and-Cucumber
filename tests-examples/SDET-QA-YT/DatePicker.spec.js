const { test, expect } = require('@playwright/test');

test('Date Picker Test', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com");

    //Scenario 1 using fill
    //await page.fill("#datepicker", "07/17/2023");
   

    // Scenario 2 - when text doesnot allow to fill

    const year ="2024";
    const month = "March";
    const date = "20";

    await page.click("#datepicker"); // Opens calendar

    while(true){
        const currentYear = await page.locator('.ui-datepicker-year').textContent();
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();

        if(currentYear==year && currentMonth==month){
            break;
        }
        await page.locator('[title="Next"]').click(); // till we get expected month and year

    }
   /* const dates = await page.$$("//a[@class = 'ui-state-default']");

    for(const dt of dates){
        if(await dt.textContent()==date){
            await dt.click();
            break;
        }
    }*/

    await page.click(`//a[@class='ui-state-default'][text()='${date}']`);
    await page.waitForTimeout(5000);
});