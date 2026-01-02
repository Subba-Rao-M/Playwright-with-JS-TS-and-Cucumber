import { test, expect } from '@playwright/test';

/**
 * By default all test cases will execute in parallel
 * To make serial execution in config file make fully parallel as false
 * npx playwright test PlaywrightActions/GroupingDemo.spec.ts --grep Group1 --> Only Group1 related test cases will get executed
 * 
 */


test.describe('Group1', async () => {

    test('Test1', async () => {
        console.log(" this is Test1 ......")
    });


    test('Test2', async () => {
        console.log(" this is Test2 ......")
    });

})


test.describe('Group2', async () => {

    test('Test3', async () => {
        console.log(" this is Test3 ......")
    });


    test('Test4', async () => {
        console.log(" this is Test4 ......")
    });

})






