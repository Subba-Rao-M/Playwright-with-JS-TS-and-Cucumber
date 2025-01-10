import {test, expect} from '@playwright/test';

test('Page Screenshot', async ({page})=>{
await page.goto('https://demo.opencart.com');

await page.screenshot({path:"tests/Screenshots/"+Date.now()+'HomePage.png'});

});

test('Full Page Screenshot', async ({page})=>{
    await page.goto('https://demo.opencart.com');

    await page.screenshot({path:"tests/Screenshots/"+Date.now()+'FullHomePage.png', fullPage: true});
});

test.only('Only particular element', async ({page})=>{
    await page.goto('https://demo.opencart.com');

    await page.locator('//a[normalize-space()="Desktops"]').screenshot({path:"tests/Screenshots/"+Date.now()+'Desktop1.png'});
});


// for taking screenshot for all test cases in playwright configuration file add screenshot: ON under use section

// for video also add playwright configuration settings