const {test, expect} = require('@playwright/test');

test('Test frames', async({page})=>{


await page.goto("https://ui.vision/demo/webtest/frames/");

// to get total number of frames

const totalFrames = await page.frames();
console.log("total number of frames", totalFrames.length);

// Approcah 1 - Using name or url

//const frame1 = await page.frame("name of frame");

//const frame1 = await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_1.html'}); // from source give complete url by right click
//await frame1.fill("[name = 'mytext1']", 'Hello');

// Approach 2 - Using framelocator

//const inputbox = await page.frameLocator("frame[src='frame_1.html']").locator("[name = 'mytext1']");
//await inputbox.fill("Hello Text");

//Approach 3 - Handling nested i frames

const frame3 = await page.frame({url: 'https://ui.vision/demo/webtest/frames/frame_3.html'});
await frame3.locator("input[name = 'mytext3']").fill("Welcome!");

//nested frame inside frame 3

const childFrame = await frame3.childFrames(); // arrayvariable returns all frames
childFrame[0].locator("//*[@id='i5']/div[3]/div").check();

await page.waitForTimeout(5000);

});