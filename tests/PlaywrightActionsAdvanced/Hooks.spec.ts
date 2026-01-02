import { test, expect } from '@playwright/test';

/**
 * Hooks are used to manage how to execute test cases and when and what to call
 * Helpful for achieving reusability
 * This works better only when test cases are executed serially else before all test cases before and after all will be called
 */

test.beforeAll('BeforeAll', async()=>{
    console.log("this is Before All......")
});

test.afterAll('AfterAll', async()=>{
    console.log("this is After All......")
});



test.beforeEach('Beforeach',async()=>{

    console.log("this is Before each....")

});

test.afterEach('Aftereach',async()=>{

    console.log("this is After each....")

});


test('Test1', async () => {
     console.log(" this is Test1 ......")
});

test('Test2', async () => {
    console.log(" this is Test2 ......")
});

test('Test3', async () => {
    console.log(" this is Test3 ......")
});

test('Test4', async () => {
    console.log(" this is Test4 ......")
});



