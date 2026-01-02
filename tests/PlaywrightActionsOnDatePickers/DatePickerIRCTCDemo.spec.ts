import { test, expect, Page, Locator } from '@playwright/test';

async function selectDate(page: Page, targetYear: string, targetMonth: string, targetDate: string) {
  while (true) {
    const currentMonth : string = await page.locator('span.ui-datepicker-month').innerText();
    const currentYear: string = await page.locator('span.ui-datepicker-year').innerText();

    if (currentMonth === targetMonth && currentYear === targetYear) {
      break;
    } 
    else {
      await page.click('a.ui-datepicker-next'); // click next
    }
  }

  const allDates : Locator = page.locator('table.ui-datepicker-calendar tbody td a');
  const count : number = await allDates.count();

  for (let i = 0; i < count; i++) {
    const dateText: string = await allDates.nth(i).innerText();
    if (dateText === targetDate) {
      await allDates.nth(i).click();
      break;
    }
  }

/*
const allDates : Locator[]= await page.locator('table.ui-datepicker-calendar tbody td a').all();
    
    for (let date of allDates) {
        const dateText : string = await date.innerText();
            if (dateText === targetDate) {
                await date.click();
                break;
            }
    }
 */


}

test.skip('IRCTC Date Picker Demo', async ({ page }) => {
  await page.goto('https://www.irctc.co.in/nget/train-search');
  await page.waitForTimeout(5000);

  // Open the date picker
  const dateInput : Locator=page.locator('#jDate span input');
  await dateInput.click();

  const targetYear : string = '2026';
  const targetMonth : string= 'Jan';
  const targetDate : string = '10';

  await selectDate(page, targetYear, targetMonth, targetDate);

  // Assert the selected date is reflected in the input field 
  const selectedDate : string = await dateInput.inputValue();
  expect(selectedDate).toContain('10'); 

   // Other way to Verify selected date is correctly filled in the input field
   const expectedDateString: string = '10/01/2026';  //dd/mm/yyyy
   await expect(dateInput).toHaveValue(expectedDateString); // dd/mm/yyyy format

});
