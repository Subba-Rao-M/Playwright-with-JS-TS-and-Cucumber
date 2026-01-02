import { test, expect } from '@playwright/test';

/**
 * Autowait works for actions and assertions
 * Playwright locator by default have autowait capability 
 * example click waits for element to appear before performing any action and checks like is it visible, stable, receives event and enabled
 * for fill action is checks like is it visible,enabled and editable
 * it peforms predefined checks based on locator action type
 * It waits for default for 30 seconds for autowait, this can be customized in config file
 * For assertion also autowait works and waits until default time configured
 * Assertion will have default of 5 seconds
 */

test('Autowaiting and forcing', async ({ page }) => {
 
  test.setTimeout(50000); // 50 secs overrides default value from configuration
  //test.slow(); // 90 secs  ( Defaul is 30 secs and increased limit by 3 X default value)

  await page.goto('https://demowebshop.tricentis.com/');

  //Assertions - Auto wait works
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/",{timeout:10000}); // expect time out overriding default value
  await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout:10000}); 

  //Actions - Auto wait works
  //force - actionability checks like enabled, visible etc not checked if force set to true
  await page.locator('#small-searchterms').fill("Laptop",{force:true}); //search box - Force action( it will not so actionalibity checks)
  await page.locator('.button-1.search-box-button').click({force:true}); // clicking on search button -Force action

});