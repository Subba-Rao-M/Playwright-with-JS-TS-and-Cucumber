const {test, expect } = require('@playwright/test');

test('Playwright special locatores', async ({page})=>{

    /**
     * GET BY LABEL
     * If any text written inside label tag then get by label can be used
     * playwright intelligently clicks on element or operates on field near label
     * if it is radio or checkbox both click and check methods can be used
     * for input text fields it may not be stable and will work if input text field is wrapped inside label tag as associated fields
     * or it will work if associated of label and input fields are provided like label has for tag and same is used for input field id
     */
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").check(); //Clicks on check box with label given
    await page.getByLabel("Employed").check(); //Clicks on radio button value which has label as employed
    await page.getByLabel("Gender").selectOption("Female");
    //await page.getByLabel("Name").fill("Test"); // Not recommended and most of the time it will not work if label and field in different lines

    /**
     * GET BY PlaceHolder
     * field displays place holder value
     * html tag has attribute for placeholder
     */

    await page.getByPlaceholder("Password").fill("test@1234");


    /***
     * Get by Role
     * await page.getgetByRole("") - on enering "" it will display all roles supported by playwright
     * compare the availability of value from html tag to use it
     * first attribute in role and 2nd one is associated unique value for it
     * tag name or attribute name can have role value selected
     */
    await page.getByRole("button", {name: 'Submit'}).click();


    /**
     * Get By Text
     * checks if text visible in page or not
     */

    expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy;

    await page.getByRole("link", {name: 'Shop'}).click();

    /**
     * Chaining of locators
     * filter will search for value based on hastext or no text or has or not has locator
     * get by role is used for filtered element if any button availabe to perform another action
     * if there is no duplicate element for the role, there is no requriment to add one more filter
     */

    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();

    /**
     * generally in framework to maintain consistancy single locator approach is used
     */
});