const {test, expect} = require('@playwright/test');

/***
 * window opens in separate window
 * page control will not move to new window or tab
 * instead of starting page start from browser and context
 * wait for event waits for new page to open in background
 * there are 3 types of promises in asyncronous programming: Prmoise pending, promise rejected and promise fulfilled
 * Promise.all method holds all group of statments which needs to be executed together to perform an event
 * 
 */

test('Test child window', async ({browser})=>

    {
        const context = await browser.newContext();
        const page = await context.newPage();
        const documentlink = page.locator("[href*='documents-request']");
        const username = page.locator('#username');
        const password = page.locator("[type='password']");
        const signinbutton = page.locator('#signInBtn');
        
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        await expect(documentlink).toHaveAttribute('class', 'blinkingText');
       // documentlink.click(); //New page opens and page will not have control over that page
        // await context.waitForEvent('page'); //waits for new page but it was opened before this statment itself
       
        //To overcome above issue Promise.all is used which works on group of statemtns to perform single event
        //Below is example where multiple steps needs to be executed asynronously together
        const [newpage] = await Promise.all(
                    [
                        context.waitForEvent('page'), //returns new page
                        documentlink.click() //does not return anything
                        


                    ]

        ); //new page is opened here and come out of these loops until both promises are fulfilled if any step fails entire script will be failed
        
        //If multiple steps return value store it as array [newpage, another value]

       const text =  await newpage.locator('.red').textContent();
       console.log(text); //out put - Please email us at mentor@rahulshettyacademy.com with below template to receive response 
       //await expect(page.locator("[style*='block']")).toContainText("Please email us at mentor@rahulshettyacademy.com with below template to receive response");
       
       //To full only email id from above test
        const arraytext = text.split('@');
        console.log(arraytext);
        const email = arraytext[1].split(" ")[0];
        console.log(email);

        // GO back to parent page
       await page.pause();
       await username.fill(email);
       await page.pause();

    });