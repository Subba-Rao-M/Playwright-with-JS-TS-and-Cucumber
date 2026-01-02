import {test, expect, Locator} from "@playwright/test"

import path from 'path';

// Get the absolute path to your index.html file
const htmlFilePath = 'file:///' + path.resolve(__dirname, 'index.html');

test('should correctly find and interact with elements using data-testid', async ({ page }) => {
    // 1. Navigate to the local HTML file
    await page.goto(htmlFilePath);
    
    // 2. Locate and click the Log In button
    // Locates the element with data-testid="login-button"
    const loginButton: Locator = page.getByTestId('login-button');
    await expect(loginButton).toBeVisible();
    await loginButton.click();
    console.log('Successfully clicked the Login button.');

    // 3. Locate and verify the status message
    // Locates the element with data-testid="status-message"
    const statusMessage :Locator = page.getByTestId('status-message');
    await expect(statusMessage).toContainText('Please log in');
    console.log('Successfully verified the status message.');

    // 4. Locate the email input and fill it
    // Locates the element with data-testid="email-input"
    const emailInput: Locator = page.getByTestId('email-input');
    await expect(emailInput).toBeEditable();
    await emailInput.fill('test.user@example.com');
    console.log('Successfully filled the email input.');

    // 5. Assert the value was correctly filled
    await expect(emailInput).toHaveValue('test.user@example.com');
    console.log('Successfully asserted the email value.');
});