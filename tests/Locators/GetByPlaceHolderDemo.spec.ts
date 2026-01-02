  // 5. page.getByPlaceholder() - Finds element with a given placeholder text.
  // Best for inputs without a label but having a placeholder

   import {test, expect,Locator} from "@playwright/test"
   
test("Verify Playwright Locators - Get By Place Holder",async ({page})=>{
    const email = "subbaraw@gmail.com";
    const password = "Span@1234"

   await page.goto("https://rahulshettyacademy.com/client");
   await page.getByPlaceholder("email@example.com").fill(email);
   await page.getByPlaceholder("enter your passsword").fill(password);
   await page.getByRole('button',{name:"Login"}).click();
   await page.waitForLoadState('networkidle');
   await page.locator(".card-body b").first().waitFor();
   await expect(page.locator(".card-body b").first()).toBeVisible();
  
  
   });