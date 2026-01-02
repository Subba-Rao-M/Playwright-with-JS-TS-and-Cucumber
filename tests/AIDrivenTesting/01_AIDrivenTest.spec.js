const { test, expect } = require('@playwright/test');
import { ai } from '@zerostep/playwright';
/**
 * Zero playwright is developed by individuals to support ai in playwright
 * Sign into zerostep  using url
 * Token from zero step should be used to connect to zero step form playwright
 * install zero step plugin using npm i @zerostep/playwright -D
 * import import { ai } from '@zerostep/playwright'; 
 * https://medium.com/@sugumar.p/take-the-zero-th-step-towards-ai-with-playwright-b91c6b0217b8#:~:text=Here's%20how%20to%20set%20up,package%20to%20access%20ai()%20.&text=page%20%7D)%20%3D%3E%20%7B-,await%20page.,https%3A%2F%2Fexample.com')%3B
 * Create a configuration file zerostep.config.json and add the token value
 */
test('AI driven test', async({page})=>{
    const aiArgs = {page,test}
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const discountPrice = await ai("What is the Discount price of Tomato",aiArgs);
    expect(discountPrice).toEqual("26");
    const price = await ai("What is the Price of Tomato",aiArgs);
    expect(price).toEqual("37");
    const diff = await ai("What is the value difference between price and Discount price of tomato",aiArgs);
    expect(diff).toEqual("11");
  
    await page.goto("https://rahulshettyacademy.com/dropdownsPractise/");
    const blinkingText = await ai("Get blinkingText in the page",aiArgs);
    expect(blinkingText).toEqual("Free Access to InterviewQues/ResumeAssistance/Material"); 
    const firstValue = await ai('Split ${blinkingText} with "/" and give 0th index value',aiArgs);
    console.log(firstValue);
    expect(firstValue).toEqual("Free Access to InterviewQues");

});