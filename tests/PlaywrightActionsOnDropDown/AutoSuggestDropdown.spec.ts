/**
 * Single select drop down(select tag)
 * Dynamic / Autosuggest drop down(option keeps changing dynamically) - Boot Strap down list
 * Example: Goodgle, flipkart search lists based on input value
 * Hidden drop down - options not found in dom and cannot inspect
 * Click on right click to identify elelment drop down disappears
 * Selector hub - debugger option - Turn on debugger in right side
 * wait for page for freeze
 * 
 * Another option Inspect element and click on DOM
 * then press Ctlr + Shift + P
 * enter Run > Emulate focussed page and click
 * options displayed will be focussed for drop down
 * Then type Do not emulate a focused page and select.

when searching ajax call happens and autowait will not work
so manually add wait to solve the problem of getting wrong data

 */

import { test, expect, Locator } from "@playwright/test";


test("Verify auto suggestion dropdown values", async ({ page }) => {

    await page.goto("https://www.flipkart.com/");
    await page.locator("input[name='q']").fill("Smart");

    await page.waitForTimeout(5000); //To complete ajax call to get response from server

    //Get autosuggestion values to be loaded Ctrl + shipt + p

    const options: Locator = page.locator("ul>li");

    const count: number = await options.count();

    console.log("Number of auto suggested values: ", count);

    //To get specific value
    console.log(await options.first().innerText());
    console.log(await options.nth(5).innerText());
    console.log(await options.last().innerText());
    
    //Print all suggested values using all text cotent if it works else use inner text

    console.log(await options.allTextContents());

    //One more approach

    console.log("Using for loop");

    for(let i=0; i< count ; i++){
        const text = await options.nth(i).innerText();
        console.log(text);
        // console.log(await options.nth(i).textContent()); //check for trimming values

        if(text === 'smartphone'){
            await options.nth(i).click();
            break;
        }
    }

    /***
     * text content is used for capturing the value of an element
     * inner text is used to capture the value of input element value like value entered in text box field immediately after entering
     * 
     */

});