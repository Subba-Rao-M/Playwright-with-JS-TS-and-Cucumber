const {test, expect}= require('@playwright/test');

//from playwright test jar available in node_modules import test
/**
 * Learn here:
 * 1) Creating asynronous java script functions using async and await and anonymous way
 * 2) Launching playwright test using browser fixture
 * 3) Launching playwright test using page fixture
 * 
 * 
 */


test.skip('First Test Case', async function()
{

    //playwright test line 1
    // test line 2

    /**
     * If we dont write async and await java script will not wait for previous step to complete
     * await waits for previous step to complete
     * to make await work we have to make function as asynchronous
     * if await is missed all test steps becomes flaky
     * Above function is anonymous function since it dont have any name
     * After java script 6, anonymous function will be written as ()=> for function()
     * Whenever we create a test method, few global fixtures are automatically available
     * fixture are global variables
     * browser fixture - used to invoke browser 
     * page fixture -  for manging pages these are similar to driver in selenium
     * To make these playwright fixture it should be entered insder {} i.e {browser} or {page}
     * browser will have browser type like chrome context, cookies and different plugins
     */

}

);

test.skip('Another  anonymous Test Case', async ()=>
{
    //Write steps with await here
}
);

test.only('Browser context declaration', async ({browser})=>
    {
        const context = await browser.newContext() // Creates new browser instanace with required context options
        //Now browser context will give new page
        const page = await context.newPage();
        await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
        await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    }
    );

test.only('Page fixture Test with default browser context', async ({page})=>
        {
           //if there is no additional information to pass to browser context direclty use page fixture
           //page fixture internally calls defaut browser context
            await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
            await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    
        }
        );

        /**
         * Understanding the default playwright configuration file
         * const config is an onbject
         * config object has different properties
         * testDir = where all the test cases are placed
         * use object- property is used by all test cases
         * 
         * 
         */

        /**
         * running test npx playwright test
         * in node module check playwright and run test command
         * by default headeless mode is used
         * To run in headed mode - npx playwright test --headed
         * browser will close automatically
         * To execure single test case from file
         * test.only
         * To skip the test cases
         * test.skip
         * 
         * npx playwright test --ui
         * test runner window will open to execute the test cases
         * 
         * npx playwright test testname.spec.js --debug 
         * to run the test in debug mode
         * 
         * 
         * 
         */