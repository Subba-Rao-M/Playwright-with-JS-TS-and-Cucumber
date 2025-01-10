const { Given, When, Then } = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager');
const { expect} = require('@playwright/test');
const playwright = require('@playwright/test');

Given('User login to application using {string} and {string}', {timeout: 100*1000}, async function (username, password) {
   
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('user adds product {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('verify {string} is displayed in cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('user enter the valid details and place the order', async function () {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('verify the order is present in user order history', async function () {
    await this.dashboardPage.navigateToOrders();
    
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Then('Error message should be displayed', async function () {
    expect(await this.page.getByText("Incorrect email or password.").isVisible()).toBeTruthy();
});  