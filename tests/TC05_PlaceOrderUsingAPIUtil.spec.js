const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayLoad = {userEmail: "subbaraw@gmail.com", userPassword: "Span@1234"};
const addProductPayLoad = {orders:[{country:"India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
let response;
test.beforeAll(async()=>{

//Login API
 const apicontext = await request.newContext();
 const apiUtils = new APIUtils(apicontext,loginPayLoad);
 response = await apiUtils.createOrder(addProductPayLoad);

 


});




test('@API Login to app and place order using API methods from Util and view using Web', async ({page})=>{
   await page.addInitScript(value =>{window.localStorage.setItem('token', value);}, response.token);
    
       await page.goto("https://rahulshettyacademy.com/client");
       await page.locator("button[routerlink*='myorders']").click();
       await page.locator("tbody").waitFor(); //wait for page to load
       const rows = page.locator("tbody tr");
    
       // for the order id click on view button since the order id includes delimeter uses includes for comparison
      for (let i = 0; i < await rows.count(); i++) {
         const rowOrderId = await rows.nth(i).locator("th").textContent();
         if (response.orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
         }
      }
   
      //Get the order id from view order details page and confirm the data
      const orderIdDetails = await page.locator(".col-text").textContent();
      expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
});

