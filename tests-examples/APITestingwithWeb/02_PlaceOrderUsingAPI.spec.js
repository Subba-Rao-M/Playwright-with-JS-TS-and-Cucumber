const {test, expect, request} = require('@playwright/test');

const loginPayLoad = {userEmail: "subbaraw@gmail.com", userPassword: "Span@1234"};
const addProductPayLoad = {orders:[{country:"India", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
let token, orderId;
test.beforeAll(async()=>{

//Login API
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
    expect(loginResponse.ok).toBeTruthy;
//Add product API
const addProdResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: addProductPayLoad,
        headers: {
            'Authorization': token,
            'Content-Type' : 'application/json'
        },
    }

 )
const orderResponseJson = await addProdResponse.json();
orderId = orderResponseJson.orders[0];
console.log(orderId)

});




test('Login to app and place order using API and view', async ({page})=>{
    await page.addInitScript(value =>{window.localStorage.setItem('token', value);}, token);
 
    await page.goto("https://rahulshettyacademy.com/client");
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
});