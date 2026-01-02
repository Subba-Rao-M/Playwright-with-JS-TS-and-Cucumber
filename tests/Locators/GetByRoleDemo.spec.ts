  /*    3. page.getByRole() - Locating by Role   ( role is not an attribute)
          locate by explicit and implicit accessibility attributes.
          role is not an attribute, its a property type of field like checbox, button, heading etc
          Role locators include buttons, checkboxes, headings, links, lists, tables, 
          and many more and follow W3C specifications for ARIA role.
          Prefer for interactive elements like buttons, checkboxes, links, lists, headings, tables, etc.
          implicitly defined roles - refer tag name like button, heading, checbox
          explicitly defined roles - not matching with tag like instead refers to Aeria roles
*/


import {test, expect, Locator} from "@playwright/test"

test("Get by Role Locator Verification", async ({ page }) => {
  await page.goto("https://tutorialsninja.com/demo/");

  const iphoneCard: Locator = page.locator(".product-layout").filter({ hasText: "iPhone" });

  // Click Add to Cart
  await iphoneCard.getByRole("button", { name: "Add to Cart" }).click();

  // Wait for alert to appear in DOM
  const alertMsg: Locator = page.locator(".alert-success");
  await alertMsg.waitFor({ state: "visible", timeout: 10000 });

  // Validate the success message text
  await expect(alertMsg).toContainText(/Success: You have added\s+iPhone/i);

  // Optionally, validate the iPhone link exists
  await expect(alertMsg.getByRole("link", { name: "iPhone" })).toBeVisible();
});
