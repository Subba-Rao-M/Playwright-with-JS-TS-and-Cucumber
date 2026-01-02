const { test, expect } = require('@playwright/test');
const { POManager } = require('../../ECartFramework_JS/pageobjects/POManager');


test('Place Order for Product', {tag: ['@ecart','@web','@master', '@sanity', '@regression']},  async ({ page }) => {
    const poManager = new POManager(page);

    const username = "subbaraw@gmail.com";
    const password = "Span@1234"
    const productName = 'iphone 13 pro';

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