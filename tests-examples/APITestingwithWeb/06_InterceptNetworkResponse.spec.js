/**
 * How to intercept network request and response
 * Intercept means before rendering api response to browser stop it and inject fake browser and send back to browser to test some specific scenario
 * This helps in protecting the data and testing required scenarios without deleting or updating data which is required for other scenario
 * Interecept is also called mocking the response
 * 
 */


const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('./Utils/APIUtils');
const loginPayLoad = { userEmail: "subbaraw@gmail.com", userPassword: "Span@1234" };
const orderPayLoad = { orders: [{ country: "India", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
const fakePayLoadOrders = { data: [], message: "No Orders" }; //Java script object format data

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);

})


//create order is success
test('Test the network response interception and verify fake response in UI', async ({ page }) => {
  page.addInitScript(value => { window.localStorage.setItem('token', value); }, response.token);
  await page.goto("https://rahulshettyacademy.com/client");

  /**
   * route object is used to intercept the respionse for request
   * at the end of url * is given as data for id changes form customer to customer
   * 
   */

  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    //wait for above request to be made 
    //intercepting response -API response-> { playwright fakeresponse}->browser->render data on front end
    async route => {
      const response = await page.request.fetch(route.request());//api response captured here for above request url
      let body = JSON.stringify(fakePayLoadOrders); // java script object should be converted to json
      //fullfill will resend the response back to browser
      route.fulfill(
        {
          response,
          body,
          // If value is not given here the default properties of response will be considered and only the properties given here will be overwritten
        });

    });

  //route should be called before the api response page load
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")

  console.log(await page.locator(".mt-4").textContent());



});



