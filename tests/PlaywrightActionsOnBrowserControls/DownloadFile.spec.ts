import { test, expect } from '@playwright/test';
import fs from 'fs';

test('Download Text file and verify it exists', async ({ page}) => {
  // Navigate to the download page
  await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');

  //Text file
  await page.locator('#inputText').fill("welcome"); // Filling text in the input box
  await page.locator('#generateTxt').click();  // Clicking on the 'Generate and Download text file' button
   
  // Start waiting for the download before clicking and both events will execute parallely so add both inside promise all as array of elements
  //await should not be used inside promise all statements since all needs to be executed syncronously
  const [ download ] = await Promise.all([
    page.waitForEvent('download'), // Wait for download to start
    page.locator('#txtDownloadLink').click()  // Clicking on the 'Downloaf text file' link
  ]);

  // Using above [download] we can get the file and specify path to store and name the file

  // Save the file to a custom path
  const downloadPath: string = 'downloads/testfile.txt';
  await download.saveAs(downloadPath);

  // Check if file exists using Node's fs module
  const fileExists : boolean = fs.existsSync(downloadPath); //checks if the file exists.
  expect(fileExists).toBeTruthy();

  // Clean up downloaded files
  if (fileExists) {
    fs.unlinkSync(downloadPath);
  }
    
});


test('Download Pdf file and verify it exists', async ({ page}) => {
  // Navigate to the download page
  await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');

  //Text file
  await page.locator('#inputText').fill("welcome"); // Filling text in the input box
  await page.locator('#generatePdf').click();  // Clicking on the 'Generate and Download pdf file' button
   
  // Start waiting for the download before clicking
  const [ download ] = await Promise.all([
    page.waitForEvent('download'), // Wait for download to start
    page.locator('#pdfDownloadLink').click()  // Clicking on the 'Download pdf file' link
  ]);

  // Save the file to a custom path
  const downloadPath : string= 'downloads/testfile.pdf';
  await download.saveAs(downloadPath);

  // Check if file exists using Node's fs module
  const fileExists : boolean = fs.existsSync(downloadPath); //checks if the file exists.
  expect(fileExists).toBeTruthy();

  // Clean up downloaded files becuase if already available file may pass the test and increase the unwanted files in folder
  if (fileExists) {
    fs.unlinkSync(downloadPath);
  }
   
});

