const { test, expect } = require('@playwright/test');

test('Test Drop DOwn box', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com');

    //multiple way to select values in drop down prefer to use label or visible text

    //await page.locator("#country").selectOption({label: 'India'}); // By using label

    //await page.locator("#country").selectOption('India'); // By using visible text

    // WHen value and visible text are different w.r.t attributs
    // await page.locator("#country").selectOption({value: 'uk'});

    //await page.locator("#country").selectOption({index: 3}); // By using index

    // By using locator and value in page fixture which is also preferrable
    //await page.selectOption("#country", "India");

    //Assertions in dropdown

    //TO check total number of options in dropdown

    //const options = await page.locator("#country option");
    //await expect(options).toHaveCount(10);

    //TO check all the number of options in array format
    // const options = await page.$$("#country option");
    //  console.log("Number of options", options.length);
    //  await expect(options.length).toBe(10);

    // CHeck presence of some value in drop down - appoach 1

  //  const content = await page.locator('#country').textContent(); // text content will always return string
    //console.log("COntent value", content);
    //await expect(content.includes('India')).toBeTruthy();
  
    // CHeck presence of some value in drop down - appoach 2 - using loop statement

    /*const options = await page.$$('#country option');
    let status = false; // whenvever value changes dont use const
    for (const option of options){
        //console.log(await option.textContent());
        let value = await option.textContent();
        if(value.includes('France')){
            status = true;
            break;
        }
    }
    expect(status).toBeTruthy();*/

    // CHeck presence of some value in drop down - appoach 2 - using loop statement

    const options = await page.$$('#country option');
    
    for (const option of options){
        //console.log(await option.textContent());
        let value = await option.textContent();
        if(value.includes('France')){
            await page.selectOption("#country", value);
            break;
        }
    }
    

});