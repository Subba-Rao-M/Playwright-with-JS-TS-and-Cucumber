import { test, expect } from '@playwright/test';

/**
 *  1st round - 2nd round - 3rd round
 * pass - pass - Pass - Good
 * Pass - Fail - Fail - Good
 * Pass - fail - fail - pass - fail - Not good flaky test
 * Using configuration file use retry option to reexecute the test case
 * 
 * 
 */

test('flaky test', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/index.html');
    await page.getByRole('link', { name: 'Log in' }).click();
    await page.locator('#loginusername').fill('pavanol');
    await page.locator('#loginpassword').fill('test@123');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForTimeout(10000);
    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
    await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

});