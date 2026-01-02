import { test, expect, Locator } from '@playwright/test';

test('Mouse hover',async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const pointme : Locator=page.locator('.dropbtn');
    await pointme.hover();

    const laptops : Locator=page.locator('.dropdown-content a:nth-child(2)');
    await laptops.hover();

});


test.skip('Right click',async ({page})=>{

    await page.goto('http://swisnl.github.io/jQuery-contextMenu/demo.html');

    const button: Locator=page.locator('span.context-menu-one');
    await button.click({button:'right'});  // this will perform the right click action

});

test('Double click',async ({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/');

    const btncopy : Locator=page.locator("button[ondblclick='myFunction1()']");
    await btncopy.dblclick();  // performs the double click action

    const field2 : Locator=page.locator('#field2');
    expect(field2).toHaveValue('Hello World!');

});


test.skip('Drag and drop',async ({page})=>{

    await page.goto('http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html#google_vignette');

    const rome : Locator=page.locator("#box6");
    const italy : Locator=page.locator("#box106");

    //Appraoch 1:  mouse hover and drag manually

    await rome.hover();
    await page.mouse.down();
    await italy.hover();
    await page.mouse.up();

    //Appraoch 2:  mouse hover and drag manually

    const washington : Locator=page.locator('#box3');
    const usa : Locator=page.locator('#box103');

    await washington.dragTo(usa); // this wil perform drag and drop action

});


test('Drag and Drop demo from Guru99', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://demo.guru99.com/test/drag_drop.html');

  // Locate source and target elements using CSS selectors
  const from1 : Locator = page.locator('#credit2 a');         // BANK
  const to1 : Locator = page.locator('#bank li');             // Debit Side

  const from2 : Locator = page.locator('#credit1 a');         // SALES
  const to2 : Locator= page.locator('#loan li');             // Credit Side

  const from3 : Locator = page.locator('#fourth a').first();  // 500 (1st)
  const to3 : Locator = page.locator('#amt7 li');             // Debit Amount

  const from4 : Locator = page.locator('#fourth a').nth(1);   // 500 (2nd)
  const to4 : Locator= page.locator('#amt8 li');             // Credit Amount

  // Perform drag and drop
  await from1.dragTo(to1);
  await from2.dragTo(to2);
  await from3.dragTo(to3);
  await from4.dragTo(to4);

  // Assert the "Perfect!" message is displayed
  const perfectText : Locator = page.locator('a:has-text("Perfect!")');
  await expect(perfectText).toBeVisible();
});