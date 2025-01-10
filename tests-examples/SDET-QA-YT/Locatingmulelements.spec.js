const {test, expect}= require('@playwright/test');

test('Locators for multiple elements', async ({page})=>{
    await page.goto('https://www.demoblaze.com/index.html');

 /*   // To display all link texts in screen
    const links = await page.$$('a');
    for(const linkvalues of links){
        const linktext =await linkvalues.textContent(); 
        console.log(" All Links", linktext)

    }*/

    // TO display all products in screen

   await page.waitForSelector("//div[@id='tbodyid']//h4/a");
   const products = await page.$$("//div[@id='tbodyid']//h4/a");
    for (const product of products ){
        const productName =await product.textContent(); 
        console.log(" All productName", productName)
    }
    
});