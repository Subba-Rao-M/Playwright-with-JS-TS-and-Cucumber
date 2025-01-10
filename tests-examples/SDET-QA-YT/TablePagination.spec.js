const { test, expect } = require('@playwright/test');

test('Test tables', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com");
    page.waitForTimeout(5000);
    const table = await page.locator('#productTable'); // locate table
    //total number of rows and columns
    const columns = await table.locator('thead tr th');
    console.log("Number of columns : ", await columns.count());
    expect.soft(await columns.count()).toBe(4);

    const rows = table.locator('tbody tr');
    console.log("Number of rows: ", await rows.count());
    expect(await rows.count()).toBe(5);

    // to select product 4 checkbox

    /*const matchedRow = rows.filter({
        has: page.locator('td'),
        hasText: 'Product 4'
    }); // matched row gets td value which has value product 4, so particular row is captured

    await matchedRow.locator('input').check(); // checkbox has id as input and its checked
    await expect(matchedRow.locator('input')).toBeChecked(); */

    // scenario 2 Select mutiple products using re-usable function
    /*await selectProduct(rows, page, 'Product 1');
    await selectProduct(rows, page, 'Product 3');
    await selectProduct(rows, page, 'Product 5');*/

    //Scenario 3 To print all data from table excluding chekcbox

    /*for(let i=0; i< await rows.count(); i++){
        const myRow = rows.nth(i); // capture row
        const tds =  rows.locator('td'); // Fetches all tds for current row i

        for (let j=0; j<await tds.count()-1; j++){
           console.log(await tds.nth(j).textContent());
        }
    }*/

    //Scenario 4 TO print data from all pages by clicking pagination link

    const pages = await page.locator('.pagination li a');
    console.log("Number of pagination available", await pages.count());

    for (let p = 0; p < await pages.count(); p++) {// p nth item starts from 0 i.e 0 means first record 1

        if (p > 0) { // since first pagination 1 is default displayed no need to click
            await pages.nth(p).click(); // Click on each pagination icon
            await page.waitForTimeout(3000);
        }
        // Repeat to get text content same as scenario 3
        for (let i = 0; i < await rows.count(); i++) {
            const myRow = rows.nth(i); // capture row
            const tds = rows.locator('td'); // Fetches all tds for current row i

            for (let j = 0; j<await tds.count()-1; j++) {
                console.log(await tds.nth(j).textContent());
            }
        }
    }


    await page.waitForTimeout(5000);
});

async function selectProduct(rows, page, name) {
    const matchedRow = rows.filter({
        has: page.locator('td'),
        hasText: name
    });

    await matchedRow.locator('input').check();
};