const {test, expect} = require('@playwright/test');
/**
 * npx playwright test filename.spec.js --debug
 * above will open in debug mode
 * use step over F10 for next step
 * Logs for each step displayed in bottom of screen
 * explore option in debug mode helps to identify the locators
 * Use pick locator to get the locator values
 * 
 * Code Gen tool for record and playback
 * npx playwright codegen <giveurl> 
 * 
 * 
 * palywright Screenshots:
 * In configuration file use section add screenshot: 'on'
 * captures screenshot for every step
 * 
 * trace: on - captures the log for each step -- After execution go to playwright trace url https://trace.playwright.dev/ and upload the zip file it showns trace with screenshot for each step
 * Refer action , before and after columns for each step
 * Mainly it is used only when test fails
 * call has detailed logs
 * Each test case is a sub folder under traces and if 100 test case then 100 test case folder generated
 * 
 * reporter: html - to view the reports 
 * 
 * Refresh project and go to playwright - reports - index.html
 * 
 * 
 * 
 * 
 */