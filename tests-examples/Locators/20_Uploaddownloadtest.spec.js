const ExcelJs =require('exceljs');
const { test, expect } = require('@playwright/test');
 
async function writeExcelTest(searchText,replaceText,change,filePath)
{
    
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output= await readExcel(worksheet,searchText);
 
  const cell = worksheet.getCell(output.row,output.column+change.colChange);
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
 
}
 
 
async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber) =>
    {
          row.eachCell((cell,colNumber) =>
          {
              if(cell.value === searchText)
              {
                  output.row=rowNumber;
                  output.column=colNumber;
              }
  
  
          }  )
    
    })
    return output;
}

test('Upload download excel validation',async ({page})=>
{
  const textSearch = 'Mango';
  const updateValue = '350';
  await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
  //Wait for file download to complete usind download promise
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button',{name:'Download'}).click(); //Click on download button
  await downloadPromise;
  
  writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"C:\\Users\\{username}\\Downloads\\download.xlsx");

 
  await page.locator("#fileinput").click();
  await page.locator("#fileinput").setInputFiles("C:\\Users\\{username}\\Downloads\\download.xlsx"); //TO upload file use set input files option provided by playwright

  const textlocator = page.getByText(textSearch); // Get the field for search text
  const desiredRow = await page.getByRole('row').filter({has :textlocator }); // get the row which has search text locator
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue); //check the row column have updated value
 
});
 
 