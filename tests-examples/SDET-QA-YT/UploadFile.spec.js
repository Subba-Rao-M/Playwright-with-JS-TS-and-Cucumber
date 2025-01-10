const {test, expect}= require('@playwright/test');

test('Upload single file', async ({page})=>{
    await page.goto('https://founduit.in');
    await page.waitForSelector('.mqfihd-upload');
    await page.locator('.mqfihd-upload').click();

    await page.locator('#file-upload').setInputFiles('tests/uploadFIles/myinputfile1.pdf');

});

test.only('Upload multiple file', async ({page})=>{// only this test will be executed if only used with test
    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    await page.waitForSelector('#filesToUpload');
    await page.locator('#filesToUpload').click();

    await page.locator('filesToUpload').setInputFiles(['tests/uploadFIles/myinputfile1.pdf', 'tests/uploadFIles/myinputfile2.pdf']);
    expect(await page.locator('#fileList li: nth-child(1)')).toHaveText('myinputfile1.pdf');
    expect(await page.locator('#fileList li: nth-child(2)')).toHaveText('myinputfile2.pdf');

    await page.locator('filesToUpload').setInputFiles([]); // To remove
    expect(await page.locator('#fileList li: nth-child(1)')).toHaveText('No files selected');
   
});



// To upload single file or multiple files
// also can be used to remove file