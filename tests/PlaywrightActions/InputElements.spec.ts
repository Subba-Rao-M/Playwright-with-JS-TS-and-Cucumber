import {test,expect,Locator} from "@playwright/test";


//Text Input/ Text Box/ Input Box
// Radio Buttons
//Check boxes

test('Text Input Actions',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const textBox: Locator=page.locator('#name');

    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();

    const maxLength: string | null = await textBox.getAttribute("maxlength"); // Returns value of maxlength attribute of the element
    expect(maxLength).toBe('15'); //check if attributes value is correct or not. along with value await is not required with element await is required


    await textBox.fill("John Canedy");

    console.log("text content of FirstName :", await textBox.textContent());  //returns empty and also to have text returns empty

    //use inputvalue to et the value
    const enteredValue: string=await textBox.inputValue();
    console.log("Input Value of the FirstName :", enteredValue); // returns th input value of text box
    expect(enteredValue).toBe("John Canedy");

});


//Radio Buttons

test('Radio Button Actions',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

   const maleRadio:Locator=page.locator('#male');  // Male radio button

    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    expect(await maleRadio.isChecked()).toBe(false);

    await maleRadio.check(); // select radio button
    expect(await maleRadio.isChecked()).toBe(true);
    await expect(maleRadio).toBeChecked(); // Preferable
   
});



test('CheckBox Actions',async({page})=>{

    await page.goto("https://testautomationpractice.blogspot.com/");

// 1. Select specific checkbox (Sunday) using getByLabel and assert
    const sundayCheckbox:Locator=page.getByLabel('Sunday');
    await sundayCheckbox.check();
    await expect(sundayCheckbox).toBeChecked();


// 2. Select all checkboxes and assert each is checked
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes:Locator[]=days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);

// 3. Select all checkboxes and assert each is checked

      for(const checkbox of checkboxes)
        {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }

    await page.waitForTimeout(2000);
    
// 4. Uncheck last 3 checkboxes and assert
//slice accepts range or single number value 0, 3 or 3 both same, if -3 given last 3 gets selected in arrays
    
        for(const checkbox of checkboxes.slice(-3))
        {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        }

        
    

//5. Toggle checkboxes: If checked, uncheck; if unchecked, check. Assert state flipped.

    for(const checkbox of checkboxes)
        {
        if(await checkbox.isChecked()) // true
        {
            // uncheck if checked
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        
        }
        else{
                // check if not checked i.e isChecked returns false
                await checkbox.check();
                await expect(checkbox).toBeChecked();
        }
    }

    

// 6. Randomly select check boxes - Select checkboxes by index (1, 3, 6) and assert

    const indexes:number[]=[1,3,6];

    for(const i of indexes)
    {
        await checkboxes[i].check();
        await expect(checkboxes[i]).toBeChecked();

    }
  
 

//7. Select the check box based on the Label
const weekname:string="Friday";

for(const label of days)
{
    if(label.toLowerCase()===weekname.toLowerCase())
    {
        const checkbox=page.getByLabel(label);
        checkbox.check();
        await expect(checkbox).toBeChecked();
    }
}


});



