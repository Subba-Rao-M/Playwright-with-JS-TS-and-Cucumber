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
        //console.log(await username.textContent()); //empty
        //console.log(await username.inputValue()); // rahulshettyacademy
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

        /**
         * Difference between textContent() vs innerText()
         * textContent() - It returns all the text including hidden text also. It is faster than innerText(). It is a property of Node interface.
         * innerText() - It returns only visible text, it will not return hidden text. It is slower than textContent(). It is a property of HTMLElement interface.
         * text content will get the value from input field if both are attached else innetrText will not get the value from input field
         * innertext will get the values if dynamic changes happend on the UI
         * Note : textContent() is part of auto waiting and innerText() is not part of auto waiting 
         */


        
    }
    );