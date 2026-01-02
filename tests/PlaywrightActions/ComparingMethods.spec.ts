import { test, expect, Locator } from '@playwright/test';

test("Comparing methods - innerText() Vs textContent() ", async({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');
      
    const products:Locator=page.locator('.product-title');   //6

    //1) innerText() Vs textContent()

    console.log(await products.nth(1).innerText()); //14.1-inch Laptop - returns exact visible text
    console.log(await products.nth(1).textContent()); //returns text with space and including hidden elements also returned
   
    const count=await products.count();

    for(let i=0;i<count;i++)
    {
         const productName1 :string=await products.nth(i).innerText(); // Extracts plain text. Eliminates Whitespace and line breaks. returns only string
         console.log(productName1);

        const productName2: string | null =await products.nth(i).textContent();  // Extracts text including hidden elements. Includes Extra whitespaces, line breaks, etc. returns string or null
        console.log(productName2);

        const productName: string | null =await products.nth(i).textContent();  // Extracts text including hidden elements. Includes Extra whitespaces, line breaks, etc. 
        console.log(productName?.trim());

    }

});
 
test("Comparing methods -allInnerText() Vs allTextContent() ", async({page})=>{

    await page.goto('https://demowebshop.tricentis.com/');
      
    const products:Locator=page.locator('.product-title');   //6

//2)  allInnerText() Vs allTextContent()


console.log("**** Comparing allInnerText() Vs allTextContent() *****");
    
const productsNames: string[]=await products.allInnerTexts();
console.log("Product Names captured by allInnerText(): ", productsNames); //all plain texts captured in array

const productNames: string[]=await products.allTextContents();
console.log("Product Names captured by allTextContent(): ", productNames); // all text contents including hidden elements and spaces

const productNamesTrimmed:string[]=productNames.map(text=>text.trim()); // to remove the spaces
console.log("Product Names after trimmed: ", productNamesTrimmed);


});


test("Methods -all() to get locators array ", async({page})=>{

await page.goto('https://demowebshop.tricentis.com/');
      
const products:Locator=page.locator('.product-title');   //6
//3) all() - converts Locator----> Locator[]
//Returns array of locators
//Returns array of locators (Stores locators of products)/Converts Locator to array of locators (for iteration)
console.log("**** Test method all() to get locators in array *****");
const productsLocators:Locator[]=await products.all();
console.log(productsLocators);

//console.log(await productsLocators[1].innerText());

//for of loop
/*for(let productloc of productsLocators)
{
    console.log(await productloc.innerText());

}
*/

//for in loop

for(let i in productsLocators)
    {
        console.log(await productsLocators[i].innerText());
    }


});