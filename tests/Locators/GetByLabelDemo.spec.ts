 import {test, expect,Locator} from "@playwright/test"
 
  // 4. page.getByLabel() - Locate form control by label's text
  // When to use: Ideal for form fields with visible labels.
 
  test("Verify Playwright Locators - Get By Alt Text",async ({page})=>{
 
 await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check(); //Clicks on check box with label given
    await page.getByLabel("Employed").check(); //Clicks on radio button value which has label as employed
    await page.getByLabel("Gender").selectOption("Female");
    await expect(page.getByLabel("Employed")).toBeChecked();

 });