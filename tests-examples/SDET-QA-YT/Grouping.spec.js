//const {test, expect}= require('@playwright/test');
import {test, expect} from '@playwright/test';

test.beforeAll( async ()=>{

    console.log('Before all hook.............');
});


test.afterAll( async ()=>{

    console.log('After all hook.............');
});

test.beforeEach( async ()=>{

    console.log('Before Each hook.............');
});


test.afterEach( async ()=>{

    console.log('After Each hook.............');
});

test.describe('Group1 ', async ()=>{

    console.log('Insidse group 1');

    test('test 1', async ({page})=>{

        console.log('test 1');
    });
    
    test('test 2', async ({page})=>{
    
        console.log('test 2');
    });
});

test.describe.only('Group2 ', async ()=>{ // only is used to execute only this particular script and if skip is used it will skip the particular test group

console.log('Insidse group 2');

test('test 3', async ({page})=>{

    console.log('test 3');

});

test('test 4', async ({page})=>{

    console.log('test 4');
});

});