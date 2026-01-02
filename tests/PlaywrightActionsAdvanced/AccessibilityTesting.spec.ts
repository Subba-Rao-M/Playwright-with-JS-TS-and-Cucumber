/*

Accessibiliy testing to make sure application is accessible for all types of user for different input fields, text and images in Ui
1) Playwright can be used to test your application for many types of accessibility issues.
Examples:
    Missing or Improper ALT Text for Images
    Poor Color Contrast
    Missing Form Labels
    Keyboard Navigation Issues

Every website should follow WCAG guidelines.
    - Web Content Accessibility Guidelines (WCAG) 
    - Different standards periodically revisited and updated and released to follow to comply with standards

Install @axe-core/playwright: 
    npm install @axe-core/playwright

https://www.npmjs.com/package/@axe-core/playwright


*/

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';


let accessibilityScanResults: any;

test("accessibility test to test violations", async ({ page }) => {

    //1) Scanning detect all types of WCAG violations.
    accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    console.log(accessibilityScanResults);
    expect(accessibilityScanResults.violations).toEqual([]);
});

test("accessibility test to test violations of specific type", async ({ page }) => {
    
    //2) Scanning for few WCAG violations
    accessibilityScanResults = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
});

test("accessibility test by disabling few rules", async ({ page }) => {

    //3) Scanning for fe WCAG violations with rules i.e disable particular rule
    accessibilityScanResults = await new AxeBuilder({ page }).disableRules(['duplicate-id']).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);


});

test.beforeEach('Beforeach', async ({ page }) => {

    console.log("this is Before each....")

    //await page.goto('https://demowebshop.tricentis.com/');
    await page.goto('https://www.w3.org/'); // page to test with 0 vialations


});

test.afterEach('Aftereach', async ({ page }, testInfo) => {

    console.log("this is After each....")
    //to attach the scan result into report
    await testInfo.attach('accessibility results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
    });

    console.log("Number of violations:====>", accessibilityScanResults.violations.length);
    expect(accessibilityScanResults.violations.length).toEqual(0);

});



