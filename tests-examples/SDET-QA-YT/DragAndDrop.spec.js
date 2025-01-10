const {test, expect} = require('@playwright/test');

test('Test Drag and drop', async({page})=>{

await page.goto('http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html');
await page.waitForTimeout(2000);
const rome = await page.locator('#box6'); // source element
const italy = await page.locator('#box106'); // target element

// Approach 1

/*await rome.hover(); // mouse over on rome to click
await page.mouse.down(); // click mouse to hold

await italy.hover(); // mouse over on italy
await page.mouse.up()// to release mouse now on italy
*/

//Approach 2

await rome.dragTo(italy);
await page.waitForTimeout(5000);

});