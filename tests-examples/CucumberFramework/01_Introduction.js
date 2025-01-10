/**
 * playwright uses mocha framework as its base library
 * 
 * when using playwright with cucumber mocha there will be conflict when defining custom methods
 * Cucumber-JS - installation :  https://cucumber.io/docs/installation/javascript/
 * https://github.com/cucumber/cucumber-js
 *  run command - > npm install --save-dev @cucumber/cucumber
 * 
 * In VS code market place search for Cucumber (Gherkin) Full Support and install it
 * 
 * Feature is like test suite and each scenario is like a test case
 * 
 * 
 * to run the cucumber file run command - > npx cucumber-js
 * above command file will search the feature file in node file and execute it
 * 
 * world constructor
 * without creating global variables the properites of steps should talk each other 
 * i.e is code/variable written for one step function should be available in other step
 * world constructor is activated using this keyword
 * example: const poManager = new POManager(page); is written as this.poManager = new POManager(page);
 * so poManager is shared with other steps
 * 
 * 
 * to exit the cucumber test cases explitly say --exit to come out of terminal npx cucumber-js --exit
 * 
 * Cucumber Hooks:
 * Before - runs before scenario starts execution
 * After - hook runs after the sceanrio execution
 * BeforeStep and AfterStep - for each step in a scenario - example if step fails to take screenshot
 * 
 * 
 * To run specific feature file - npx cucumber-js features/ErrorValidation.feature --exit 
 * 
 * Tags in cucumber:
 * E2E, smoketest, sanitytest, regressiontest, validationtest, etc keywords are added in feature file
 * npx cucumber-js --tags "@E2ETest" --exit
 * 
 * 
 * Also tags can be added as hooks in before method
 * 
 * Before({tags: "@E2ETest"},async function(){}); Only for tests with tag before method will be called
 * 
 * Same scenario can have multiple tags and in hooks and or or operator can be used to execute
 * 
 * Parameterization: If scenario needs to be parameterized then define scenario keyword as scenario 
 * dynamic field values should be written as "<column header>"
 * test data for scenario outline should be written as tabular format for column headers
 * 
 * 
 * Parallel Testing:
 * Cucumber can run scenarios in parallel but not feature files
 * Feature files cannot be executed in parallel as per limitation in cucumber frameworks
 * number of threads can be given with parallel option
 * npx cucumber-js features/Ecommerce.feature --parallel 2 --exit
 * 
 * Generating cucumber html report:
   npx cucumber-js features/Ecommerce.feature --parallel 2 --exit --format html:cucumber-report.html
 * 


   Retry failed Test Cases: 
npx cucumber-js --retry 2 --exit  

retry failed test cases 2 times

in command prompt only final status is considered if re-run also

Update the package.json script section for cucumber execution

npx cucumber-js features/Ecommerce.feature --retry 1 --exit --format html:cucumber-report.html

run the test cases using npm run CucumberFeaturesTest

 */