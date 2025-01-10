const { Before, After, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber');
const {POManager} = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');

Before(async function(){
    console.log("Before Scenario : *** SetUp codes add here for adding cookies,data,etc***");
     const browser = await playwright.chromium.launch({
            headless: false
        });
        const context = await browser.newContext();
        this.page = await context.newPage();
        this.poManager = new POManager(this.page);
});


After(function(){
console.log("After Scenario: ***Clean up codes add here for deleting cookies,data,etc***");


});

BeforeStep(function(){
console.log("Before Step : ***Executed before step***");
});

AfterStep(async function({result}){
    console.log("After Step : ***Executed after step***");
    if(result.status === Status.FAILED){
        await this.page.screenshot({path:"features/Screenshots/"+Date.now()+'tests.png', fullPage: true});
    }
    });