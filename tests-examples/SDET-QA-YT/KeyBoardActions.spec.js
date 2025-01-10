const {test, expect} = require('@playwright/test');

test('Test Drag and drop', async({page})=>{

    await page.goto('https://gotranscript.com/text-compare');
    await page.waitForTimeout(3000);
    
    await page.fill('[name="text1"]', "Welcome to India");
    // Control + A

    await page.keyboard.press('Control+A'); // for multiple keys use press

    // COntrol + C
    await page.keyboard.press('Control+C');

    // Tab
    await page.keyboard.down('Tab'); // down/up for single key  for releasing


    // Control + V
    await page.keyboard.press('Control+V'); // down since sing
    await page.waitForTimeout(3000);

});