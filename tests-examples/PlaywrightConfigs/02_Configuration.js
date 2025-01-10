/***Grouping of Tests:

Add the @group name in test case title

Run the test cases by appending -- grep @groupname
npx playwright test --grep API

***/


/***
Reports:
npm install -g allure-commandline 
npx playwright test --grep Web --reporter=allure-playwright
allure generate ./allure-results --clean
allure open ./allure-report   

***/

/*** 

Playwright configuation for creating custom scripts in package.json
go to package.json file
Under scripts section add the custom scripts for running different test case conditions
"scripts": {
      "regression" : "npx playwright test",
      "webtesting" : "npx playwright test --grep @Web",
      "apitesting" : "npx playwright test --grep @API",
      "originconfigtest" : "npx playwright test --config playwright_origin.config.js"

  }

To run the test case say 
npm run webtesting
or npm run originconfigtesting
 npm run targets to above section

**/