/***
 * To install playwright - npm init playwright@latest
 * To know version - npx playwright --version
 * 
 *  package.json – Manages project dependencies and scripts. similar to pom file for java project
 *  playwright.config.js – Contains Playwright configuration settings.
 *  tests/ – Directory for organizing test files.
 * 
 * const { test, expect } = require('@playwright/test'); for JS
 * import { test, expect } from '@playwright/test'; for TS
 * test is used to define test cases.
 * expect is used for assertions
 * 
 * Many Playwright APIs such as page.goto(), page.title(), and page.url() return Promises because they 
    involve asynchronous browser operations. To handle them correctly:
        • Use await to pause execution until the Promise resolves.
        • Mark the function as async to allow the use of await.
        • async - Declares a function that returns a Promise and can use await
          Promise can be resolved or rejected
          Syncronous step by step and asyncronous parallel
        • await - Pauses the function execution until the Promise resolves
                - Use await if the statement is performing any action
                - Use await if statement retrurns some value
                - In other cases dont use await



Script Execution 
npx playwright test - > Runs all tests on all browsers in headless mode.
npx playwright test --headed -> Runs all tests in headed (non-headless) mode.
npx playwright show-report -> Opens the HTML test report.
npx playwright test mytest.spec.ts  -> Runs a specific test file.
npx playwright test --project=chromium --headed mytest.spec.ts -> Runs a specific test file only on Chromium in headed mode.
npx playwright test mytest1.spec.ts mytest2.spec.ts -> Runs multiple specified test files.
npx playwright test -g "test title" - > Runs the test(s) that match the given title. and g means global
npx playwright test --project=chromium  -> Runs all tests on the Chromium browser only.
npx playwright test --debug --> Runs tests in debug mode.
npx playwright test --last-failed --> TO rerun last failed test cases
npx playwright test example.spec.ts --debug -->  Debugs a specific test file.
npx playwright test mytest.spec.ts –ui -> Run the test in UI Mod


 Client or language binding – Playwright supports multiple programming languages and environments like Java, 
 JavaScript, typescript, python, etc.

Web Socket - Playwright uses a web socket protocol to interact with the client and server, in 
web socket protocol you can send back-to-back requests without terminating the connection 
which helps Playwright to perform test execution at a much faster pace than other automation tools.
As we all know HTTP uses a request-response model with stateless single interactions 
which means that after each request & response, the connection gets terminated and with 
each new request a new connection is established between the client and server so it's much 
slower.
Playwrights make use of web sockets instead of HTTP to interact with clients and 
servers. So once a connection is established between the client and server via web socket 
protocol, we can send back-to-back requests without terminating the connection which 
makes it much faster. Once the connection is established test execution starts, and all test 
cases can use the same connection for their execution, once execution is completed the 
connection is disabled.

Browser Context – It's an isolated instance of a browser that manages its storage, session 
IDs, cookies, caches, etc. 
This feature sets apart playwright from other automation tools by enabling the parallel execution
of test scripts which speeds up the testing process. 
Projects with modern applications that require multiple browser contexts, network controls, 
and fast and reliable cross-browser testing can opt for the Playwright tool. 
some of the realtime projects are Live trading applications, Gaming, Slack & GitHub


To install additional packages refer below commands:

Typescript complier
npm install -g typescript
to run the type script directly install type script executor
npm install -g tsx

npm init playwright@latest

npm install csv-parse
npm install xlsx
npm install -D allure-playwright
npm install @faker-js/faker

To Open Allure Report:
allure generate ./allure-results -o ./allure-report --clean
allure open ./allure-report

 * 
 */

import { test, expect } from '@playwright/test';
//test(title of test, function{test steps})
//fixture - global variables accessible throughtout project

test('Verify page title', async ({page }) => {
 await page.goto('https://playwright.dev/');
 await expect(page).toHaveTitle(/Playwright/); // / means it can have anything before or after in this case
 });

 
test('Verify page URL', async ({page }) => {
 await page.goto('https://playwright.dev/');
 await expect(page).toHaveURL(/playwright/); // / means it can have anything before or after in this case
 });