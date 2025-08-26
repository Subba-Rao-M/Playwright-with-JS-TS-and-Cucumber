/***
 * Open Jenkins localhost
 * Open new item with free style project
 * Use git for repository path or custom work space to provide the local system path
 * Select build step - execute window batch command for windows and for mac shell
 * give command npm run regression
 * Save
 * Click on Build Now to run the project
 * To parameterize, choose this project is parameterized and select choose choise parameter
 * Give the name for variable as script
 * Give all options to be used to select same as from package.json file data
 * Update shell/script in command as below:
 * npm run "$script" - for macos 
 * npm run "%script%" - for windows batch command
 * Save
 * Now click on build with parameter
 * select value from drop down
 * View the console for triggered values
 * To create with allure report add the new value with details to generage
 * 
 */