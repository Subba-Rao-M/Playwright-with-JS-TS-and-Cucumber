import { test, expect, Locator, Page } from "@playwright/test"

async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {

    while (true) {
        //Get current month and year
        const currentMonth = await page.locator('.ui-datepicker-month').textContent();
        const currentYear = await page.locator('.ui-datepicker-year').textContent();

        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }

        if (isFuture) {
            await page.locator('.ui-datepicker-next').click(); //Future date selection
        }
        else {
            await page.locator('.ui-datepicker-prev').click(); //Past date selection
        }

    }


    const allDates : Locator[] = await page.locator(".ui-datepicker-calendar td").all();

    for (let dt of allDates) {
        const dateText: string = await dt.innerText();
        if (dateText === targetDate) {
            await dt.click()
            break;
        }

    }
}



test("JQuery datepicker", async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateInput: Locator = page.locator('#datepicker');
    expect(dateInput).toBeVisible();

    //Appraoch 1: using fill() method
    //dateInput.fill("06/20/2025");   //mm/dd/yyyy

    //Appraoch 2: using date picker

    await dateInput.click(); //opens the date picker window

    //future target date
   const year='2026';
    const month='June';
    const date='15';
   
   
    //past target date
    /* const year = '2024';
    const month = 'June';
    const date = '15'; */

    /*First focus on month and year based on calendar and see if month and year needs to be changed and plan logic accodingly*/

    selectDate(year, month, date, page, true); // futuredate-true  pastdate-false

    const expectedDate = '06/15/2026';  //mm//dd//yyyy
    await expect(dateInput).toHaveValue(expectedDate);

});