/*
CSS (Cascading Style Sheets) 

html + js+ css --> Web Page

2 types of css locators:

1) absolute CSS locator -- complete css path starting from root
html > head > title --> > represents navigation
CSS allows only top to bottom navigation is possible
It will never be used in automation scripts since structure will be broken if any changes in html dom structure

add attribute if multiple elements matches -> html > head > title[value='Title1']
to add more conditions -> html > head > title[value='Title1'][class='main'] 

:nth-child(2) -- index starts from 0
2) relative CSS locators -- directly jump to element using properties
p.sub or p[class = sub]
body>div>*:first-child
body>div>*:last-child
body>div>*:nth-child(2)

p[id^=ma] --> ^ represents partial match i.e id starts with ma
p[id$=er] --> $ represents partial match i.e id ends with er
p[id*=er] --> * represents partial match in between i.e id contains word er anywhere in main string
p[id='para1'][class='main'] - should have both attributes
p[id='para1'].not([class='mainn']) - should match with  one attributes and should not contain not attribute
p.not([id='para11'])[class='mainn'] 
p.not([id='para11']).not([class='mainn']) - other than these match element others with p tag
p[id='para1']+p - sibling element i.e immediate element next to it
p[id='para1']+* - capture all siblings

tag with id         tag#id    or      #id
tag with class      tag.class   or    .class
tag with any other attribute  tag[attribute=value]  or    [attribute=value]
tag with class and attribute  tag.class[attribute=value]  or  .class[attribute=value]
tag is optional in all above cases if it identifies field

Syntax: page.locator(css/xpath)

*/

import{test,expect,Locator} from "@playwright/test"


test("Verify CSS Locators",async ({page})=>{

    await page.goto("https://demowebshop.tricentis.com/");

    // tag#id

    const searchbox:Locator= page.locator("input#small-searchterms");
    //await searchbox.fill("T-Shirts");

    await expect(page.locator("input#small-searchterms")).toBeVisible();
    //await page.locator("input#small-searchterms").fill("T-Shirts");
    //await page.locator("#small-searchterms").fill("T-Shirts");


    //tag.class

    //await page.locator("input.search-box-text").fill("T-Shirts"); //Use class value without space which is unique for field
    //await page.locator(".search-box-text").fill("T-Shirts");


    //tag[attribute=value] //value may be placed inside '' or it can be ignored
    //await page.locator("input[name=q]").fill("T-Shirts");
    //await page.locator("[name=q]").fill("T-Shirts");
    

    //tag.class[attribute=value]
    //await page.locator("input.search-box-text[value='Search store']").fill("T-Shirts"); 
    await page.locator(".search-box-text[value='Search store']").fill("T-Shirts");
    await expect(page.locator(".search-box-text[value='Search store']")).toHaveValue("T-Shirts");

    await page.waitForTimeout(5000); //Pause for 5 seconds in debug mode to view the values in field

});








