const {test, expect } = require('@playwright/test');

test('Add the product to cart, place order and view the placed order', async ({page})=>{
    const url = "https://rahulshettyacademy.com/client/";
    const txt_useremail = page.locator('#userEmail');
    const txt_password = page.locator('#userPassword');
    const btn_login = page.locator('#login');
    const emailvalue = "subbaraw@gmail.com";
    const passwordvalue = "Span@1234";
    const products = page.locator('.card-body');
    const prodtoselect = 'IPHONE 13 PRO';

    await page.goto(url);
    await txt_useremail.fill(emailvalue);
    await txt_password.fill(passwordvalue);
    await btn_login.click();
    await expect(page).toHaveTitle("Let's Shop");


    /******
     * Locator chaining
     * page locator searches the value in entire page
     * chaining locator searched the value within left locator context and not in entire page
     */
    await products.last().waitFor();
    const titles = await products.locator('b').allTextContents();
    console.log(titles);


    for (let i = 0; i< await products.count(); i++){

        if (await products.nth(i).locator('b').textContent() === prodtoselect){
            await products.nth(i).locator("text = Add To Cart").click();
            break;

        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    //Find element in cart page using sudo class
    const boolvalue = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
    expect(boolvalue).toBeTruthy();
    
    await page.locator("text=Checkout").click();
    //Enter the value one by one sequentially until value displays and suggests values
    await page.locator("[placeholder*= Country]").pressSequentially('ind', {delay:100});
    const dropdownoptions = page.locator('.ta-results');
    await dropdownoptions.waitFor();
    const dropdownoptionscount = await dropdownoptions.locator('button').count();
   
    //Select the value from auto suggest drop down
    for(let i=0; i<dropdownoptionscount; i++){
        if(await dropdownoptions.locator('button').nth(i).textContent()===" India"){
            dropdownoptions.locator('button').nth(i).click();
            break;
        }
    }

    //To verify the auto generated logged in user's email id

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailvalue);
    
    await page.locator('.action__submit').click(); // Click on place order
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    //Get the order id
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    //Navigate to my orders page
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor(); //wait for page to load
    const rows = page.locator("tbody tr");
 
    // for the order id click on view button since the order id includes delimeter uses includes for comparison
   for (let i = 0; i < await rows.count(); i++) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

   //Get the order id from view order details page and confirm the data
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
 
    console.log("End of test");
}
);