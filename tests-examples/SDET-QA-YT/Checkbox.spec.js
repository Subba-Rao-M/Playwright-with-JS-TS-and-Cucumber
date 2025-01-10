const { test, expect } = require('@playwright/test');

test('Test check box', async ({ page }) => {

    await page.goto('https://itera-qa.azurewebsites.net/home/automation');

    //single checkbox

    await page.locator("//input[@id='monday' and @type ='checkbox']").check();
   // await page.check("//input[@id='monday' and @type ='checkbox']");
   //await expect(page.locator("//input[@id='sunday' and @type ='checkbox']").isChecked()).toBeFalsy();
   await expect(page.locator("//input[@id='monday' and @type ='checkbox']")).toBeChecked();
   //await expect(page.locator("//input[@id='monday' and @type ='checkbox']").isChecked()).toBeTruthy();
  

   // Handling Multiple check boxes

   const checkboxelocators = ["//input[@id='monday' and @type ='checkbox']",
   "//input[@id='sunday' and @type ='checkbox']",
   "//input[@id='saturday' and @type ='checkbox']"];

   for (const loc of checkboxelocators){
    await page.locator(loc).check();
   }
// unselect checkboxes which are already selected

for (const loc of checkboxelocators){
    if(await page.locator(loc).isChecked()){
        await page.locator(loc).uncheck();
    }
    
   }
    await page.waitForTimeout(5000); // pausing script for some time


});