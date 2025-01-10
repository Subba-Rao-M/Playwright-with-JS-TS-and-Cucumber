const ExcelJs =require('exceljs');
const { test, expect } = require('@playwright/test');
 
async function writeExcelTest(searchText,replaceText,change,filePath)
{
    
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet('Sheet1');
  const output= await readExcel(worksheet,searchText); //Get row and column number for search text
 
  const cell = worksheet.getCell(output.row,output.column+change.colChange); // FOr searched row and coliumn value go to col change value
  cell.value = replaceText;
  await workbook.xlsx.writeFile(filePath);
 
}
 
 
async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1}; // Create a object to capture row and col no and initialize it to -1
    worksheet.eachRow((row,rowNumber) =>
    {
          row.eachCell((cell,colNumber) =>
          {
              if(cell.value === searchText)
              {
                  output.row=rowNumber; //If value is directly mapped with let or var it will not be accessed outside so use objects
                  output.column=colNumber;
              }
  
  
          }  )
    
    })
    return output;
}
//update Mango Price to 350. 
writeExcelTest("Mango",350,{rowChange:0,colChange:2},"/downloads/excelTest.xlsx");