/*
Keyboard methods:
insertText
down
press
type -- same like insert text for input of data
up

await page.keyboard
*/

import { test, expect, Locator } from '@playwright/test';

test('keyboard actions', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const input1 : Locator = page.locator('#input1');

    //1) fous on input1
    await input1.focus(); //await input1.click();

    //2) provide the text input1
    await page.keyboard.insertText("welcome");

    //3) Ctrl + A - select the text from input1
    await page.keyboard.down('Control'); // For mac use Meta
    await page.keyboard.press('A');
    await page.keyboard.up('Control');

    //4) Ctrl +C - copy the text from input 1
    await page.keyboard.down('Control');
    await page.keyboard.press('C');
    await page.keyboard.up('Control');


    //5 Press TAB - 2 times
    /*await page.keyboard.down('Control');
    await page.keyboard.press('Tab');
    await page.keyboard.up('Control');*/
    //instead of above down and up statement below single statement can be used

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');


    //6) Ctrl + V  - past the text in input2
    await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');


    //7) Press TAB - 2 times
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');


    //8) Ctrl+V - past the text in input 3
    /*await page.keyboard.down('Control');
    await page.keyboard.press('V');
    await page.keyboard.up('Control');*/

    //insert of writing above 3 statements above also can be written in single statement like below

    await page.keyboard.press('Control+A');


});


