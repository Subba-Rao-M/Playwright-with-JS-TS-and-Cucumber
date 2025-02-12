/***
 * Run playwright tests in parallel in azure cloud hosted browsers:
 * Configuration is minimal as playwright own product
 * For CI and CD subsription plan is required
 * 
 * Home - Create Resource - Market Place - Search for Playwright work space - Microsoft playwright testing preview 
 * Create Resource group
 * Give name and select region
 * Save details
 * https://learn.microsoft.com/en-us/azure/playwright-testing/how-to-manage-playwright-workspace?tabs=playwright
 * 
 * Run playwright tests in azure hosted browsers
 * Go to playwright.microsoft.com/workspaces
 * 
 * install npm init @azure/microsoft-playwright-testing@latest
 * playwright.service.config.js created
 * Login to azure using azure cli az login
 * redirects to browser to login and subsription is fetched
 * add regionendpoint setup
 * run test using playwright.service.config.js file
 * 
 * CI or CD Files:
 * Move the project to Github or azure devops repos
 * 
 * Create pipeline
 * Pipeline service connection - update details to get azuresubscription name to use in azure pipeline yml file
 * in Azure create pipeline using repo and yml fie created in repo
 * Update the playwright service url as variable
 * run the pipeline
 * 1step install dependencies
 * 2 - run the code
 * 3. reports
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */