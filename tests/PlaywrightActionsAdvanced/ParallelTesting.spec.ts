import { test,expect } from '@playwright/test';

/**
 * Refer fullyParallel parameter in configuration file
 * Refer worker parameter to configure nunber of workers to run local or CI execution
 * For serial execution 1 worker is used and for parallel 1+ used
 * 
 *  npx playwright test PlaywrightActions/ParallelTesting.spec.ts --project firefox --workers 2
 * 
 * 
 */
//test.describe.configure({mode:'serial'}) // To execute only this test case in serial use this configuration and for global refer test config file
//test.describe.configure({mode:'parallel'}) //describe can be ignored for test level

test.describe('group1', () => {

    test('Test1', async ({ page }) => {
        console.log(" this is Test1 ......")
     });

    test('Test2', async ({ page }) => {
        console.log(" this is Test2 ......")
     });

    test('Test3', async ({ page }) => {
        console.log(" this is Test3 ......")
    });

    test('Test4', async ({ page }) => {
        console.log(" this is Test4 ......")
    });


    test('Test5', async ({ page }) => {
        console.log(" this is Test5 ......")
    });


});




