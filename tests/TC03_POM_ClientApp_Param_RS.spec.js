const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');
/*Convert JSON - >  String - > Object so that if any encoding issues will be resolved instead of converting fron JSOn to object*/
const dataset = JSON.parse(JSON.stringify(require("../testdata/PlaceOrder_TestData_DD.json")));

for (const data of dataset) {
    test(`Place order using Parameterized test for ${data.productName}`, async ({ page }) => {
        const poManager = new POManager(page);

        const username = data.username;
        const password = data.password;
        const productName = data.productName;

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(username, password);

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();

        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}