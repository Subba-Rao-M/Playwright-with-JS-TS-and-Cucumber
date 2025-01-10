const {test, expect}= require('@playwright/test');

/***
 * 
 * 
 * 
 */
test.only('Test multiple value return based on locators', async ({page})=>
    {
        //Re-usable locators
        const username = page.locator('#username');
        const password = page.locator("[type='password']");
        const signinbutton = page.locator('#signInBtn');
        const cardtitles = page.locator('.card-body a');
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        await username.fill('rahulshettyacademy');
        await password.fill('learning');
        await signinbutton.click();
        /**
         *textContent is part of auto waiting         
         * all text contents is not part of auto waiting, there may be synconization issue if page not loaded and empty results will be sent
         * 
         */

       // console.log(await cardtitles.first().textContent()); //iphone X
       // console.log(await cardtitles.last().textContent()); //Blackberry
       // console.log(await cardtitles.nth(1).textContent()); //Samsung Note 8
        console.log(await cardtitles.allTextContents()); // out put - > [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ] or []

        
    }
    );