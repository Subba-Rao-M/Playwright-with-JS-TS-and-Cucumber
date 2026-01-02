const {test, expect}= require('@playwright/test');

/**
 * Learn here:
 * 1) how to open URL using page fixture
 * 2) Verify the page title
 * 3) capture  the text field using CSS locator and enter values
 * 4) Click on Button
 * 5) Get the error text message from screen for invalid login
 * 6) Verify the text content and assert it
 */

/***
 * CSS or Xpath also can be used but not recommended
 * ID - > tagname#id or #id
 * class - > tagname.classvalue or .class value
 * attribute - > [attribute = 'value']
 * Traversing from parent to child - > parent tag name >> child tagname space is used in between 2 tags
 * If locator based on text value - > text = ''
 * Use selectorshub or chropath plugin
 */

test.only('Test interaction with text field, buttons and page texts', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

        /** idenfity element using page.locator and to enter values can use type and fill. type mehtod is now deprecated
         * fill method will clear the content of field by default and then enter the value into text field
        */
        await page.locator('#username').fill('rahulshettyacademy1');
        await page.locator("[type='password']").fill('learing');
        await page.locator('#signInBtn').click();
        /* Regular expression with tagname * is used to match partial data
            * the alert message in page blinks for 2 seconds and style value changes form block to none immediately
            * playwright has intelligence to wait until the element is displayed or not
            * In selenium we have to write explicit wait option
            * textContent method is used to get the text from page for any element
        */
        console.log (await page.locator("[style*='block']").textContent());
        /** asserting locator fetched value with text */
        await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    }
    );