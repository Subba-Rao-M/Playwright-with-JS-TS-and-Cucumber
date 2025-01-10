const {test, expect}= require('@playwright/test');

// Only - to execute only that particular test case
// Mulitple test cases can have only, only those will be executed
// skip - to skip particular test case

/*test('test1', async ({page})=>{

    console.log('test 1');
});


test.only('test 2 ', async ({page})=>{

    console.log('test 2');
});

test.skip('test 3 ', async ({page})=>{

    console.log('test 3');
});*/



// to skip test case based on certain conditions

/*test('test 4 ', async ({page, browserName})=>{
    if(browserName=='firefox'){
        test.skip();
        console.log('test 4 Skipped');
    }

    console.log('test 4');
});*/


//fixme - similar to skip but this test case will be used to update the code when code has some bugs

/*test('test 5 ', async ({page})=>{
    test.fixme();
    console.log('test 5 is fixme whioch will be skipped');
});*/

// fail annontation is used to verify failed scenario i.e -ve testing flow which is failed to be as expected
/*test('test6', async ({page})=>{
    test.fail(); // expected - false
    console.log('test 6 to be failed');
    //expect(1).toBe(1); // actual - true - test case will fail
    expect(1).toBe(2); // actual - false - test case will pass
});

test('test 7 ', async ({page, browserName})=>{
    if(browserName=='firefox'){
        test.fail();
        console.log('test 7 failed');
    }

    console.log('test test 7 failed');
});*/

// slow annotation
// If test case step exeutes within timeout specified in playwright configuration test case will pass


test('test 8', async({page})=>{
    test.slow();// will thrible the timeout i.e 3* value specified in Playwright configuration
    //test.setTimeout(5000); // to specify explicit timeout for test case
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
});


