const { expect } = require('@playwright/test');
const { customtest } = require('../../ECartFramework_JS/utils/test-base');
const { POManager } = require('../../ECartFramework_JS/pageobjects/POManager');



customtest('Client App login using Data driven test using Test Data custom fixture for Product', {tag: ['@ecart', '@web', '@master', '@datadriven']}, async ({ page, testDataOrder }) => {
    const poManager = new POManager(page);

    const username = testDataOrder.username;
    const password = testDataOrder.password;
    const productName = testDataOrder.productName;

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