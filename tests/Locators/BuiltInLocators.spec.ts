/*

Locator - Identifies the element on the page.
DOM - Document Object Model
DOM  is an API Interface provided by browser.

1) page.getByAltText() to locate an element, usually image, by its text alternative.
2) page.getByText() to locate by text content.(Non interactive elements)
3) page.getByRole() to locate by explicit and implicit accessibility attributes.
4) page.getByLabel() to locate a form control by associated label's text.
5) page.getByPlaceholder() to locate an input by placeholder.

6) page.getByTitle() to locate an element by its title attribute.
7) page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

Locator provides auto waiting and retrival ability which was not available in selenium where explicit fluent wait was required
This will reduce synronization issue

*/

import {test, expect} from "@playwright/test"


test.skip("Verify Playwright Locators - Get By dataset id",async ({page})=>{

// 7. page.getByTestId() : Locate an element based on its data-testid attribute (other attributes can be configured)
  // When to use: When text or role-based locators are unstable or not suitable.
 
  await page.goto("/");
  await expect(page.getByTestId("profile-email")).toHaveText("john.doe@example.com");
  await expect(page.getByTestId("profile-name")).toHaveText("John Doe");

})

