/*
An iframe (short for “inline frame”) is an HTML element that allows you to embed another HTML document within the current document. 
Iframes are commonly used to embed external content such as videos, maps, or other web pages (as seen here) into a web page without affecting the parent document.
*/

import { test, expect, Frame, Locator, FrameLocator } from "@playwright/test";

test("frames demo", async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    //total number of frames present on the page.
    const frames: Frame[] = page.frames(); // frames returns array of frames
    console.log("Number of frames:", frames.length)


    //---- Approach 1: using page.frame() ----
    const frame: Frame | null = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1.html" });

    if (frame) {
        await frame.locator("[name='mytext1']").fill("Hello");
        //await frame.fill("[name='mytext1']","Hello");
    }
    else {
        console.log("Frame is not available");
    }



    // --- Approach 2: Using frameLocator() ---

    const inputbox: Locator = page.frameLocator("[src='frame_1.html']").locator("[name='mytext1']"); //Capture the frame locator and inside frame locator capture element
    //any locator like css, etc can be used with page.frameLocator
    //with page.frame only name and url can be used
    await inputbox.fill("John");


});




test("inner/child frames demo", async ({ page }) => {

    await page.goto('https://ui.vision/demo/webtest/frames/');

    const frame3 : Frame | null = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' });

    //await frame3?.locator("[name='mytext3']").fill("Welcome");  not a best practice to use ? to handle null value
   
    if (frame3) {
        await frame3.locator("[name='mytext3']").fill("Welcome");
        const childFrames: Frame[] = frame3.childFrames();
        console.log("Child frames inside the Frame 3:", childFrames.length); // only 1 child frame exist
        const radio: Locator = childFrames[0].getByLabel("I am a human");
        await radio.check(); // select radio button
        await expect(radio).toBeChecked();// assertion
    }
    else {
        console.log("Frame 3 is not found..");
    }


});




// Test for Frame 1
test('Frame 1: Fill and assert input field', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frame1 : FrameLocator = page.frameLocator('frame[src="frame_1.html"]');
  await frame1.locator('input[name="mytext1"]').fill('Welcome');
  await expect(frame1.locator('input[name="mytext1"]')).toHaveValue('Welcome');
});

// Test for Frame 2
test('Frame 2: Fill and assert input field', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frame2 : Frame | null = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_2.html' });
  if (frame2) {
    await frame2.locator('input[name="mytext2"]').fill('Suneel');
    await expect(frame2.locator('input[name="mytext2"]')).toHaveValue('Suneel');
  } else {
    console.error("Frame 2 not found.");
  }
});

// Test for Frame 3 with Nested Child Frame
test('Frame 3: Handle nested frame and form interactions', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frame3 : Frame | null = page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_3.html' });

  if (frame3) {
    await frame3.locator('[name="mytext3"]').fill('You are in Frame 3 - Teal');
    await expect(frame3.locator('[name="mytext3"]')).toHaveValue('You are in Frame 3 - Teal');

    const childFrames : Frame[] = frame3.childFrames();
    const child : Frame = childFrames[0];

    // Interact with elements in the child frame
    await child.getByRole('radio', { name: 'Hi, I am the UI.Vision IDE' }).click();
   
    await child.getByRole('checkbox', { name: 'Form Autofilling' }).click();
 
    await child.getByRole('option', { name: 'Choose' }).click();
    await page.waitForTimeout(2000);
    await child.getByRole('option', { name: 'Yes' }).click();
    await page.waitForTimeout(2000);

    await child.getByRole('button', { name: 'Next' }).click();

    const shortText = child.getByRole('textbox', { name: 'Enter a short text' });
    await shortText.fill('We are here');
    await expect(shortText).toHaveValue('We are here');

    const longText = child.getByRole('textbox', { name: 'Enter a long answer' });
    await longText.fill('We are able to access all element in child frame');
    await expect(longText).toHaveValue('We are able to access all element in child frame');

    await child.getByRole('button', { name: 'Submit' }).click();
    const confirmationText = await child.locator('.vHW8K').innerText();
    expect(confirmationText).toContain('Thank you for testing the UI');
  } else {
    console.error("Frame 3 not found.");
  }
});

// Test for Frame 5
test('Frame 5: Fill input and verify logo after link click', async ({ page }) => {
  await page.goto('https://ui.vision/demo/webtest/frames/');
  const frame5 : Frame | null= page.frame({ url: 'https://ui.vision/demo/webtest/frames/frame_5.html' });

  if (frame5) {
    await frame5.locator('input[name="mytext5"]').fill('playwright');
    await expect(frame5.locator('input[name="mytext5"]')).toHaveValue('playwright');
    await frame5.locator('a[href="https://a9t9.com"]').click();
    await page.waitForTimeout(5000); // Give time for content to load
    const logo = frame5.locator('img.responsive-img').first();
    await expect(logo).toBeVisible();
  } else {
    console.error("Frame 5 not found.");
  }
});

