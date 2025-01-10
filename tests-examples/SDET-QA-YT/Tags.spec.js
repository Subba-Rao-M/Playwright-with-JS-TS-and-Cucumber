const {test, expect}= require('@playwright/test');

test('test1 @sanity', async ({page})=>{

    console.log('test 1');
});


test('test 2 @regression', async ({page})=>{

    console.log('test 2');
});


test('test 3 @sanity @regression', async ({page})=>{

    console.log('test 3');
});


test('test4 @sanity', async ({page})=>{

    console.log('test 4');
});


test('test5 @sanity', async ({page})=>{

    console.log('test 5');
});