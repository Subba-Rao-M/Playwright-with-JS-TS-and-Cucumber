/**
 * Playwright:

Playwright is a powerful end to end testing framework for modern applications
Native support for java script and type script and which supports in building robust and well structured framework


Why Playwright:
1) Reliable End to End Testing
	- has auto wait capability
	- example locator.click() checks if element is visible and waits for visiblity as inbuilt functionality
	- sync issues are taken care by inbuilt code for each locator as documented by playwright
	- This helps to reduce the flakyness

2) Cross browser compatibility
3) Multi platform support
4) Multilingual flexibility
	- Code can be written in java, c#,  python, java script, type script
	- java script and type script has native node supported features

Playwright Advanced Features
1) Tracing and Debugging
	- Built in tracing and debugging capability
	- Automatic screenshot
	- Video recording
	- Comprehensive logging
	
2) Netrwork Interception
	- inbuilt api testing library helps to intercept and validate network calls in browser
	- helps in edge case scenarios
	- Mocks API request and response data
3) Browser management
	- browser context - helps to save and transfer browser state across test suite
	- By pass the login by injecting cookies using the session infomration stored
4) Codegen Tool - To record test scenarios in browser

Install Node.js
	- Node.js is open source cross platform backend
	- It provides run time environment for java script outside web browser

Install Visual Studio Code

Install Playwright:

Create an empty folder in the system
Open the folder in visual studio
To install thje playwright and framework component run below command in terminal
npm init playwright
above command creates new project

playwright.config.js - has all playwright related configuration
package.json - all package dependencies are added in this file
node_modules - all playwright jars are added here
By default tests folder is created from above command and same referred in configuration file to place test cases.



 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */