import {test,expect} from '@playwright/test';

/**
 * 
 * Builtin Reports: configured in playwright.congig.ts file
 * reporter: [['html'], ['line'], ['list']], 
 * reports are generated in playwright-report folder
 * reporter: [['html', {open: 'always'}] - additional configuration to open the report
 * add outputFolder: '' after open if want to configure different folder path
 * 
 * html - default report which displyas result in html format including screenshots, video, trace references based on config file
 * 
 * command line reporters: Below 3 displays report only in command lines abd helps in CI environment
 * 
 * list reporter - only in console window list of test cases executed will be displayed
 * line reporter - The Line reporter displays only the last executed test on a single line and error if any
 * dot reportert - single green color dot reprsents pass and F in red colour represents failure and refer documentation for different symbols for status
 * 
 * Junit reports - reporter in xml format and provide location where it needs to be generated
 * reporter: [['junit', { outputFile: 'results.xml' }]],

 * Json reports - same like junit format give output file path
 * reporter: [['json', { outputFile: 'results.json' }]],
 * 
 * Allure Report:
 * npm install -g allure-commandline --save-dev
 * 
 * npm install -D allure-playwright
 * 
 * reporter: 'allure-playwright'
 * 
 * all above reports can be accessed in terminal using syntax npx playwright test --reporter=allure-playwright
 *
 *  Generate the HTML report:
allure generate ./allure-results -o ./allure-report
Or, to clean old reports:
allure generate ./allure-results -o ./allure-report --clean
Open the report in your browser:
allure open ./allure-report

Customized Report can be created by implementing using Reporter API
 * 
 */

test.beforeEach('launching app',async({page})=>{

await page.goto("https://demowebshop.tricentis.com/")

})

test('logotest', async ({ page }) => {
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
});

test('title test', async ({ page }) => {
    expect(await page.title()).toContain("Demo Web Shop1");
});

test('search test', async ({ page }) => {
    await page.locator('#small-searchterms').fill("laptop");  // fill teh text in search box
    await page.locator("input[value='Search']").click();      // click on the button
    await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop", { ignoreCase: true });
});