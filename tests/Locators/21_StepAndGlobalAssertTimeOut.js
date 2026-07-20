const { test, expect } = require('@playwright/test');


test('Testing step assert time out', async ({ page }) => {

   const email = "subbaraw@gmail.com";
   const password = "Span@1234"

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill(password);
   await page.getByRole('button', { name: "Login" }).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: "Add to Cart" }).click();

   await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click(); // Here it checks for list items with button 

   await page.locator("div li").first().waitFor();
   await expect(page.getByText("ZARA COAT 3")).toBeVisible();

   await page.getByRole("button", { name: "Checkout" }).click();

   await page.getByPlaceholder("Select Country").pressSequentially("ind");

   await page.getByRole("button", { name: "India" }).nth(1).click();
   await page.getByText("PLACE ORDER").click();
   // below step will overwrite the default time out
   await expect(page.getByText("Thankyou for the order.")).toBeVisible({ timeout: 10_000 });
})


//test should be executed with in time specified for test timeout in config file else timeout error will appear
test('Testing Global time out', async ({ page }) => {
   //If we alter global time out it will affect all test cases, to avoid this test case level global time out set for multiple step
   // 3 levels - config, global level within test, step level
   const slow_expect = expect.configure({ timeout: 9000 })

   //to configure test execution timeout value i.e to override config test time out value
   //all test step actions will use this timeout with in defined time test case execution should complete
   test.timeout({ timeout: 60000 })
   //if any failure it will wait for above time out
   // to overcome this issue use action and navigation time out in config file
   //also can be added at step level whenver required

   const email = "subbaraw@gmail.com";
   const password = "Span@1234"

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill(password);
   await page.getByRole('button', { name: "Login" }).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();

   await page.locator(".card-body").filter({ hasText: "ZARA COAT 3" }).getByRole("button", { name: "Add to Cart" }).click();

   await page.getByRole("listitem").getByRole('button', { name: "Cart" }).click(); // Here it checks for list items with button 

   await page.locator("div li").first().waitFor();
   await slow_expect(page.getByText("ZARA COAT 3")).toBeVisible();

   await page.getByRole("button", { name: "Checkout" }).click();

   await page.getByPlaceholder("Select Country").pressSequentially("ind");

   await page.getByRole("button", { name: "India" }).nth(1).click();
   await page.getByText("PLACE ORDER").click();
   // use slow-expect to use global configuration
   await slow_expect(page.getByText("Thankyou for the order.")).toBeVisible();
})