import { test, expect, Locator } from '@playwright/test';

test('Booking.com Date Picker Test - Check-in and Check-out', async ({ page }) => {
  await page.goto('https://www.booking.com/');

  // Click on the date picker field to open calendar
  await page.getByTestId('searchbox-dates-container').click();

  // ==== Check-in Date Selection ====
  let checkinYear: string = "2026";
  let checkinMonth: string = "June";
  let checkinDay: string = "20";

  // Navigate through the calendar to find the desired check-in month and year
  while (true) {
    const checkInMonthYear: string = await page.locator("h3[aria-live='polite']").nth(0).innerText(); // nth 0 for first box of date for checkin
    const currentMonth: string = checkInMonthYear.split(" ")[0];    //February 2026
    const currentYear: string = checkInMonthYear.split(" ")[1];

    if (currentMonth === checkinMonth && currentYear === checkinYear) {
      break;
    }
    else {
      await page.locator('button[aria-label="Next month"]').click();
    }
  }

  // Select the specific check-in date
  let allDates: Locator[] = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all(); // 0 for first box date selection and 1 for 2nd box
  let checkinDateSelected: boolean = false;

  for (let date of allDates) {
    const dateText: string = await date.innerText();
    if (dateText === checkinDay) {
      await date.click();
      checkinDateSelected = true;
      break;
    }
  }

  // Assertion to confirm check-in date was selected
  expect(checkinDateSelected).toBeTruthy();


  // ==== Check-out Date Selection ====
  let checkoutYear: string = "2026";
  let checkoutMonth: string = "July";
  let checkoutDay: string = "25";

  // Navigate to the required check-out month and year
  while (true) {
    const checkOutMonthYear: string = await page.locator("h3[aria-live='polite']").nth(1).innerText(); // nth 1 for checkout 2nd box selection
    const currentMonth: string = checkOutMonthYear.split(" ")[0]; //February  2026 //February[0]    2026[1]
    const currentYear: string = checkOutMonthYear.split(" ")[1];  

    if (currentMonth === checkoutMonth && currentYear === checkoutYear) {
      break;
    } else {
      await page.locator('button[aria-label="Next month"]').click();
    }
  }

  // Select the specific check-out date
  allDates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all();
  let checkoutDateSelected: boolean = false;

  for (let date of allDates) {
    const dateText: string = await date.innerText();
    if (dateText === checkoutDay) {
      await date.click();
      checkoutDateSelected = true;
      break;
    }
  }

  // Assertion to confirm check-out date was selected
  expect(checkoutDateSelected).toBeTruthy();

});
