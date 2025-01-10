const {test, expect, firefox}= require('@playwright/test');

test('test handle pages or windows', async ()=>{

    const browser = await firefox.launch(); // creates new browser
    const context = await browser.newContext(); // new browser context is created
    //const page = await context.newPage(); // page is created using browser context
 
    const page1 = await context.newPage(); // page is created using browser context
    const page2 = await context.newPage(); // page is created using browser context

    const allPages = await context.pages();
    console.log("Number of pages created......", allPages.length);

    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await expect(page1).toHaveTitle('OrangeHRM');

    await page2.waitForTimeout(5000);

    await page2.goto("https://www.orangehrm.com/");

    await expect(page2).toHaveTitle('OrangeHRM HR Software | Free & Open Source HR Software | HRMS | HRIS | OrangeHRM');


});


test.only('test handle multiple windows', async ()=>{

    const browser = await firefox.launch(); // creates new browser
    const context = await browser.newContext(); // new browser context is created
    //const page = await context.newPage(); // page is created using browser context
 
    const page1 = await context.newPage(); // page is created using browser context
    await page1.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await expect(page1).toHaveTitle('OrangeHRM');

    const pagePromice = context.waitForEvent('page');
    await page1.locator('//a[normalize-space()="OrangeHRM, Inc"]').click(); // when this is clicked abvoe promice is craeted
    const newPage = await pagePromice; // create new page using above promice when fulfilled
    await expect(newPage).toHaveURL("https://www.orangehrm.com/");
    await expect(newPage).toHaveTitle('OrangeHRM HR Software | Free & Open Source HR Software | HRMS | HRIS | OrangeHRM');
});
/*
1. by default palywright provides page fixture
2. page fixture is created using above example when page fixture is not passed throughg asyncornous funciton
3. Pages can be handled independently using above concept like page 1 can launch 1 app and page 2 another
4. whenver link is triggered which will open in new tab/window - is example to handle using above
*/