import { test, expect, Locator } from '@playwright/test';

/**
 * XPath - Xml path language
 * to traverse throguh web page elements using its attributes and properties
 * Xpath follows every node in dom structure
 * 
 * 2 types : absolute and relative xpath
 * Absolute xpath: complete path starting with /
 * does not use attributes and traverse through each node
 * 
 * Relative xpath: partial path starts with //
 * uses attributes like id , class, name etc and directly jumps to element
 * //* - > star represents any value if node is not known or enter particular tag name
 * attribute starts with @
 * //tagname[@atribute1=''][@attribute2='']
 * //tagname[@atribute1=''and @attribute2=''] // use and or attribute like this and only one and or should be used
 * 
 * Syntax:
 * page.locator('xpath = /html/body/div[4]/div[1]/div[1]/div[1]/a/img');
 * page.locator('//html/body/div[4]/div[1]/div[1]/div[1]/a/img');
 */


test('XPath Demo in Playwright', async ({ page }) => {

  // Launch the URL and maximize window
  await page.goto('https://demowebshop.tricentis.com/');

  // 1. Absolute XPath (Full XPath) - Not recomended
  const logo: Locator = page.locator('//html/body/div[4]/div[1]/div[1]/div[1]/a/img');
  await expect(logo).toBeVisible();  // Expect the logo to be visible
 

  // 2. Relative XPath (Partial XPath)
  const relativeLogo: Locator = page.locator('//img[@alt="Tricentis Demo Web Shop"]');
  await expect(relativeLogo).toBeVisible(); // Expect the logo to be visible


  // 3. XPath with contains() - to locate with partial match
  let products: Locator = page.locator('//h2//a[contains(@href,"computer")]'); // Matches with multipe elements
  
  const productsCount :number = await products.count();   //Returns number of computer-related products 
  expect(productsCount).toBeGreaterThan(0);  // Expect the number of computer-related products to be greater than 0

  //console.log(await products.textContent()); //Error: strict mode violation: this appears when locator matches with more than one element common error in playwright
  console.log("First Computer product: ", await products.first().textContent());
   console.log("Last Computer product: ", await products.last().textContent());
  console.log("N-th Computer product: ",await products.nth(1).textContent()); //nth value starts from 0

  let productTitles:string[]=await products.allTextContents();// getting all the matched products in to an array
  console.log("All computer related product names:", productTitles); //print in the form of array

  //textContent will get single value and allTextCOntents gets all values

  for(let pt of productTitles)  // Printing product using loop if index required use in for loop
  {
    console.log(pt);
  }


  // 4. XPath with starts-with()
  const buildingProducts: Locator = page.locator('//h2//a[starts-with(@href,"/build")]'); // Matches with multipe elements
  const count = await buildingProducts.count();
  expect(count).toBeGreaterThan(0);  // Expect the number of build products to be greater than 0


  // 5. XPath with text()
  const registerLink:Locator = page.locator('//a[text()="Register"]'); 
  // //or for partial match //a[contains(text(),"Register")]
  // in place of text() dot . can be used
  // also normalize-space() in place of text() - ignores the spaces and text() considers the spaces
  await expect(registerLink).toBeVisible(); // Expect the register link to be visible
  
 
  // 6. XPath with last()
  const googlePlusLinkText:string = await page.locator('//div[@class="column follow-us"]//li[last()]').innerText();
  expect(googlePlusLinkText).toBe('Google+');  // Expect the last social media link to be "Google+"
 

  // 7. XPath with position()
  const twitterText:string = await page.locator('//div[@class="column follow-us"]//li[position()=2]').innerText();
  expect(twitterText).toBe('Twitter'); // Expect the second social media link to be "Twitter"

});