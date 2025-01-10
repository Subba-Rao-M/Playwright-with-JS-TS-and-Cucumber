const {test, expect} = require('@playwright/test');

/***
 *  
 * 
 */

test('Test Radio Buttons, CheckBox and web based popup and asserting selected value', async ({page})=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
        await page.locator('#username').fill('rahulshettyacademy1');
        await page.locator("[type='password']").fill('learing');

        /*Select radio button*/
        await page.locator('.radiotextsty').last().click(); //Use first to click first radio button and nth in between
        
        /*Web based popup opened here and using its class click it. Java scipt based popup will be handled in different way*/
        await page.locator('#okayBtn').click();
        console.log (await page.locator('.radiotextsty').last().isChecked()) ; //Returns boolean value

        //Assert if user radio button is clicked
        await expect(page.locator('.radiotextsty').last()).toBeChecked();

        //Select drop down list value
        const dropdown = page.locator('select.form-control');
        await dropdown.selectOption('consult');

        //Check the checkbox
        await page.locator('#terms').click();
        await expect(page.locator('#terms')).toBeChecked();

        //To uncheck the check box
        await page.locator('#terms').uncheck(); //Unchecked will not have to be checked option to overcome this use to be falsy
        expect (await page.locator('#terms').isChecked()).toBeFalsy();
        /**
         * Observe in all above lines await was coming in the begining and in above statment it came after expect expect before locator
         * When storing locator in variable await is not used 
         * await should be used with statement which performs action
         * ischecked action is performed inside bracket
         * 
         */


        await page.locator('#signInBtn').click();
    });

