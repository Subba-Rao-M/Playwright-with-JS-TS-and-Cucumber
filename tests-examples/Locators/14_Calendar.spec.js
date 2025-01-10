const { test, expect } = require('@playwright/test');

test('Calendar Validation', async ({page})=>{
    const monthNumber = "6";
    const date = "15";
    const year = "2027";
    const expectedList = [monthNumber,date,year]; // store above values in array
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click(); //convert month number string to numeric value
    await page.locator("//abbr[text()='"+date+"']").click(); //Pass value inside css locator
    
    const inputs = page.locator(".react-date-picker__inputGroup input"); //Get the inputdata
    for (let index = 0; index <await inputs.length; index++) //iterate over 3 elements which has common locator above
    {
        const value =inputs[index].getAttribute("value");
        expect(value).toEqual(expectedList[index]); //Compare value in same order as of above array index and display in html tag
    }



});