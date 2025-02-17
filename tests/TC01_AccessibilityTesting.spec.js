const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

test.describe('WCAG 2.1 AA Accessibility Tests', () => {

    test('Check accessibility compliance on Dashboard Page', async ({ page }, testInfo) => {
        await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

        const accessibilityScanResults = await new AxeBuilder({ page })
            // .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .withTags(['wcag2aa'])
            .analyze();
        await testInfo.attach("accessibility-scan-results", {

            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: "application/json"

        });
        expect(accessibilityScanResults.violations).toEqual([]);
    });

    test('Check accessibility compliance on Offers Page', async ({ page }) => {
        await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');

        const accessibilityScanResults = await new AxeBuilder({ page })
            // .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .withTags(['wcag2aa'])
            .analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });


    test('Check accessibility compliance on MyLearnings Page', async ({ page }) => {
        await page.goto('https://www.onlinesbi.sbi/');

        const accessibilityScanResults = await new AxeBuilder({ page })
            // .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
            .withTags(['wcag2aa'])
            .analyze();
        expect(accessibilityScanResults.violations).toEqual([]);
    });

});