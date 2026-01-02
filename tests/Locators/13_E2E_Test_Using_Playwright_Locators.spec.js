const { test, expect } = require('@playwright/test');
 
 
test('E2E testing using playwright locators for scenario covered in 11_E2E cart test', async ({ page }) => {

   const email = "subbaraw@gmail.com";
   const password = "Span@1234"

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill(password);
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
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
})