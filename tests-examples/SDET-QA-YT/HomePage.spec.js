import { test, expect } from '@playwright/test';

test ('HomePage', async({page})=>{
    let url = 'https://www.demoblaze.com/index.html'
    await page.goto(url);
    let pagetitle =  page.title();
    console.log(pagetitle);
    await expect(page).toHaveTitle('STORE');
    await expect(page).toHaveURL(url);
    await page.close();
   
   
   
    
});