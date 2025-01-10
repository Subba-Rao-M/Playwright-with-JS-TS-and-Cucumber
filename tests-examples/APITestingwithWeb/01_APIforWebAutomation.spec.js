const {test, expect, request} = require('@playwright/test');

/**
 * How API testing can make web automation easy
 * to reduce web automation time and check the stableness for applications which are run by apis
 * In same browser if another session is opened in different tab without user credential it will open
 * In incognito mode, session token is not stored
 * In incognito mode, if you insert token manually, user will be redirected to home page if session is not expired
 * Store the session from one test case and use it for all remaning test cases without login
 * IT reduces time when there are multiple test cases by reducing the number of steps for login
 * 
 */

/**
 * before all - will execute once for all test cases
 * before each - will execute once before each test case
 */

const loginPayLoad = {userEmail: "subbaraw@gmail.com", userPassword: "Span@1234"};
let token;
test.beforeAll(async()=>{
 const apicontext = await request.newContext();
 const loginResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: loginPayLoad
    }

 )
 expect(loginResponse.ok).toBeTruthy;

 const loginResponseJSON = await loginResponse.json();
 console.log(loginResponseJSON);
 token = loginResponseJSON.token;
    console.log(token);
});

test('Login to app', async ({page})=>{
    //Insert the token value generated using above step
    await page.addInitScript(value =>{window.localStorage.setItem('token', value);}, token);
    
    await page.goto("https://rahulshettyacademy.com/client");
    
    //Login takes from above token value inserted
    await page.locator(".card-body b").first().waitFor();
    
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add to Cart"}).click(); 
  
    await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click(); // Here it checks for list items with button 
 
    await page.locator("div li").first().waitFor();

    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  
    await page.getByRole("button",{name :"Checkout"}).click();
  
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
  
    await page.getByRole("button",{name :"India"}).nth(1).click();
    
    await page.getByText("PLACE ORDER").click();
  
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});