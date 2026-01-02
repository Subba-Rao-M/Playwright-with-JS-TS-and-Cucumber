import {test, expect,Locator} from "@playwright/test"


test("Verify Playwright Locators - Get By Text",async ({page})=>{


    await page.goto("https://demo.nopcommerce.com/");

/* 
2. page.getByText() - Find an element by the text it contains. 
You can match by a substring, exact string, or a regular expression
Locate by visible text
Use this locator to find non interactive elements like div, span, p, etc. 
For interactive elements like button, a, input, etc. use role locators.
 
  <p>welcome</p>
  <div>hello</div>
  
*/
    const text:Locator=page.getByText("Welcome to our store");
    await expect(text).toBeVisible();
 
    //Combine above 2 lines into single statement
    await expect(page.getByText("Welcome to our store")).toBeVisible();   // full string/full text
   
    // provided substring/partial text
    expect(page.getByText("Welcome to")).toBeVisible();
  
    //regular expression > i is used to for removing case sensitivity 
    //regular expresssion starts and ends with /
    //\s+ - stands for one or more white spaces
    
    await expect(page.getByText(/Welcome\s+To\s+Our\s+Store/i)).toBeVisible();  

});